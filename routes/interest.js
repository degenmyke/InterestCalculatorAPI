import { Router } from "express";

const router = Router();

// Simple Interest
router.post("/api/simple-interest", (req, res) => {
  const { principal, rate, time } = req.body;

  const principalNum = Number(principal);
  const rateNum = Number(rate);
  const timeNum = Number(time);

  if (
    Number.isNaN(principalNum) ||
    Number.isNaN(rateNum) ||
    Number.isNaN(timeNum)
  ) {
    return res.status(400).json({
      error: "principal, rate and time must be numeric values",
    });
  }

  const interest = (principalNum * rateNum * timeNum) / 100;
  const totalAmount = principalNum + interest;

  res.json({
    principal: principalNum,
    rate: rateNum,
    time: timeNum,
    interest,
    totalAmount,
  });
});

// Compound Interest
router.post("/api/compound-interest", (req, res) => {
  const { principal, rate, time, frequency } = req.body;

  const principalNum = Number(principal);
  const rateNum = Number(rate);
  const timeNum = Number(time);
  const frequencyNum = Number(frequency);

  if (
    Number.isNaN(principalNum) ||
    Number.isNaN(rateNum) ||
    Number.isNaN(timeNum) ||
    Number.isNaN(frequencyNum)
  ) {
    return res.status(400).json({
      error: "principal, rate, time and frequency must be numeric values",
    });
  }

  const rateDecimal = rateNum / 100;
  const amount =
    principalNum * Math.pow(1 + rateDecimal / frequencyNum, frequencyNum * timeNum);
  const interest = amount - principalNum;

  res.json({
    principal: principalNum,
    rate: rateNum,
    time: timeNum,
    frequency: frequencyNum,
    interest: Number(interest.toFixed(2)),
    totalAmount: Number(amount.toFixed(2)),
  });
});

export default router;

