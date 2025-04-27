import { redis_pubsunb_client } from "../config/redis";

export async function startIncidentSubscriber() {
    try {
        const subscriber = redis_pubsunb_client.duplicate();

        if (subscriber.status !== "connecting" && subscriber.status !== "ready") {
            await subscriber.connect();
        }

        await subscriber.subscribe("incidents", (message: any) => {
            try {
                if (!message) {
                    console.error("Received null or empty message");
                    return;
                }
                const payload = JSON.parse(message);
                if (!payload || !payload.action) {
                    console.error("Invalid message format: Missing 'action' property", message);
                    return;
                }
                if (payload.action === "delete") {
                    console.log("Delete incident:", payload.id);
                } else {
                    console.log("New incident:", payload);
                }
            } catch (error) {
                console.error("Error processing message:", error);
            }
        });
    } catch (error) {
        console.error("Error starting subscriber:", error);
    }
}
