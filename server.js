import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

//----------------- AI imports- -------------


import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from "@google/generative-ai/server";

import path from 'path'
dotenv.config();

//open ai api key
const OPEN_API_KEY = process.env.OPEN_API_KEY;
import { CohereClient } from 'cohere-ai';
//cohere api key
const COHERE_API_KEY = process.env.COHERE_API_KEY;

// console.log("open ai api key : ", OPEN_API_KEY);
import OpenAI from "openai";
import { connectors } from 'cohere-ai/api/index.js';
import { response } from 'express';

// cohere client
const cohere = new CohereClient({
    token: COHERE_API_KEY, // This is your trial API key
});

// console.log("open ai api key : ", OPEN_API_KEY);

const openai = new OpenAI({ apiKey: OPEN_API_KEY });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

import cors from 'cors';

//env config
dotenv.config();
// app intialization
const app = express();
app.use(express.json());
const TOKEN = process.env.TOKEN;



// Middleware
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173',], // Allow requests from these origins
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

//cors 
app.use(cors(corsOptions));

//this endpoint will get invoked when user does the payment  . this is for the purpose of sending msg to user . msg contains the gpt or gemini based text output
app.post('/process', async (req, res) => {

    let response = "";
    const { transactionId, userId, status, message, model } = req.body;

    // Optionally, validate the data or process it further
    // console.log("server user id : ", userId);
    // console.log("server msgText : ", msgText);
    // console.log("server model : ", model);
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
        console.error("Error sending notification to Telegram bot:", error);
        res.status(500).send({ success: false, message: 'Failed to send notification' });
    }
});



//this is for the chat completion using gemini
/*
This code snippet defines an asynchronous function called `getChatCompletionGemini` that takes a `msg_text` parameter. 
Inside the function, it uses the `genAI` object to retrieve a generative model with the name "gemini-1.5-flash". 
It then generates content using the model and the `msg_text` as the prompt. The generated content is stored in the `result` variable. 
The function then extracts the response from the `result` and converts it to plain text. Finally, it removes any occurrences of "**" from the response and returns the cleaned response.

*/
async function getChatCompletionGemini(msg_text) {
    try {


        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = msg_text

        const result = await model.generateContent(prompt);
        // console.log("gemini completion : ", result);
        const response = await result.response;
        const text = response.text();
        // console.log(text);
        const completeResponse = `${text}`
        let cleanedResponse = completeResponse.replace(/\*\*/g, '');
        return cleanedResponse;
    } catch (error) {
        console.error('Error:', error);
    }
}



//this if for the text completion using gpt
/*

This JavaScript function, `getChatCompletionGPT`, generates a text response using the GPT-3.5-turbo model.
 It takes a `msg_text` parameter, passes it to the model as a user message, and returns the generated response after removing any double asterisks (`**`).
*/
async function getChatCompletionGPT(msg_text) {
    try {


        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            // model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: msg_text,
                },
            ],
        });

        // console.log("gpt completion : ", completion);
        // console.log(completion.choices[0].message.content);
        const completeResponse = `${completion.choices[0].message.content}`
        let cleanedResponse = completeResponse.replace(/\*\*/g, '');
        return cleanedResponse;


    } catch (error) {
        console.error('Error:', error);
    }
}



// get cohere RAG for search info and relevant documents

/**************************/
/**
 * @function getCohereChat
 * @description This function takes a user query and returns the response from the Cohere RAG model.
 * @param {string} userQuery - The query to be passed to the Cohere RAG model.
 * @returns {Promise<string>} - The response from the Cohere RAG model.
 * @example
 * const response = await getCohereChat("What is the capital of France?");
 * console.log(response);
 * 

This JavaScript function, `getCohereChat`, sends a user query to the Cohere RAG model and returns the response as a string.
 It uses the `cohere.chat` method to make a request to the model with the provided query and options, and logs any errors that occur.
 The function is asynchronous and returns a Promise that resolves to the response text.
 */
/****** *******/
export async function getCohereChat(userQuery) {

    try {

        const webSearchResponse = await cohere.chat({
            model: "command-r-plus-08-2024",
            message: userQuery,
            promptTruncation: "AUTO",
            connectors: [{ "id": "web-search" }],

        })

        console.log("Cohere RAG : ", webSearchResponse);

        return webSearchResponse.text;



    } catch (error) {
        console.log("error while getting cohere chat : ", error.message);
    }



}


app.listen('8000', () => {
    console.log(`Server listening on port 8000`);
});