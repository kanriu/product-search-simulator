import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import productRouter from "./router";
import mongoose from "mongoose";
const PORT = process.env.PORT || 8081;

const app = express();
const server = http.createServer(app);
app.use(cors());
//dbConnection();

//Conexion a la base de datos
mongoose
  .connect(process.env.DB_CNN_STRING)
  .then(() => {
    app.use("/api", productRouter);
    server.listen(PORT, () => console.log(`Listo por el puerto: ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
    throw new Error("Error en la base de datos - vea logs");
  });
