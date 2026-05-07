const pool = require('./src/lib/db');

async function checkCategories() {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    console.log('Categories:', rows);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCategories();
