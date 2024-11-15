import express from "express";
import morgan from "morgan";
import productsRouter from "./routes/products.routes.js";
import authroutes from "./routes/auth.routes.js";
import { createRoles } from "./libs/inicialSetup.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
createRoles();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    autor: "Robinson",
    version: "1.0.0",
    description: "API para manejo de usuarios",
  });
});

app.use("/api/products", productsRouter);
app.use("/api/auth", authroutes);
app.use("/api/users", userRoutes);

export default app;
