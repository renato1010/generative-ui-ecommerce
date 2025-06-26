# [🇺🇸](README.md)

# 🛍️ E-Commerce con UI Generativa

Este repositorio muestra una experiencia moderna de chatbot de e-commerce construida con **LangGraph.js** y **Next.js**, demostrando cómo los Modelos de Lenguaje Grandes (LLMs) pueden generar componentes de UI dinámicos e interactivos en lugar de solo simple texto.

El núcleo de este proyecto es un agente que ayuda a los usuarios a encontrar Laptops💻️, pero con un giro: renderiza listas de productos directamente en la interfaz de chat, permitiendo una interacción fluida y una mejor experiencia de usuario.

<img src="./pics/llm-ui-response-2025-06-25_19-03.png" alt="Interfaz de chat del agente mostrando una conversación de búsqueda de portátiles donde un usuario solicita portátiles por menos de $2000. El asistente de IA responde con 'Found 3 products matching your target price range' y muestra tres tarjetas de producto de portátiles en una disposición de cuadrícula. Cada tarjeta muestra una imagen de un portátil con componentes internos visibles y el precio. La interfaz tiene un fondo blanco limpio con burbujas de mensaje con borde morado e incluye un campo de entrada de mensaje en la parte inferior con un botón 'Send'. La interacción demuestra la funcionalidad de UI generativa donde la IA devuelve datos de productos estructurados como componentes de UI interactivos en lugar de texto plano." width="700">

## ✨ Características Clave

