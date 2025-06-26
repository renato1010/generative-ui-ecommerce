import { START, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { GraphState } from "./graph-state.js";
import { ConfigurationSchema } from "./configuration.js";
import { agent } from "./nodes.js";
import { tools } from "./tools.js";
import { shouldContinue } from "./conditional-edges.js";

// Tool Node
const toolNode = new ToolNode<typeof GraphState.State>(tools);

const workflow = new StateGraph(GraphState, ConfigurationSchema)
  .addNode("agent", agent)
  .addNode("tools", toolNode, { ends: ["__end__"] })
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue, {
    ACTION: "tools",
    __STOP__: "__end__",
  })

export const graph = workflow.compile();
graph.name = "laptops";
