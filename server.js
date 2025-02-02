import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.get("/api/rates/:currency", async (req, res) => {
    const { currency } = req.params;

    const url = currency ?
      `https://api.uphold.com/v0/ticker/${currency}` :
      `https://api.uphold.com/v0/ticker/`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates from Uphold");
      }
  
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));