import { Annotation, Messages, messagesStateReducer } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";

// agent state
export const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (left: Messages, right: Messages) => {
      // keep only the last 5 messages
      const messages = messagesStateReducer(left, right);
      if (messages.length > 5) {
        return messages.slice(-5);
      }
      return messages;
    },
    default: () => [], // user specific features
  }),
  userId: Annotation<string>({
    reducer: (prev, current) => (current === prev ? prev : current),
    default: () => "",
  }),
});