- **UI Generativa**: El agente LLM devuelve componentes de React(dentro del shadow DOM), no solo texto.
- **Arquitectura de Agente**: Construido con [LangGraph.js](https://langchain-ai.github.io/langgraphjs/) para una orquestación de agentes robusta y con estado (_stateful_).
- **Herramientas Avanzadas**: El agente utiliza herramientas personalizadas para búsqueda semántica y filtrado preciso a nivel de base de datos.
- **Stack Moderno**: [Next.js](https://nextjs.org/), [Turborepo](https://turborepo.com/), [Prisma](https://www.prisma.io/), y PostgreSQL de [Supabase](https://supabase.com/) con `pgvector`.

## 🚀 Primeros Pasos

### 1. Configuración del Proyecto

Este proyecto fue inicializado usando la herramienta `create-agent-chat-app`, que configura una estructura de monorepo con [Turborepo](https://turborepo.com/).

```bash
# Clona el repositorio
git clone <your-repo-url>
cd <your-repo-name>

# Instala las dependencias
pnpm install

# Configura tus variables de entorno
# Crea un archivo .env en el directorio raíz basándote en .env.example
cp .env.example .env

# Ejecuta el servidor de desarrollo
pnpm run dev
```

El monorepo contiene dos paquetes principales:

- `apps/agents`: El corazón de nuestra aplicación. Contiene los agentes de LangGraph, las herramientas y la lógica del servidor.
- `apps/web`: El frontend de Next.js que proporciona la interfaz de chat.

### 2. Configuración de la Base de Datos

Usamos Prisma como nuestro ORM sobre una base de datos **PostgreSQL de Supabase**.

Antes de empezar, asegúrate de tener:

1.  Habilitada la extensión [`vector`](https://supabase.com/docs/guides/database/extensions/pgvector) en tu proyecto de Supabase para la búsqueda por similitud de vectores (_vector similarity search_).
2.  Creada la función `match_documents` requerida por la integración de LangChain. Más información [aquí](https://js.langchain.com/docs/integrations/vectorstores/supabase/).

## 🔧 Configuración del Agente

La configuración principal de LangGraph reside en `langgraph.json`. Este archivo orquesta las diferentes partes de nuestra aplicación de agente.

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

- `graphs.laptops`: Define el punto de entrada a nuestro grafo personalizado. El sufijo `:graph` apunta a la variable del grafo exportada y compilada dentro del archivo.
- `ui.laptops`: Especifica la ruta a los componentes de React que el agente puede renderizar.

El grafo de nuestro agente está definido en `apps/agents/src/ecommerce/graph.ts` y se compila en un flujo de trabajo (_workflow_) ejecutable.

```typescript:apps/agents/src/ecommerce/graph.ts
const workflow = new StateGraph(GraphState, ConfigurationSchema)
  // Define los nodos
  .addNode('agent', agent)
  .addNode('tools', toolNode)
  // Define las aristas
  .addEdge(START, 'agent')
  .addConditionalEdges(
    'agent',
    shouldContinue, // Una función para decidir el siguiente paso
    {
      ACTION: 'tools', // Si el agente decide usar una herramienta
      __STOP__: END,   // Si el trabajo del agente ha terminado
    },
  )
  .addEdge('tools', 'agent'); // Vuelve al agente después de la ejecución de la herramienta

// Compila el grafo
export const graph = workflow.compile();
```

## 🌱 Ingesta de Datos y Embeddings

Para empezar, necesitamos poblar nuestra base de datos con datos de productos y generar _embeddings_ para la búsqueda semántica.

- **Script de Inicialización (_Seeding_)**: `apps/agents/prisma/seed.ts`
- **Datos de Prueba (_Mock Data_)**: `apps/agents/prisma/product-mock.ts`

El campo más importante en nuestros datos de prueba es `content`, que contiene una descripción textual de cada producto. Este texto se introduce en un modelo de _embedding_ para crear representaciones vectoriales para la búsqueda semántica.

- **Modelo de Embedding**: Usamos el modelo `text-embedding-3-large` de OpenAI, configurado en `apps/agents/src/ecommerce/models.ts`.
- **Vector Store**: Los _embeddings_ vectoriales son gestionados por un `ProductVectorStore` personalizado, que es una abstracción sobre el `PrismaVectorStore` de LangChain. Puedes encontrar los detalles de la implementación [aquí](https://js.langchain.com/docs/integrations/vectorstores/prisma/).
  - 🧑‍🔬 **Por Diversión**: También escribí un _vector store_ personalizado para Supabase desde cero para explorar su funcionamiento. Échale un vistazo en `apps/agents/src/ecommerce/supabase/vector-store.ts`.

## 🤖 El Agente `Laptops`

El trabajo del agente `Laptops` es ayudarte a encontrar las mejores ofertas de portátiles de nuestra selección de seis artículos. 😅 Este agente está diseñado para mostrar dos conceptos clave:

1.  **Componibilidad de LangChain**: Cómo los componentes de LangChain (LCEL) agilizan el desarrollo de aplicaciones LLM.
2.  **Orquestación del Agente**: Qué es un agente y cómo LangGraph gestiona su estado y su proceso de toma de decisiones.

Un gran ejemplo de la componibilidad de LCEL se encuentra en `apps/agents/src/ecommerce/nodes.ts`. El nodo `agent` utiliza un `RunnableLambda` para construir e invocar dinámicamente una cadena (_chain_) que consta de un _prompt_, un modelo y herramientas.

## 🛠️ Herramientas del Agente

Para que nuestro agente sea útil, lo hemos equipado con dos herramientas personalizadas:

Para esta demo he creado dos herramientas:

<table>
  <thead>
    <tr>
      <th><b>Nombre de Herramienta</b></th>
      <th><b>Parámetros</b></th>
      <th><b>Descripción</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>getProductsBySemanticSearch</td>
      <td>{query:string}</td>
      <td>Consulta del usuario para buscar productos<br> 
      basada en atributos no específicos como nombre, precio, descripción o marca.</td>
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
      <td>Filtro de precios para portátiles.<br>
      las claves son operadores como equals, lt, lte, gt o gte con valores numéricos.</td>
    </tr>
  </tbody>
</table>             |

### `getProductsBySemanticSearch`

Esta herramienta aprovecha la búsqueda por similitud de vectores para encontrar productos que coincidan con la _intención_ de la consulta de un usuario, no solo con las palabras clave. También usamos un _prompt_ (`apps/agents/src/ecommerce/prompts/semantic-search.ts`) para instruir al LLM que devuelva un objeto JSON, que luego parseamos. Este es un fantástico ejemplo de **salida estructurada** (_structured output_).

### `getLaptopsByPrice`

¿Por qué usar un LLM para una consulta de precio precisa? ¡No deberías! Es mejor usar una consulta determinista a la base de datos. Esta herramienta demuestra cómo un agente puede parsear inteligentemente el lenguaje natural de un usuario ("muéstrame portátiles por menos de $1000") en un objeto de filtro estructurado, que conectamos directamente a nuestra consulta de Prisma. Bastante ingenioso, ¿verdad?

## 🪄 UI Generativa: De Texto a Componentes Interactivos

> _El texto está bien, ¡pero una UI funcional y atractiva es mejor!_

Aquí es donde ocurre la magia. Hacemos que el LLM genere componentes de React que se renderizan directamente en el chat. Así es como funciona:

#### 1. Definir Componentes de UI

Creamos componentes de React estándar que el LLM puede elegir renderizar. En este caso, un componente `ProductsList`.
`apps/agents/src/agents-uis/ecommerce/products-list/index.tsx`

#### 2. Registrar Componentes

Le informamos a LangGraph sobre nuestros componentes de UI registrándolos en `langgraph.json` bajo la clave `ui` (como se muestra arriba).

#### 3. Emitir UI desde una Herramienta

Dentro de nuestras herramientas, usamos la utilidad `typedUi` para enviar componentes de UI al flujo de respuesta del agente. En el ejemplo de abajo, la herramienta `getProductsBySemanticSearch` encuentra productos y luego envía inmediatamente un componente `products-list` a la UI.

```typescript
// Una vista simplificada de la implementación de la herramienta
import { Command, END } from '@langchain/langgraph/prebuilt';

const getProductsBySemanticSearch = tool(async ({ query }, config) => {
  const ui = typedUi<typeof ComponentMap>(config);
  const semanticProducts = await getProducts(query);

  // 1. Crea un componente de UI para mostrar los productos
  ui.push({
    name: 'products-list',
    props: { products: semanticProducts }
  });

  // 2. Devuelve un Command para actualizar el estado y finalizar el turno
  return new Command({
    update: {
      productList: semanticProducts,
      ui: ui.items
    },
    goto: END // Va directamente al final, sin necesidad de más turnos del agente
  });
});
```

#### 4. Renderizar la UI en Next.js

El frontend utiliza el _hook_ `useStreamContext` para escuchar los mensajes y componentes de UI entrantes. Cuando llega un componente de UI, se renderiza dentro del chat.
`apps/web/src/components/thread/index.tsx`

#### 5. Añadir Interactividad a la UI

La UI generada se renderiza dentro de un **shadow DOM**, lo que significa que está aislada del contexto de la aplicación principal de React. Para hacer que componentes como un botón "Add to Cart" funcionen, usamos el método `thread.submit()` para enviar datos y comandos de vuelta al agente.

> **La conclusión clave es que el Estado del Grafo del Agente es nuestra única fuente de verdad.**

Cuando un usuario hace clic en "Add to Cart", enviamos un comando al agente para que actualice su estado `productsInCart`.

<details>
<summary>🎬 Haz clic para ver la interactividad de "Añadir al Carrito" en acción</summary>
<img src="./pics/ui-interactivity.gif" alt="Un GIF que muestra a un usuario haciendo clic en 'Añadir al Carrito' en una tarjeta de producto dentro del chat. Esta acción actualiza el estado del agente y lleva al usuario a una página /cart separada, donde el artículo seleccionado se muestra ahora en el carrito de compras." width="600">
</details>

#### 6. Persistir el Estado entre Páginas (El Carrito de Compras)

La pieza final del rompecabezas es la página del carrito (`apps/web/src/app/cart/page.tsx`). Para mostrar los artículos, obtiene el estado más reciente directamente del _endpoint_ de estado del servidor de LangGraph (`GET /threads/{threadId}/state`), lee el array `productsInCart` y renderiza los artículos. Esto asegura que el carrito esté siempre sincronizado con el conocimiento del agente.

### 7. QR del Enlace al Repositorio

<details>
<summary>Haz clic para ver el código QR que enlaza al repositorio de GitHub de este proyecto</summary>
<img src="./pics/repo-url-qr.png" alt="Código QR que enlaza al repositorio de GitHub para este proyecto. Escanear el código QR dirigirá a los usuarios al repositorio donde pueden encontrar el código fuente y la documentación." width="600">
</details>

## 📝 Notas y Advertencias

Una nota rápida sobre el soporte de Prisma para `pgvector`.

- Hay un _issue_ abierto sobre el soporte nativo para los operadores de `pgvector`: [prisma/prisma#18442](https://github.com/prisma/prisma/issues/18442). La solución actual, utilizada por la integración oficial de LangChain, implica usar las capacidades de consulta en crudo (_raw query_) de Prisma.
- **Actualización de las Extensiones de Prisma**: Prisma ha anunciado planes para descontinuar la característica de vista previa (_preview feature_) genérica `postgresqlExtensions`. En su lugar, se centrarán en ofrecer soporte dedicado para extensiones populares. [Lee más aquí](https://github.com/prisma/prisma/discussions/26136).
