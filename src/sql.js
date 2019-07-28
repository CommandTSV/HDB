import mysql from 'promise-mysql';

let connection;

async function connect() {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  });
  console.log('connected to db', process.env.DB_DATABASE_NAME);
}

connect();

export async function signUp({
  username,
  password,
  domain,
  firstName,
  lastName,
  role = 'user',
}) {
  // await connection.query('use tsv');
  await connection.query('INSERT INTO user SET username = ?, `password`=?, domain=?, firstName=?, lastName=?, role=?', [username,
    password,
    domain,
    firstName,
    lastName,
    role]);
}
