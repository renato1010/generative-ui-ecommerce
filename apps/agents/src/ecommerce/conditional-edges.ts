import { isAIMessage } from "@langchain/core/messages";
import { GraphState } from "./graph-state.js";

export function shouldContinue(state: typeof GraphState.State) {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];
  // if the LLM makes a tool call, then perform an action
  if (
    isAIMessage(lastMessage) &&
    "tool_calls" in lastMessage &&
    Array.isArray(lastMessage.tool_calls) &&
    lastMessage.tool_calls.length > 0
  ) {
    return "ACTION";
  }
  // otherwise, we stop(reply to the user)
  return "__STOP__";
}
