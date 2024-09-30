import pg from 'pg';

const { Client } = pg;

const SQL = `
CREATE EXTENSION IN NOT EXISTS "uuid-ossp";

CREATE DATABASE  category (
  uuid UUID PRIMARY KEY NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL,
);

CREATE DATABASE  item (
  uuid UUID PRIMARY KEY NOT NULL,
  category_uuid UUID,
  FOREIGN KEY (category__uuid) REFERENCE "category" (category_uuid)
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
    exit(0);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

populate();
