// Load environment variables from appropriate .env file
const NODE_ENV = process.env.NODE_ENV || 'dev';
const isProduction = NODE_ENV === 'prod' || NODE_ENV === 'production';

// Load the appropriate .env file based on environment
if (isProduction) {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config({ path: '.env.development' });
}

const express = require('express');
const app = express();

// Port selection based on environment
const port = process.env.PORT || (isProduction ? 8080 : 3000);

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



// Start server
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port} in ${NODE_ENV} environment`);
});

