// api server entry
import express from "express";
import cors from "cors";
import morgan from "morgan";

import interestRoutes from "./routes/interest.js";
import exchangeRoutes from "./routes/exchange.js";
import authRoutes from "./routes/auth.js";
import logRoutes from "./routes/logs.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(interestRoutes);
app.use(exchangeRoutes);
app.use(logRoutes);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`)
);