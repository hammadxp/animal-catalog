import express from "express";
import cors from "cors";

// Initialize 'express' app

const app = express();
app.use(cors());
app.use(express.json());

// Make some animals

import Chance from "chance";
const chance = new Chance();

const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    name: chance.name(),
    age: chance.age(),
  };
});

app.get("", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const results = animals.filter((animal) => animal.type.toLowerCase().includes(q));

  console.log(`Request: ${q}`);
  console.log(`Response: ${results}`);

  res.send(results);
});

app.listen(7777, () => console.log("Listening on port 7777"));
