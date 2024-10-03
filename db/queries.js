import pool from './pool.js';

// CATEGORIES
const insertCategory = async (categoryName) => {
  try {
    await pool.query(
      'INSERT INTO category (uuid, name) VALUES (uuid_generate_v4(), $1)',
      [categoryName],
    );
  } catch (error) {
    throw error;
  }
};

export { insertCategory };
