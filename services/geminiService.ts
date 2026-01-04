
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Creates a fresh instance of the Gemini AI client using the current environment key.
 * Required to be called inside functions to catch updates from the openSelectKey() dialog.
 */
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getImpactEstimation = async (materialName: string, category: string, weightKg: number) => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Estimate the environmental impact of upcycling ${weightKg}kg of ${materialName} (${category}). Provide a numeric value for CO2 saved in kg and a short impact statement.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            co2Saved: { type: Type.NUMBER, description: "Estimated CO2 saved in kg" },
            impactStatement: { type: Type.STRING, description: "A catchy one-sentence impact statement" },
          },
          required: ["co2Saved", "impactStatement"],
          propertyOrdering: ["co2Saved", "impactStatement"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("AI returned empty response");
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Gemini Impact Estimation Error:", error);
    // Handle race condition/stale key errors
    if (error?.message?.includes("Requested entity was not found")) {
      if (window.aistudio) window.aistudio.openSelectKey();
    }
    return {
      co2Saved: weightKg * 1.5,
      impactStatement: `You're saving ${weightKg}kg of materials from the landfill!`
    };
  }
};

export const suggestCategory = async (description: string) => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this description: "${description}", categorize it into one of: Metal Scraps, Lab Equipment, Timber Offcuts, Electronic Components, Chemical Containers, Plastic Scrap.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["category", "reason"],
          propertyOrdering: ["category", "reason"],
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI returned empty response");
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Gemini Suggestion Error:", error);
    if (error?.message?.includes("Requested entity was not found")) {
      if (window.aistudio) window.aistudio.openSelectKey();
    }
    return { category: "Other", reason: "Unable to determine." };
  }
};
