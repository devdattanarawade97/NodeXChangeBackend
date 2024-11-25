import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();
//open ai api key
const OPEN_API_KEY = process.env.OPEN_API_KEY;

const openai = new OpenAI({ apiKey: OPEN_API_KEY });

export async function findRelevantChunks(documentEmbeddings1, question) {
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: question,
    });

    const questionEmbedding = response.data[0].embedding;
    const similarities = documentEmbeddings1.map(doc => ({
        text: doc.text,
        similarity: cosineSimilarity(doc.embedding, questionEmbedding),
    }));

    similarities.sort((a, b) => b.similarity - a.similarity);
    console.log("similarities chunk  : ", similarities.slice(0, 3).map(sim => sim.text));
    return similarities.slice(0, 3).map(sim => sim.text); // Return top 3 most similar chunks
}


function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}
