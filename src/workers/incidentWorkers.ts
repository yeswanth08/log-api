import prisma_client from "../config/prisma";
import { redis_queue_client, redis_pubsunb_client } from "../config/redis";
import { createRow, deleteById, findAll, findById } from "../core/prismaFunctions";
import { InternalError, NotFoundError } from "../core/apiError";

export async function processIncident() {
    try {
        while (true) {
            const taskString = await redis_queue_client.rpop("incidents");
            if (!taskString) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            const task = JSON.parse(taskString);
            if (task.action === "create") {
                const { title, description, severity, reportedAt } = task;
                const savedIncident = await createRow(prisma_client.incident, {
                    title,
                    description,
                    severity,
                    reportedAt,
                });
                await redis_queue_client.set(`incident:${savedIncident.id}`, JSON.stringify(savedIncident), "EX", 5);
                await redis_queue_client.del("incidents:all");
                /**
                 * the ttl is set to 10 seconds for the cache due to testing purposes
                 */

                const allIncidents = await findAll(prisma_client.incident);
                await redis_queue_client.set("incidents:all", JSON.stringify(allIncidents), "EX", 5);

                await redis_pubsunb_client.publish("incidents", JSON.stringify({
                    ...savedIncident,
                    action: "create"
                }));

            }else if (task.action === "delete") {
                const deleted = await deleteById(prisma_client.incident, task.id);
                if (!deleted) {
                  console.warn(`Failed to delete incident with ID ${task.id}`);
                  continue;
                }
                /**
                 * the ttl is set to 5 seconds for the cache due to testing purposes
                 */
                await redis_queue_client.del(`incident:${task.id}`);
                await redis_queue_client.del("incidents:all"); 

                const allIncidents = await findAll(prisma_client.incident);
                await redis_queue_client.set("incidents:all", JSON.stringify(allIncidents), "EX", 5);

                await redis_pubsunb_client.publish("incidents", JSON.stringify({
                    id: task.id,
                    action: "delete"
                }));
            }else {
                console.warn("Unknown action:", task.action);
            }
        }
    } catch (error) {
        console.error("Error processing incident:", error);
        throw new InternalError();
    }
}
