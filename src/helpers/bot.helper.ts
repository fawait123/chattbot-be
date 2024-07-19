import { GoogleGenerativeAI } from "@google/generative-ai";

export class BotHelper {
    private generationConfig: object
    private genAI: any
    private model: any


    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        this.genAI = new GoogleGenerativeAI(apiKey);

        this.generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        this.model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
    }
    async message(message: string): Promise<any> {
        const generationConfig = this.generationConfig
        const chatSession = this.model.startChat({
            generationConfig,
        });

        const result = await chatSession.sendMessage(message);

        return result
    }
}