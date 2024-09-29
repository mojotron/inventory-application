import pg from 'pg';

const { Client } = pg;

const SQL = `

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
