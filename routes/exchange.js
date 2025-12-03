import { Router } from "express";

const router = Router();

router.get("/api/exchange-rate", async (req, res) => {
  try {
    const { from = "USD", to = "EUR", amount = "1" } = req.query;

    if (!from || !to) {
      return res
        .status(400)
        .json({ error: 'Please provide "from" and "to" currency codes' });
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ error: '"amount" must be a positive number' });
    }

    // Using the free Frankfurter API (no API key required)
    const url = `https://api.frankfurter.app/latest?amount=${encodeURIComponent(
      parsedAmount
    )}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res
        .status(502)
        .json({ error: "Failed to fetch exchange rate from external service" });
    }

    const data = await response.json();
    const rateKey = Object.keys(data.rates || {})[0];

    if (!rateKey) {
      return res
        .status(400)
        .json({ error: "Invalid currency pair or no rate available" });
    }

    const convertedAmount = data.rates[rateKey];

    res.json({
      from: data.base,
      to: rateKey,
      amount: data.amount,
      rate: convertedAmount / data.amount,
      convertedAmount,
    });
  } catch (error) {
    console.error("Exchange rate error:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching exchange rate" });
  }
});

export default router;


