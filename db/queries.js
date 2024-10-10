import pool from './pool.js';
import DatabaseError from '../errors/DatabaseError.js';

// CATEGORIES
const selectCategories = async () => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM category ORDER BY createdAt DESC;',
    );
    return rows;
  } catch (error) {
    throw new DatabaseError();
  }
};

const insertCategory = async (categoryName) => {
  try {
    const timestamp = new Date().toISOString();

    await pool.query(
      'INSERT INTO category (category_uid, name, createdAt) VALUES (uuid_generate_v4(), $1, $2);',
      [categoryName, timestamp],
    );
  } catch (error) {
    if (error.code === '23505') {
      throw new DatabaseError(`${categoryName} category already exists`);
    }
    console.log(error);
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
    await pool.query('UPDATE category SET name = $2 WHERE name = $1;', [
      oldCategoryName,
      newCategoryName,
    ]);
  } catch (error) {
    if (error.code === '23505') {
      throw new DatabaseError(`${newCategoryName} category already exists`);
    }
    throw new DatabaseError();
  }
};

// ITEMS

export { selectCategories, insertCategory, deleteCategory, updateCategory };
