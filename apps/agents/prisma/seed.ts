import { products } from "./product-mock.js";
import { addDocumentsToVectorStore } from "../src/ecommerce/prisma/vector-store.js";

async function main() {
  try {
    await addDocumentsToVectorStore(products);
  } catch (error) {
    console.error("Error adding documents to vector store:", error);
    throw new Error(
      `Failed to seed Product table using the Prisma client: 
      ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

void (async () => {
  try {
    await main();
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw new Error(
      `Failed to seed Product table using the Prisma client: 
      ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
})();
