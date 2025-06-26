# 🛍️ E-Commerce with Generative UI

This repository showcases a modern e-commerce chatbot experience built with **LangGraph.js** and **Next.js**, demonstrating how Large Language Models (LLMs) can generate dynamic, interactive UI components instead of just plain text.

The core of this project is an agent that helps users find laptops, but with a twist: it renders product lists directly in the chat interface, allowing for seamless interaction and a richer user experience.

<img src="./pics/llm-ui-response-2025-06-25_19-03.png" alt="Agent Chat interface showing a laptop search conversation where a user requests laptops under $2000. The AI assistant responds with Found 3 products matching your target price range and displays three laptop product cards in a grid layout. Each card shows a laptop image with visible internal components and pricing. The interface has a clean white background with purple-bordered message bubbles and includes a message input field at the bottom with Send button. The interaction demonstrates the generative UI functionality where the AI returns structured product data as interactive UI components rather than plain text." width="700">

## ✨ Key Features

- **Generative UI**: The LLM agent returns React components, not just text.
- **Agentic Architecture**: Built with [LangGraph.js](https://langchain-ai.github.io/langgraphjs/) for robust and stateful agent orchestration.
- **Advanced Tooling**: The agent uses custom tools for semantic search and precise, database-level filtering.
- **Modern Stack**: [Next.js](https://nextjs.org/), [Turborepo](https://turborepo.com/), [Prisma](https://www.prisma.io/), and [Supabase](https://supabase.com/) PostgreSQL with `pgvector`.

## 🚀 Getting Started

### 1. Project Setup

This project was bootstrapped using the `create-agent-chat-app` tool, which sets up a [Turborepo](https://turborepo.com/) monorepo structure.

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-name>

# Install dependencies
pnpm install

# Set up your environment variables
# Create a .env file in the root directory based on .env.example
cp .env.example .env

# Run the development server
pnpm run dev
```

The monorepo contains two main packages:

- `apps/agents`: The heart of our application. It contains the LangGraph agents, tools, and server logic.
- `apps/web`: The Next.js frontend that provides the chat interface.

### 2. Database Setup

We use Prisma as our ORM over a **Supabase PostgreSQL** database.

Before you begin, ensure you have:

1.  Enabled the [`vector` extension](https://supabase.com/docs/guides/database/extensions/pgvector) in your Supabase project for vector similarity search.
2.  Created the `match_documents` function required by the LangChain integration. More info [here](https://js.langchain.com/docs/integrations/vectorstores/supabase/).

## 🔧 Agent Configuration

The core configuration for LangGraph lives in `langgraph.json`. This file orchestrates the different parts of our agentic application.

```json:langgraph.json
{
  "node_version": "20",
  "dependencies": ["."],
  "graphs": {
    "laptops": "./apps/agents/src/ecommerce/graph.ts:graph"
  },
  "ui": {
    "laptops": "./apps/agents/src/agents-uis/index.tsx"
  },
  "env": ".env"
}
```

- `graphs.laptops`: Defines the entry point to our custom graph. The `:graph` suffix points to the exported, compiled graph variable within the file.
- `ui.laptops`: Specifies the path to the React components that the agent can render.

Our agent's graph is defined in `apps/agents/src/ecommerce/graph.ts` and compiled into a runnable workflow.

```typescript:apps/agents/src/ecommerce/graph.ts
const workflow = new StateGraph(GraphState, ConfigurationSchema)
  // Define the nodes
  .addNode('agent', agent)
  .addNode('tools', toolNode)
  // Define the edges
  .addEdge(START, 'agent')
  .addConditionalEdges(
    'agent',
    shouldContinue, // A function to decide the next step
    {
      ACTION: 'tools', // If the agent decides to use a tool
      __STOP__: END,   // If the agent's work is done
    },
  )
  .addEdge('tools', 'agent'); // Loop back to the agent after tool execution

// Compile the graph
export const graph = workflow.compile();
```

## 🌱 Data Ingestion & Embeddings

To kick things off, we need to populate our database with product data and generate embeddings for semantic search.

- **Seeding Script**: `apps/agents/prisma/seed.ts`
- **Mock Data**: `apps/agents/prisma/product-mock.ts`

The most important field in our mock data is `content`, which contains a text description of each product. This text is fed into an embedding model to create vector representations for semantic search.

- **Embedding Model**: We use OpenAI's `text-embedding-3-large` model, configured in `apps/agents/src/ecommerce/models.ts`.
- **Vector Store**: The vector embeddings are managed by a custom `ProductVectorStore`, which is an abstraction over LangChain's `PrismaVectorStore`. You can find the implementation details [here](https://js.langchain.com/docs/integrations/vectorstores/prisma/).
  - 🧑‍🔬 **For Fun**: I also wrote a custom Supabase vector store from scratch to explore the mechanics. Check it out at `apps/agents/src/ecommerce/supabase/vector-store.ts`.

## 🤖 The `Laptops` Agent

The `Laptops` agent's job is to help you sniff out the best laptop deals from our six-item lineup. 😅 This agent is designed to showcase two key concepts:

1.  **LangChain Composability**: How LangChain's components (LCEL) streamline LLM application development.
2.  **Agent Orchestration**: What an agent is and how LangGraph manages its state and decision-making process.

A great example of LCEL composability is in `apps/agents/src/ecommerce/nodes.ts`. The `agent` node uses a `RunnableLambda` to dynamically construct and invoke a chain consisting of a prompt, a model, and tools.

## 🛠️ Agent Tools

To make our agent useful, we've equipped it with two custom tools:

For this demo I created two tools:

<table>
  <thead>
    <tr>
      <th><b>Tool Name</b></th>
      <th><b>Parameters</b></th>
      <th><b>Description</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>getProductsBySemanticSearch</td>
      <td>{query:string}</td>
      <td>User's query to search for products<br> 
      based on non-specific attributes like name, price, description, or brand.</td>
    </tr>
    <tr>
      <td>getLaptopsByPrice</td>
      <td>{<br>
    equals?: number | undefined;<br>
    lt?: number | undefined;<br>
    lte?: number | undefined;<br>
    gt?: number | undefined;<br>
    gte?: number | undefined;<br>
}</td>
      <td>Price filter for laptops.<br>
      keys are operators like equals, lt, lte, gt, or gte with numeric values.</td>
    </tr>
  </tbody>
</table>             |

### `getProductsBySemanticSearch`

This tool leverages vector similarity search to find products that match the _intent_ of a user's query, not just the keywords. We also use a prompt (`apps/agents/src/ecommerce/prompts/semantic-search.ts`) to instruct the LLM to return a JSON object, which we then parse. This is a fantastic example of **structured output**.

### `getLaptopsByPrice`

Why use an LLM for a precise price query? You shouldn't! It's better to use a deterministic database query. This tool demonstrates how an agent can intelligently parse a user's natural language ("show me laptops cheaper than $1000") into a structured filter object, which we plug directly into our Prisma query. Pretty slick, right?

## 🪄 Generative UI: From Text to Interactive Components

> _Text is okay, but a nice, actionable UI is better!_

This is where the magic happens. We make the LLM generate React components that are rendered directly in the chat. Here’s how it works:

#### 1. Define UI Components

We create standard React components that the LLM can choose to render. In this case, a `ProductsList` component.
`apps/agents/src/agents-uis/ecommerce/products-list/index.tsx`

#### 2. Register Components

We tell LangGraph about our UI components by registering them in `langgraph.json` under the `ui` key (as shown above).

#### 3. Emit UI from a Tool

Inside our tools, we use the `typedUi` utility to push UI components into the agent's response stream. In the example below, the `getProductsBySemanticSearch` tool finds products and then immediately pushes a `products-list` component to the UI.

```typescript
// A simplified look at the tool implementation
import { Command, END } from '@langchain/langgraph/prebuilt';

const getProductsBySemanticSearch = tool(async ({ query }, config) => {
  const ui = typedUi<typeof ComponentMap>(config);
  const semanticProducts = await getProducts(query);

  // 1. Create a UI component to display the products
  ui.push({
    name: 'products-list',
    props: { products: semanticProducts }
  });

  // 2. Return a Command to update the state and end the turn
  return new Command({
    update: {
      productList: semanticProducts,
      ui: ui.items
    },
    goto: END // Go directly to the end, no need for more agent turns
  });
});
```

#### 4. Render the UI in Next.js

The frontend uses the `useStreamContext` hook to listen for incoming messages and UI components. When a UI component arrives, it's rendered within the chat.
`apps/web/src/components/thread/index.tsx`

#### 5. Add Interactivity to the UI

The generated UI is rendered inside a **shadow DOM**, meaning it's isolated from the main React app's context. To make components like an "Add to Cart" button work, we use the `thread.submit()` method to send data and commands back to the agent.

> **The key takeaway is that the Agent's Graph State is our single source of truth.**

When a user clicks "Add to Cart", we send a command to the agent to update its `productsInCart` state.

<details>
<summary>🎬 Click to see the "Add to Cart" interactivity in action</summary>
<img src="./pics/ui-interactivity.gif" alt="A GIF showing a user clicking 'Add to Cart' on a product card within the chat. This action updates the agent's state and navigates the user to a separate /cart page, where the selected item is now displayed in the shopping cart." width="600">
</details>

#### 6. Persist State Across Pages (The Shopping Cart)

The final piece of the puzzle is the cart page (`apps/web/src/app/cart/page.tsx`). To display the items, it fetches the latest state directly from the LangGraph server's state endpoint (`GET /threads/{threadId}/state`), reads the `productsInCart` array, and renders the items. This ensures the cart is always in sync with the agent's understanding.


### 7. Repo Link QR

<details>
<summary>Click to see the QR code linking to the GitHub repository for this project</summary>
<img src="./pics/repo-url-qr.png" alt="QR code linking to the GitHub repository for this project. Scanning the QR code will direct users to the repository where they can find the source code and documentation." width="600">
</details>


## 📝 Notes & Caveats

A quick note on Prisma's support for `pgvector`.

- There is an open issue regarding native support for `pgvector` operators: [prisma/prisma#18442](https://github.com/prisma/prisma/issues/18442). The current workaround, used by the official LangChain integration, involves using Prisma's raw query capabilities.
- **Prisma Extensions Update**: Prisma has announced plans to discontinue the generic `postgresqlExtensions` preview feature. Instead, they will focus on shipping dedicated support for popular extensions. [Read more here](https://github.com/prisma/prisma/discussions/26136).
