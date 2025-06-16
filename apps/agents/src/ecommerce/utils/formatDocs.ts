import { Document } from "@langchain/core/documents";

export function formatProductDocs(input: Document[]): string {
  return (
    "\n\n" +
    input
      .map(
        (doc: Document) =>
          `<product_card>\n${doc.pageContent}\nproductId: ${doc.metadata.id}\ndistance: ${doc.metadata._distance}\n</product_card>`
      )
      .join("\n\n")
  );
}
