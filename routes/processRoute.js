
import express from 'express';

import { getCohereChat , getChatCompletionGPT , getChatCompletionGemini } from '../functions/AI_Functions.js';

const router = express.Router();



//this endpoint will get invoked when user does the payment  . this is for the purpose of sending msg to user . msg contains the gpt or gemini based text output
router.post('/ai', async (req, res) => {

    let response = "";
    const { transactionId, userId, status, message, model } = req.body;

    // Optionally, validate the data or process it further
    console.log("server user id : ", userId);
    console.log("server msgText : ", message);
    console.log("server model : ", model);
    try {


        if (model == 'cohere') {




            response = await getCohereChat(message); // this is cohere  model
            console.log("cohere response : ", response);

        } else if (model == 'gpt') {
            response = await getChatCompletionGPT(message); //this is gpt model
            console.log("gpt response : ", response);
        }

        else {
            response = await getChatCompletionGemini(message); // this is gemini model
            console.log("gemini response : ", response);

        }


        res.status(200).send({ success: true, message: response });
    } catch (error) {
        console.error("Error sending api response:", error);
        res.status(500).send({ success: false, message: 'Failed to send notification' });
    }
});


export default router;