import { join } from "path";
import { graph } from "../graph.js";
import { createWriteStream, existsSync, unlinkSync } from "node:fs";
import { ReadableStream as NodeReadableStream } from "node:stream/web";
import { pipeline } from "node:stream/promises";

// print graph png
async function printGraph(compiledGraph: typeof graph) {
  const graphPath = join(process.cwd(), "src/ecommerce/graph.png");
  console.dir({ graphPath }, { depth: null });
  // check if graphPath referenced file exists, if so delete it
  if (existsSync(graphPath)) {
    unlinkSync(graphPath);
  }
  const graph = await compiledGraph.getGraphAsync();
  const blob = await graph.drawMermaidPng();
  const readableStream = blob.stream() as NodeReadableStream;
  const writableStream = createWriteStream(graphPath);
  await pipeline<typeof readableStream, typeof writableStream>(
    readableStream,
    writableStream
  );
}

(async () => {
  await printGraph(graph);
})()
  .catch((err) => {
    console.error("Error printing graph:", err);
    process.exit(1);
  })
  .finally(() => {
    console.log("Graph printed successfully");
  });
