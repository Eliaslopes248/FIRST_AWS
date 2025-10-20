const mysql = require('mysql2/promise');
require('dotenv').config();

class MySQLClient {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'testdb',
        port: process.env.DB_PORT || 3306
      });
      console.log('Connected to MySQL database');
      return this.connection;
    } catch (error) {
      console.error('Error connecting to MySQL:', error);
      throw error;
    }
  }

  async query(sql, params = []) {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const [rows] = await this.connection.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
      console.log('MySQL connection closed');
    }
  }
}

module.exports = MySQLClient;
