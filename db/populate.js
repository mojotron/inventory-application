import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const SQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS category;

CREATE TABLE category (
  category_uid UUID PRIMARY KEY NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL,
  createdAt TIMESTAMP NOT NULL
);

CREATE TABLE item (
  item_uid UUID PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(250) NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(20,2) NOT NULL,
  category_uid UUID REFERENCES category(category_uid),
  UNIQUE(category_uid)
);
`;

const populate = async () => {
  try {
    console.log('> db populate initialized');
    const client = new Client({ connectionString: process.env.POSTGRESQL_URI });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('> db populate completed');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();

// CREATE TABLE item (
//   uuid UUID PRIMARY KEY NOT NULL,
//   category_uuid UUID,
//   FOREIGN KEY (category_uuid) REFERENCE "category" (category_uuid)
// );
