import { tool } from "@langchain/core/tools";
import { Command, END } from "@langchain/langgraph";
import { z } from "zod";
import { getProducts } from "./utils/semantic-search.js";
import { laptopsByPrice } from "./utils/laptops-by-price.js";
import { ToolMessage } from "@langchain/core/messages";

const getProductsBySemanticSearch = tool(
  async ({ query }) => {
    try {
      const semanticProducts = await getProducts(query);
      return new Command({
        update: {
          messages: [
            new ToolMessage({
              content: semanticProducts,
              tool_call_id: "get_products_by_semantic_search",
            }),
          ],
          goto: END,
        },
      });
    } catch (error) {
      console.error(
        "Error in semantic search:",
        error instanceof Error ? error.message : error
      );
      // return a simple text showing no products found
      return new Command({
        update: {
          messages: [
            new ToolMessage({
              content: `No products found for the query:\n\n "${query}". Please try a different search term.`,
              tool_call_id: "get_products_by_semantic_search",
            }),
          ],
          goto: END,
        },
      });
    }
  },
  {
    name: "getProductsBySemanticSearch",
    description:
      "Get a list of products. Useful for searching products based on non-specific attributes like price, or brand.",
    schema: z.object({
      query: z
        .string()
        .describe(
          "User's query to search for products based on non-specific attributes like name, price, description, or brand."
        ),
    }),
  }
);

const _operators = ["equals", "lt", "lte", "gt", "gte"] as const;
type OperatorsKey = (typeof _operators)[number];
export type ProductPriceFilter = { [key in OperatorsKey]?: number };
const getLaptopsByPrice = tool(
  async (price: ProductPriceFilter) => {
    try {
      const stringifiedItems = await laptopsByPrice(price);
      return new Command({
        update: {
          messages: [
            new ToolMessage({
              content: stringifiedItems,
              tool_call_id: "get_laptops_by_price",
            }),
          ],
          goto: END,
        },
      });
    } catch (error) {
      console.error(
        "Error parsing price:",
        error instanceof Error ? error.message : error
      );
      return new Command({
        update: {
          messages: [
            new ToolMessage({
              content: "No laptops found for the specified price range.",
              tool_call_id: "get_laptops_by_price",
            }),
          ],
          goto: END,
        },
      });
    }
  },
  {
    name: "getLaptopsByPrice",
    description:
      "Get a list of laptops based on the provided price filter. The price filter should be a JSON string with operators like equals, lt, lte, gt, or gte.",
    schema: z
      .object({
        equals: z.number().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
      })
      .strict()
      .describe(
        "Price filter for laptops. keys are operators like equals, lt, lte, gt, or gte with numeric values."
      ),
  }
);

export const tools = [getProductsBySemanticSearch, getLaptopsByPrice];

// void (async () => {
// Example usage
// const query = "show me laptops with AMD Ryzen processor";
// const priceFilter = { gte: 1000, lte: 2000 };

// const toolProducts = await getProductsBySemanticSearch.invoke({ query });
// const toolProducts = await getLaptopsByPrice.invoke(priceFilter);

// console.dir({ toolProducts }, { depth: null });
// })();
