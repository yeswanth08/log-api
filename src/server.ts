import dotenv from "dotenv";
import express from "express";
import { rootRouter } from "./root.routes";
import cors from "cors";

const app = express();
dotenv.config();


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})