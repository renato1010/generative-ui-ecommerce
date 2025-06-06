import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

// agent state
export const GraphState = Annotation.Root({
  ...MessagesAnnotation.spec,
  userId: Annotation<string>({
    reducer: (prev, current) => (current === prev ? prev : current),
    default: () => "",
  }),
});
