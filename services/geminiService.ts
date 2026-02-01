
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBuilderAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are Elite Builders Assistant, an expert in the Kenyan construction industry. 
        Provide advice on materials, quantity estimations (e.g. how much cement for a 3-bedroom house slab), 
        and current market trends in East Africa. Be professional, concise, and helpful. 
        Always mention that users can find these materials on Elite Builders.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now. Please try again later or contact our support team.";
  }
};
