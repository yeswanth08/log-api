import { redis_pubsunb_client, redis_queue_client } from "../config/redis";
import prisma_client from "../config/prisma";
import { findAll } from "../core/prismaFunctions";
import { InternalError } from "../core/apiError";

export async function startIncidentSubscriber() {
    try {
        const subscriber = redis_pubsunb_client.duplicate();

        if (subscriber.status !== "connecting" && subscriber.status !== "ready") {
            await subscriber.connect();
        }

        await subscriber.subscribe("incidents", async (message: any) => {
            try {
                if (!message) {
                    console.error("❌ Empty message");
                    return;
                }
                const payload = JSON.parse(message.toString());
                console.log("📩 Pub/Sub Received:", payload);

                if (!payload.action) {
                    console.warn("⚠️ Missing action in Pub/Sub message");
                    return;
                }
                if (payload.action === "create") {
                    const all = await findAll(prisma_client.incident);
                    await redis_queue_client.set("incidents:all", JSON.stringify(all), "EX", 5);
                    await redis_queue_client.set(`incident:${payload.id}`, JSON.stringify(payload), "EX", 5);
                }

                /**
                 * the ttl is set to 5 seconds for the cache due to testing purposes
                 */

                if (payload.action === "delete") {
                    await redis_queue_client.del(`incident:${payload.id}`);
                    const all = await findAll(prisma_client.incident);
                    await redis_queue_client.set("incidents:all", JSON.stringify(all), "EX", 5);
                }

            } catch (err) {
                console.error("Error processing Pub/Sub message:", err);
                throw new InternalError("Subscriber failed");
            }
        });

    } catch (error) {
        console.error("❌ Error starting subscriber:", error);
        throw new InternalError("Could not start Pub/Sub subscriber");
    }
}