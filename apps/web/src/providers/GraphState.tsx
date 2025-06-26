"use client";
import { createContext, useContext } from "react";
import { createClient } from "./client";
import { useQueryState } from "nuqs";
import { getApiKey } from "@/lib/api-key";
// import { DefaultValues } from "@langchain/langgraph-sdk";
import { type StateType } from "@/providers/Stream";

interface GraphStateType {
  getCurrentGraphState: () => Promise<StateType | null>;
}

const GraphStateContext = createContext<GraphStateType | undefined>(undefined);

export function GraphStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apiUrl] = useQueryState("apiUrl");
  const [threadId] = useQueryState("threadId");

  const getCurrentGraphState = async (): Promise<StateType | null> => {
    if (!apiUrl || !threadId) return null;
    // createClient is not well documented(IMO), if need to dive deep in github code
    // go to: https://github.com/langchain-ai/langgraph/blob/main/libs/sdk-js/src/client.ts
    const client = createClient(apiUrl, getApiKey() ?? undefined);
    try {
      const state = await client.threads.getState<StateType>(threadId);
      return state.values || {};
    } catch (error) {
      console.error("Error fetching graph state:", error);
      return null;
    }
  };
  const value = {
    getCurrentGraphState,
  };

  return (
    <GraphStateContext.Provider value={value}>
      {children}
    </GraphStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGraphState(): GraphStateType {
  const context = useContext(GraphStateContext);
  if (!context) {
    throw new Error("useGraphState must be used within a GraphStateProvider");
  }
  return context;
}
