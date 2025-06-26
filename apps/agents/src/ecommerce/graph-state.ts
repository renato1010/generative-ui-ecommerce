import {
  Annotation,
  Messages,
  messagesStateReducer,
} from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";
import {
  RemoveUIMessage,
  UIMessage,
  uiMessageReducer,
} from "@langchain/langgraph-sdk/react-ui/server";
import { Product } from "./utils/types.js";

// agent state
const GenerativeUIAnnotation = Annotation.Root({
  ui: Annotation<
    UIMessage[],
    UIMessage | RemoveUIMessage | (UIMessage | RemoveUIMessage)[]
  >({
    default: () => [],
    reducer: uiMessageReducer,
  }),
});
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
  ui: GenerativeUIAnnotation.spec.ui,
  productList: Annotation<Product[]>({
    reducer: (_left: Product[], right: Product[]) => right,
    default: () => [],
  }),
  productsInCart: Annotation<Product[]>({
    reducer: (left: Product[], right: Product[]) => {
      const previousIds = left.map((product) => product.productId);
      // Filter out products that are already in the cart
      const filteredRight = right.filter(
        (product) => !previousIds.includes(product.productId)
      );
      return [...left, ...filteredRight];
    },
    default: () => [],
  }),
  userId: Annotation<string>({
    reducer: (prev, current) => (current === prev ? prev : current),
    default: () => "",
  }),
});

export type GraphStateUpdate = typeof GraphState.Update;
