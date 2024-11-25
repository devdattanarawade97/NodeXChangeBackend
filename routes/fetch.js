import express from 'express';
import { findRelevantChunks } from '../functions/similarity.js';
const router = express.Router();

router.post('/find-relevant-documents', async (req, res) => {
  
    try {
        const embeddingsDocs = req.body.embeddingsDocs;
        const userQuestion = req.body.userQuestion;

        const response = await findRelevantChunks(embeddingsDocs,userQuestion);
        
        const text = response.join(' ')
        //log text
        console.log("relevant doc text : ", text);
        res.status(200).send({ success: true, message: text });
    } catch (error) {
     
        //log error 
        console.log("error while fetching data : ", error);
    }
});

export default router;