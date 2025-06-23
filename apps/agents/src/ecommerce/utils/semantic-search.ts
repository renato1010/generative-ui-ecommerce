import {
  RunnableMap,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { loadChatModel } from "../models.js";
import { productRetriever } from "../prisma/vector-store.js";
import { semanticSearchOfProducts } from "../prompts/semantic-search.js";
import { formatProductDocs } from "./formatDocs.js";
import { ProductList } from "./types.js";

export async function getProducts(query: string, k: number = 4) {
  const retriever = productRetriever(k);
  const prompt = semanticSearchOfProducts;
  const model = await loadChatModel();

  const ragChainWithSources = RunnableMap.from({
    userQuery: new RunnablePassthrough(),
    products: retriever,
  }).assign({
    answer: RunnableSequence.from([
      (input) => {
        // format the retrieved documents as a string
        const formattedProducts = formatProductDocs(
          input.products as Document[]
        );
        return {
          products: formattedProducts,
          userQuery: input.userQuery,
        };
      },
      prompt,
      model,
    ]),
  });
  try {
    const {
      answer: { content },
    } = await ragChainWithSources.invoke(query);
    const responseObj: { productList: ProductList } = JSON.parse(
      content as string
    );
    const { productList } = responseObj;

    return productList;
  } catch (error) {
    console.error(
      "Error running semantic search:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

// void (async () => {
//   try {
//     const products = await getProducts("computers with processor amd ryzen", 3);
//     console.log({ products });
//   } catch (error) {
//     console.error(
//       "Error running semantic search:",
//       error instanceof Error ? error.message : error
//     );
//     throw new Error(
//       `Failed to run semantic search: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`
//     );
//   }
// })();
