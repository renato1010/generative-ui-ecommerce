import { OpenAIEmbeddings } from "@langchain/openai";
import { initChatModel } from "langchain/chat_models/universal";

type Fields = Partial<Record<string, any>> & {
  modelProvider?: string;
  configurableFields?: never;
  configPrefix?: string;
};
/**
 * Load a chat model from a fully specified name.
 * @param fullySpecifiedName - String in the format 'provider/model' or 'provider/account/provider/model'.
 * @returns A Promise that resolves to a BaseChatModel instance.
 */
export async function loadChatModel(
  fullySpecifiedName: string = "claude-3-7-sonnet-latest", // Default to Claude Sonnet 4 latest model
  fields: Fields = { temperature: 0, maxTokens: 2000 } // Default values can be overridden
) {
  const index = fullySpecifiedName.indexOf("/");
  if (index === -1) {
    // If there's no "/", assume it's just the model
    return await initChatModel(fullySpecifiedName, { ...fields });
  } else {
    const provider = fullySpecifiedName.slice(0, index);
    const model = fullySpecifiedName.slice(index + 1);
    return await initChatModel(model, { modelProvider: provider });
  }
}

export const openAITxtEmbedding3LargeModel = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});
