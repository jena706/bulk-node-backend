const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 8080;
const BULK_API = 'https://exchange-api.bulk.trade/api/v1';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'bulk-backend', version: '1.0.0' });
});

app.post('/proxy/account', async (req, res) => {
  try {
    const response = await fetch(`${BULK_API}/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/proxy/ticker/:symbol', async (req, res) => {
  try {
    const response = await fetch(`${BULK_API}/ticker?symbol=${req.params.symbol}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/proxy/info', async (req, res) => {
  try {
    const response = await fetch(`${BULK_API}/exchangeInfo`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Bulk backend proxy running on port ${PORT}`);
});
