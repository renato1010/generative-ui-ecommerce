import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import type { Document, DocumentInterface } from "@langchain/core/documents";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "../../lib/utils/env-vars.js";
import { openAITxtEmbedding3LargeModel } from "../models.js";

/**
 * Documentation: https://js.langchain.com/docs/integrations/vectorstores/supabase/#query-vector-store
 */

const supabaseClient = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const vectorStore = new SupabaseVectorStore(openAITxtEmbedding3LargeModel, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});

// test: add items to vectore store

// const document1: Document = {
//   pageContent: "The powerhouse of the cell is the mitochondria",
//   metadata: { source: "https://example.com" },
// };

// const document2: Document = {
//   pageContent: "Buildings are made out of brick",
//   metadata: { source: "https://example.com" },
// };

// const document3: Document = {
//   pageContent: "Mitochondria are made out of lipids",
//   metadata: { source: "https://example.com" },
// };

// const document4: Document = {
//   pageContent: "The 2024 Olympics are in Paris",
//   metadata: { source: "https://example.com" },
// };

// const documents = [document1, document2, document3, document4];

/**
 * Adds an array of documents to the vector store.
 * @param documents - An array of Document objects to be added to the vector store.
 * @returns A Promise that resolves when the documents are successfully added.
 * @throws An error if there is an issue adding the documents to the vector store.
 */
export async function addDocumentsToVectorStore(documents: Document[]) {
  try {
    console.log("Adding documents to vector store...");
    await vectorStore.addDocuments(documents);
    console.log("Documents added to vector store successfully.");
  } catch (error) {
    console.error("Error adding documents to vector store:", error);
    throw new Error(
      `Failed to add documents to vector store. 
      ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Query vector store
type Filter = Parameters<typeof vectorStore.similaritySearch>[2];
type QueryOptions = {
  query: string;
  filter?: Filter;
  k?: number;
  returnScores?: boolean;
};
type QueryWithScoresOptions = {
  query: string;
  filter?: Filter;
  k?: number;
  returnScores: true;
};
type QueryWithoutScoresOptions = {
  query: string;
  filter?: Filter;
  k?: number;
  returnScores?: false;
};

type SupabaseVectorStoreRetriever = typeof vectorStore.asRetriever;

export async function queryVectorStore(
  options: QueryWithScoresOptions
): Promise<[DocumentInterface<Record<string, any>>, number][]>;
export async function queryVectorStore(
  options: QueryWithoutScoresOptions
): Promise<DocumentInterface<Record<string, any>>[]>;
export async function queryVectorStore({
  query,
  filter = undefined,
  k = 4,
  returnScores = false,
}: QueryOptions): Promise<
  | [DocumentInterface<Record<string, any>>, number][]
  | DocumentInterface<Record<string, any>>[]
> {
  try {
    const results = returnScores
      ? await vectorStore.similaritySearchWithScore(query, k, filter)
      : await vectorStore.similaritySearch(query, k, filter);
    return results;
  } catch (error) {
    console.error("Error querying vector store:", error);
    throw new Error(
      `Failed to query vector store. 
      ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// supabase vector store retriever
export const supabaseVectorStoreRetriever: SupabaseVectorStoreRetriever = (
  options = { k: 4 }
) => {
  try {
    return vectorStore.asRetriever(options);
  } catch (error) {
    console.error("Error creating vector store retriever:", error);
    throw new Error(
      `Failed to create vector store retriever. 
      ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

void (async () => {
  try {
    // ** Adding documents to vector store **//
    // await addDocumentsToVectorStore(documents);
    // const filter = { source: "https://example.com" };
    // ** Querying vector store **//
    // const results = await queryVectorStore({
    //   query: "mitochondria",
    //   returnScores: true,
    // });
    // for (const [doc, score] of results) {
    //   console.log(
    //     `* ${doc.pageContent} [${JSON.stringify({ ...doc.metadata, score: score.toFixed(6) }, null, 2)}]`
    //   );
    // }
    // ** Retriever **//
    // const retriever = supabaseVectorStoreRetriever();
    // const retrieverResults = await retriever.invoke("biology");
    // console.dir({ retrieverResults }, { depth: null });
    // ** Clear vector store **//
    const vectorArray = await vectorStore.embeddings.embedQuery("test");
    console.log({ vectorArray }, "Vector Length: ", vectorArray.length);
  } catch (error) {
    console.error("Error in adding documents to vector store:", error);
  }
})();
