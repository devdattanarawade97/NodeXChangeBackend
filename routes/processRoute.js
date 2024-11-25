
import express from 'express';

import { getCohereChat, getChatCompletionGPT, getChatCompletionGemini, createOpenAIThread, addMessageToThread, runOpenAIThread , retriveThreadMessages, createAndRunThread } from '../functions/AI_Functions.js';

const router = express.Router();


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



router.post('/create-thread', async (req, res) => {

    let response = "";
    const { userId } = req.body;



    try {



        const threadId = await createOpenAIThread(); //this is gpt model
        console.log("thread creation response : ", threadId);



        res.status(200).send({ success: true, message: threadId });
    } catch (error) {
        console.error("Error sending api response:", error);
        res.status(500).send({ success: false, message: 'Failed to send notification' });
    }
});



router.post('/run-thread', async (req, res) => {

    let response = "";
    const { userId, threadId, isGPTResponse, message } = req.body;

    try {

         console.log("threadId on server side   : ", threadId);
 

        await addMessageToThread(threadId, isGPTResponse, message); //this is gpt model

        const response = await runOpenAIThread(threadId);
        console.log("thread run response : ", response);
        const threadCompletionTimestamp = response.completed_at;
        console.log("thread completion timestamp in backend : ", threadCompletionTimestamp);

        res.status(200).send({ success: true, message: response , completedAt: threadCompletionTimestamp });
    } catch (error) {
        console.error("Error sending api response:", error);
        res.status(500).send({ success: false, message: 'Failed to send notification' });
    }
});



router.post('/create-thread-and-run', async (req, res) => {

    let response = "";
    const {  message } = req.body;

    try {
        //log message withing create thread and run
        console.log("msg within create thread and run endpoint   : ", message);

        const runResponse = await createAndRunThread(message); //this is gpt model

         console.log("msg within create thread and run endpoint   : ", runResponse.thread_id);
    
        const threadCompletionTimestamp = runResponse.completed_at;
        console.log("thread completion timestamp in backend : ", threadCompletionTimestamp);

        res.status(200).send({ success: true, message: runResponse , completedAt: threadCompletionTimestamp });
    } catch (error) {
        console.error("Error sending api response:", error);
        res.status(500).send({ success: false, message: 'Failed to send notification' });
    }
});


router.post('/retrive-thread-messages', async (req, res) => {

    let response = "";
    const { threadId } = req.body;



    try {
       
        console.log("threadId on /retrive-thread-messages  : ", threadId);
        
       
        //wait for json
        const response = await retriveThreadMessages(threadId);
        console.log("thread messages : ", response);


        res.status(200).send({ success: true, message: response });
    } catch (error) {
        console.error("Error sending api response:", error);
        res.status(500).send({ success: false, message: 'Failed to send notification' });
    }
});

export default router;