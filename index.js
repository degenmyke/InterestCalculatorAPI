// api server entry
import express from "express";
import cors from "cors";

import interestRoutes from "./routes/interest.js";
import exchangeRoutes from "./routes/exchange.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(interestRoutes);
app.use(exchangeRoutes);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`)
);