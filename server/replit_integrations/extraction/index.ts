import type { Express, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

interface ExtractedExpense {
  date: string | null;
  amount: string | null;
  vendor: string | null;
  description: string | null;
  gallons: string | null;
  pricePerGallon: string | null;
  miles: string | null;
  expenseType: "fuel" | "maintenance" | "food" | "mileage" | null;
}

export function registerExtractionRoutes(app: Express): void {
  app.post("/api/extract-document", async (req: Request, res: Response) => {
    try {
      const { imageBase64, mimeType } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: "Image data is required" });
      }

      const prompt = `Analyze this receipt or document image and extract expense information. 
Return a JSON object with the following fields:
- date: The date of the transaction in YYYY-MM-DD format (extract from the receipt)
- amount: The total amount paid as a string (just the number, no currency symbol)
- vendor: The name of the business/vendor
- description: A brief description of what was purchased
- gallons: If this is a fuel receipt, the number of gallons purchased
- pricePerGallon: If this is a fuel receipt, the price per gallon
- miles: If this is a mileage log or odometer reading, the miles driven
- expenseType: One of "fuel", "maintenance", "food", or "mileage" based on the document type

If a field cannot be determined from the image, set it to null.
Only respond with valid JSON, no additional text.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: mimeType || "image/jpeg",
                  data: imageBase64,
                },
              },
            ],
          },
        ],
      });

      const text = response.text || "";
      
      let extracted: ExtractedExpense;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          extracted = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No JSON found in response");
        }
      } catch (parseError) {
        console.error("Failed to parse AI response:", text);
        extracted = {
          date: null,
          amount: null,
          vendor: null,
          description: null,
          gallons: null,
          pricePerGallon: null,
          miles: null,
          expenseType: null,
        };
      }

      res.json({ extracted, rawResponse: text });
    } catch (error) {
      console.error("Error extracting document:", error);
      res.status(500).json({ error: "Failed to extract document information" });
    }
  });
}
