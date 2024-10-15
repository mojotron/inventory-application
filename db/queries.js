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
      'SELECT * FROM category ORDER BY created_at DESC;',
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
      'INSERT INTO category (category_uid, name, created_at) VALUES (uuid_generate_v4(), $1, $2);',
      [categoryName, timestamp],
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
    const categoryUid = await getCategoryUid(categoryName);
    // remove all items holding reference to category first
    await pool.query('DELETE FROM item WHERE category_uid = $1;', [
      categoryUid,
    ]);
    // remove category
    await pool.query('DELETE FROM category WHERE category_uid = $1;', [
      categoryUid,
    ]);
  } catch (error) {
    throw new DatabaseError();
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
    (item_uid, name, description, quantity, price, created_at, category_uid) 
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

const deleteItem = async (categoryName, itemName) => {
  try {
    const categoryUid = await getCategoryUid(categoryName);

    await pool.query('DELETE FROM item WHERE category_uid = $1 AND name = $2', [
      categoryUid,
      itemName,
    ]);
  } catch (error) {
    throw new DatabaseError();
  }
};

const updateItem = async (
  categoryName,
  oldItemName,
  newItemName,
  itemDescription,
  itemQuantity,
  itemPrice,
) => {
  try {
    const categoryUid = await getCategoryUid(categoryName);

    await pool.query(
      `
    UPDATE item
    SET name = $3, description = $4, quantity = $5, price = $6
    WHERE category_uid = $1 AND name = $2;`,
      [
        categoryUid,
        oldItemName,
        newItemName,
        itemDescription,
        itemQuantity,
        itemPrice,
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

export {
  selectCategories,
  insertCategory,
  deleteCategory,
  updateCategory,
  insertItem,
  selectItemsByCategory,
  selectItemByCategoryAndName,
  deleteItem,
  updateItem,
};
