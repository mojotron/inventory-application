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
    if (error.code === '23505') {
      throw new DatabaseError(`${categoryName} category already exists`);
    }
    throw new DatabaseError();
  }
};

const deleteCategory = async (categoryName) => {
  try {
    await pool.query('DELETE FROM category WHERE name = $1;', [categoryName]);
  } catch (error) {
    throw DatabaseError();
  }
};

const updateCategory = async (oldCategoryName, newCategoryName) => {
  try {
    const { rows } = await pool.query(
      'SELECT uuid FROM category WHERE name = $1',
      [oldCategoryName],
    );
    console.log(rows);
    return;
  } catch (error) {
    if (error.code === '23505') {
      throw new DatabaseError(`${newCategoryName} category already exists`);
    }
    throw new DatabaseError();
  }
};

export { selectCategories, insertCategory, deleteCategory, updateCategory };
