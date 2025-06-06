import { StateGraph } from "@langchain/langgraph";
import { GraphState } from "./graph-state.js";
import { ConfigurationSchema } from "./configuration.js";

const workflow = new StateGraph(GraphState, ConfigurationSchema)
.addNode('callModel',callModel)
.addNode('tools',new ToolNode(TOOLS))
.addEdge('__start__','callModel')




export const graph = workflow.compile();
graph.name = "Ecommerce Agent";
