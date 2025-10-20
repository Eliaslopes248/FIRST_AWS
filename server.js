const express = require('express');
const MySQLClient = require('./mysql-client');

const app = express();
const port = process.env.PORT || 3000;
const db = new MySQLClient();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js server!',
    timestamp: new Date().toISOString(),
    status: 'running'
  });
});

// Example route that uses MySQL
app.get('/users', async (req, res) => {
  try {
    // Example query - you can modify this based on your database structure
    const users = await db.query('SELECT * FROM users LIMIT 10');
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  try {
    await db.connect();
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  await db.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down server...');
  await db.close();
  process.exit(0);
});
