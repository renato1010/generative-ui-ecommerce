import { BaseMessage } from "@langchain/core/messages";
import { RunnableLambda } from "@langchain/core/runnables";
import { GraphState } from "./graph-state.js";
import { loadChatModel } from "./models.js";
import { tools } from "./tools.js";
import { agentPrompt } from "./prompts/agent.js";

export async function agent(
  state: typeof GraphState.State
): Promise<Partial<typeof GraphState.State>> {
  console.log("---Calling Model---");
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
  return { messages: [result] };
}
