import pool from './pool.js';
import DatabaseError from '../errors/DatabaseError.js';

// HELPERS
const getCategoryUid = async (categoryName) => {
  try {
    const { rows } = await pool.query(
      'SELECT category_uid FROM category WHERE name = $1;',
      [categoryName],
    );

    return rows[0].category_uid;
  } catch (error) {
    throw error;
  }
};

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
const insertItem = async (
  categoryName,
  itemName,
  itemDescription,
  itemQuantity,
  itemPrice,
) => {
  try {
    const timestamp = new Date().toISOString();

    const categoryUid = await getCategoryUid(categoryName);

    await pool.query(
      `
    INSERT INTO item 
    (item_uid, name, description, quantity, price, createdAt, category_uid) 
    VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6);`,
      [
        itemName,
        itemDescription,
        itemQuantity,
        itemPrice,
        timestamp,
        categoryUid,
      ],
    );
  } catch (error) {
    if (error.code === '23505') {
      throw new DatabaseError(
        `${itemName} item already exists in ${categoryName} category`,
      );
    }
    throw new DatabaseError();
  }
};

const selectItemsByCategory = async (categoryName) => {
  try {
    const categoryUid = await getCategoryUid(categoryName);

    const { rows } = await pool.query(
      'SELECT * FROM item WHERE category_uid = $1 ORDER BY name ASC;',
      [categoryUid],
    );

    return rows;
  } catch (error) {
    throw new DatabaseError();
  }
};

const selectItemByCategoryAndName = async (categoryName, itemName) => {
  try {
    const categoryUid = await getCategoryUid(categoryName);
    const { rows } = await pool.query(
      `
    SELECT * FROM item WHERE category_uid = $1 AND name = $2;
    `,
      [categoryUid, itemName],
    );
    return rows[0];
  } catch (error) {
    throw new DatabaseError();
  }
};

export {
  selectCategories,
  insertCategory,
  deleteCategory,
  updateCategory,
  insertItem,
  selectItemsByCategory,
  selectItemByCategoryAndName,
};
