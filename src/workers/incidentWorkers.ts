import prisma_client from "../config/prisma";
import { redis_queue_client } from "../config/redis";
import { InternalErrorResponse, SuccessMsgResponse } from "../core/apiResponseError";
import { createRow } from "../core/prismaFunctions";

async function processIncident(){
    try{
        while(true){
            const incidentString = await redis_queue_client.rpop("incidents");
            if (incidentString){
                const incident = JSON.parse(incidentString);
                await createRow(prisma_client.incident,incident);
                new SuccessMsgResponse("Incident processed successfully");
            }else{
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }catch(error){
        console.error("Error processing incident:", error);
        new InternalErrorResponse("Error processing incident");
    }
}

processIncident()
    .then(() => {
        console.log("Incident processing completed successfully.");
    })
    .catch((error) => {
        console.error("Error processing incident:", error);
    });