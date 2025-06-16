import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import {
  PrismaClient,
  Prisma,
  Product,
} from "../../generated/prisma/client.js";
import { openAITxtEmbedding3LargeModel } from "../models.js";
import { VectorStoreRetrieverInput } from "@langchain/core/vectorstores";
// import { products } from "./product-mock.js";

/* doc: https://js.langchain.com/docs/integrations/vectorstores/prisma/ */

const prisma = new PrismaClient();

// Define specific types to avoid the unique Symbolds in PrismaVectorStore
type ProductVectorStore = PrismaVectorStore<
  Product,
  "Product",
  { id: true; content: true; metadata: true },
  {}
>;
// Use the `withModel` method to get proper type hints for `metadata` field:
export const productVectorStore: ProductVectorStore =
  PrismaVectorStore.withModel<Product>(prisma).create(
    openAITxtEmbedding3LargeModel,
    {
      prisma: Prisma,
      tableName: "Product",
      vectorColumnName: "vector",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
        metadata: true,
      },
    }
  );
type ConfigPrismaRetriever = Parameters<typeof productVectorStore.asRetriever>;
export const productRetriever = (...options: ConfigPrismaRetriever) => {
  const [k = 4, ...rest] = options;
  return productVectorStore.asRetriever(k, ...rest);
};

// export const prismaVectorStoreAsRetriever = vectorStore.asRetriever({ k: 4 });

export async function addDocumentsToVectorStore(
  products: Prisma.ProductCreateInput[]
): Promise<void> {
  try {
    console.log("Adding documents to vector store...");
    await productVectorStore.addModels(
      await prisma.$transaction(
        products.map((product) =>
          prisma.product.create({
            data: {
              name: product.name,
              description: product.description,
              price: product.price,
              stock: product.stock,
              imageUrl: product.imageUrl,
              content: product.content,
              metadata: JSON.stringify(product.metadata),
            },
          })
        )
      )
    );
    console.log("Documents added to vector store successfully.");
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error adding documents to prisma vector store:");
    throw new Error(
      `Failed to seed Product table using the Prisma client: 
      ${error instanceof Error ? error.message : "Unknown error"}`
    );
  } finally {
    await prisma.$disconnect();
  }
}

// void (async () => {
//   try {
//     await addDocumentsToVectorStore(products);
//     const results = await productVectorStore.similaritySearchWithScore(
//       "cutting-edge smartphone",
//       2
//     );
//     const data = results.map(([doc, score]) => ({
//       id: doc.id,
//       content: doc.pageContent,
//       metadata: {
//         productId: doc.metadata["id"],
//         ...JSON.parse(doc.metadata["metadata"]),
//       },
//       score,
//     }));
//     console.dir({ data }, { depth: null });
//   } catch (error) {
//     console.error("Failed to add documents to vector store:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// })();
