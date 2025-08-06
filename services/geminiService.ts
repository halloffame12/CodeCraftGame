
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { GameCode } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    gameName: {
      type: Type.STRING,
      description: 'A catchy, creative name for the game, e.g., "Pixel Python" or "AstroBreak".'
    },
    html: {
      type: Type.STRING,
      description: 'The HTML content for the game, typically just a canvas element. Example: \'<canvas id="gameCanvas" width="600" height="400"></canvas>\''
    },
    css: {
      type: Type.STRING,
      description: 'The CSS for styling the game container and elements. Example: \'body { background-color: #111; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; } canvas { border: 2px solid #eee; background-color: #000; }\''
    },
    js: {
      type: Type.STRING,
      description: 'The complete, well-commented vanilla JavaScript logic for the game using the HTML Canvas API.'
    },
    explanation: {
      type: Type.STRING,
      description: 'A brief, friendly, and simple explanation of how the generated JavaScript code works, aimed at a beginner developer.'
    }
  },
  required: ['gameName', 'html', 'css', 'js', 'explanation'],
};

export const generateGameCode = async (prompt: string): Promise<{ gameCode: GameCode, explanation: string }> => {
  try {
    const result: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User prompt: "${prompt}"`,
      config: {
        systemInstruction: "You are an expert game developer creating self-contained HTML5 games. Generate the necessary HTML, CSS, and JavaScript for a complete, playable game based on the user's request. The entire game should be able to run from a single HTML file. Use vanilla JavaScript and the HTML Canvas API. Do not use any external libraries. Ensure the JavaScript is well-commented to help learners understand the logic.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = result.text.trim();
    const parsedJson = JSON.parse(text);

    const gameCode: GameCode = {
      gameName: parsedJson.gameName || 'Untitled Game',
      html: parsedJson.html || '',
      css: parsedJson.css || '',
      js: parsedJson.js || '',
    };
    
    const explanation: string = parsedJson.explanation || 'No explanation provided.';

    return { gameCode, explanation };
  } catch (error) {
    console.error("Error generating game code:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate game from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the game.");
  }
};
