import dotenv from "dotenv";
import express from "express";
import { rootRouter } from "./root.routes";
import cors from "cors";
import { startIncidentSubscriber } from "./subscribers/incidentSubscriber";
import errorHandler from "./middlewares/error.handler";
import { Request, Response } from "express";
import { processIncident } from "./workers/incidentWorkers";

const app = express();
dotenv.config();


const PORT = process.env.PORT || '3000';

app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);
app.use("/", (req:Request, res:Response) => {
  res.json({
    messsge: "Health check",
    status: "OK",
  })
});

app.use(errorHandler);

(async () => {
  try {
    await startIncidentSubscriber();
    console.log("Subscriber started successfully 🚀");
    processIncident()
      .then(() => console.log("Worker exited unexpectedly"))
      .catch((err) => console.error("Worker crashed:", err));
  } catch (err) {
    console.error("Failed to start subscriber", err);
  }
})();

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT} 🚀`);
})