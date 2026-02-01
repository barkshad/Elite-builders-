
import { GoogleGenAI } from "@google/genai";

// Exporting estimateMaterials which now correctly initializes the AI client right before use
export const estimateMaterials = async (projectDescription: string) => {
  // Always create a new instance right before the call to ensure process.env.API_KEY is current
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are an expert construction estimator for Elite Builders. 
      A customer is asking for help with their project: "${projectDescription}". 
      Provide a concise list of recommended materials (Cement, Steel, Sand, etc.) and rough estimated quantities based on standard building practices in Kenya.
      Structure the response in a professional, helpful way.`,
      config: {
        systemInstruction: "You are the 'Elite Assistant'. You provide accurate, professional material estimations and technical advice for builders. Be precise and use industry terms (e.g., TMT bars, 32.5N cement).",
      },
    });
    // Accessing the .text property directly as per the latest SDK requirements
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't generate an estimate right now. Please contact our technical sales team.";
  }
};
