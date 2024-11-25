import express from 'express';
const router = express.Router();
import fs from 'fs';
import { getCohereEmbeddings } from  '../lib/generateEmbeddings.js';

import { parsePdf } from '../lib/pdfParser.js';
import multer from 'multer';
// Configure multer for in-memory file storage
const storage = multer.memoryStorage();
const uploadFile = multer({ storage });

router.post('/generate-embeddings',   uploadFile.single('file'), async (req, res) => {

    // const file = req.file; // Access uploaded file
    const bufferData = req.file.buffer; // Access additional form fields (e.g., 'data')
    console.log("data within generate embeddings route : ", bufferData);
   
    try {
          
        const parsedText = await parsePdf(bufferData);
        const embeddings = await getCohereEmbeddings(parsedText);
        // Send a response back
        res.status(200).json({ message: 'File uploaded successfully', data: embeddings });

    } catch (error) {
        console.error("Error sending api response:", error);
        res.status(500).send({ success: false, message: 'Failed to send notification' });
    }
});


export default router;