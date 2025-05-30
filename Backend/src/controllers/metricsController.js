const db = require('../db/connection');

exports.saveMetric = async (req, res) => {
  const { metric_type, metric_data } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO metrics (metric_type, metric_data, created_at) VALUES (?, ?, NOW())',
      [metric_type, metric_data]
    );
    res.status(201).json({ message: 'Metric saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};
