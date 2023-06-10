export default () => ({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
