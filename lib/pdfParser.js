
import { PdfReader } from 'pdfreader'
export const parsePdf = async (bufferData) => {
    

    try {
        let parsedText = [];
        await new Promise((resolve, reject) => {
            new PdfReader().parseBuffer(bufferData, function (err, item) {
                if (err) {
                    reject(err);
                } else if (!item) {
                    resolve(parsedText.join(' '));
                } else if (item.text) {
                    parsedText.push(item.text);
                }
            });
        });

        return parsedText.join(' ');
        
    } catch (error) {
        
        //log error 
        console.log("error while parsing pdf : ", error);
    }

}