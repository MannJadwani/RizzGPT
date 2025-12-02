import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
You are RizzGPT, a world-class dating coach and expert in witty, charismatic communication. 
Your goal is to generate short, punchy, and highly engaging flirtatious lines ("rizz").
- Keep responses concise (under 2 sentences usually).
- Be confident, smooth, and slightly playful.
- Avoid being creepy, overly aggressive, or cliché.
- If analyzing a screenshot, identify the context and the last received message to craft the perfect reply.
`;

export const generateGenericLine = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: "Generate a smooth, witty pickup line or conversation starter that works in 2024.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9,
      }
    });
    return response.text || "Could not generate a line. Try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate rizz.");
  }
};

export const generateChatReply = async (history: string): Promise<string> => {
  try {
    const prompt = `Here is a chat conversation history. Suggest a witty and flirtatious reply to the last message sent by the other person:\n\n${history}`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      }
    });
    return response.text || "Could not generate a reply.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze chat.");
  }
};

export const generateScreenshotReply = async (base64Image: string): Promise<string> => {
  try {
    // Remove header if present (e.g., "data:image/png;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg/png, Gemini is flexible
              data: cleanBase64
            }
          },
          {
            text: "Analyze this screenshot of a chat interface. Read the last message received (gray bubble usually, or on the left). Generate a witty, flirtatious, and confident reply text to send back. Output ONLY the reply text."
          }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      }
    });
    return response.text || "Could not analyze screenshot.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze screenshot.");
  }
};