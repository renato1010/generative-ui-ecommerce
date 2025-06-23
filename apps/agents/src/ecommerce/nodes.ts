import { BaseMessage } from "@langchain/core/messages";
import { RunnableLambda } from "@langchain/core/runnables";
// import { typedUi } from "@langchain/langgraph-sdk/react-ui/server";
import { LangGraphRunnableConfig } from "@langchain/langgraph";
import { GraphState, GraphStateUpdate } from "./graph-state.js";
import { loadChatModel } from "./models.js";
import { tools } from "./tools.js";
import { agentPrompt } from "./prompts/agent.js";
// import ComponentMap from "@/agents-uis/index.js";
// import { findToolCall } from "./utils/find-tool-call.js";

export async function agent(
  state: typeof GraphState.State,
  _config: LangGraphRunnableConfig
): Promise<GraphStateUpdate> {
  console.log("---Calling Model---");
  console.log("Products Found:", state.productList.length);
  const { messages } = state;
  const agentRunnable = RunnableLambda.from(
    async ({ messages }: { messages: BaseMessage[] }) => {
      const prompt = agentPrompt;
      const configurableModel = await loadChatModel();
      const modelWithTools = configurableModel.bindTools(tools);
      const chain = prompt.pipe(modelWithTools);

      return await chain.invoke({
        messages: messages,
      });
    }
  );
  const result = await agentRunnable.invoke({ messages });
  // const getProductsBySSToolCAll = result.tool_calls?.find(
  //   findToolCall("getProductsBySemanticSearch")<typeof semanticSearchSchema>
  // );
  // const getProductsByPriceToolCall = result.tool_calls?.find(
  //   findToolCall("getLaptopsByPrice")<typeof laptopsByPriceSchema>
  // );
  // if (!getProductsBySSToolCAll && !getProductsByPriceToolCall) {
  //   console.warn("No tool calls found in the result.");
  // }
  // if (getProductsByPriceToolCall) {
  //   ui.push(
  //     {
  //       name: "products-list",
  //       props: {
  //         products: state.productList,
  //       },
  //     },
  //     {
  //       message: result,
  //     }
  //   );
  // }
  return { messages: [result] };
}
