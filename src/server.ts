import dotenv from "dotenv";
import express from "express";
import { rootRouter } from "./root.routes";
import cors from "cors";
import { startIncidentSubscriber } from "./subscribers/incidentSubscriber";

const app = express();
dotenv.config();


const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);
app.use("/", (req, res) => {
  res.json({
    messsge: "Health check",
    status: "OK",
  })
});

startIncidentSubscriber()
.then(() => {
  console.log("Subscriber started successfully 🚀");
})
.catch((error) => {
  console.error("Error starting subscriber:", error);
  });

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} 🚀`);
})