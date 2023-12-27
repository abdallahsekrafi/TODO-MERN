import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todoRouter from "./routes/todoRoute.js";

const app = express();
const PORT = 5000;

const dbURL =
  "mongodb+srv://abdallahsek:9cHyZPxjDTAvWczG@cluster0.8fpqzvk.mongodb.net/tododb";
// midlewere
app.use(express.json());
app.use(cors());

// router
app.use("/todos", todoRouter);
// run server
//app.listen(PORT, () => console.log(`Server run in prot: ${PORT}`));
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server run in prot: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
