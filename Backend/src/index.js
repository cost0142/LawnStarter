const express = require('express');
const cors = require('cors');
require('dotenv').config();

const metricsRoutes = require('./routes/metrics');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', metricsRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
