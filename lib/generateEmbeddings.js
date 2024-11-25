import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';
dotenv.config();
const COHERE_API_KEY = process.env.COHERE_API_KEY;
// cohere client
const cohere = new CohereClient({
    token: COHERE_API_KEY, // This is your trial API key
});
 export async function getCohereEmbeddings(texts) {
    try {

        const chunks = texts.match(/.{1,2000}(\s|$)/g); // Split text into chunks of 2000 characters
        const embeddings = [];

        for (const chunk of chunks) {
            const response = await cohere.embed({
                model: "embed-english-v3.0",
                texts: [chunk], // Pass the texts as argument
                inputType: "classification",
                truncate: "NONE"
            });
            console.log(`cohere Embeddings: ${JSON.stringify(response.embeddings[0])}`);

            embeddings.push({ text: chunk, embedding: response.embeddings[0] });
        }

        return embeddings;

    } catch (error) {
        console.error("Error fetching  cohere embeddings:", error);
    }
}