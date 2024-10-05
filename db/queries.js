import pool from './pool.js';
import DatabaseError from '../errors/DatabaseError.js';

// CATEGORIES
const selectCategories = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM category;');
    return rows;
  } catch (error) {
    throw new DatabaseError();
  }
};

const insertCategory = async (categoryName) => {
  try {
    await pool.query(
      'INSERT INTO category (uuid, name) VALUES (uuid_generate_v4(), $1);',
      [categoryName],
    );
  } catch (error) {
    throw new DatabaseError();
  }
};

export { selectCategories, insertCategory };
