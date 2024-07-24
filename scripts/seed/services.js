const { client } = require("../client");

const writeSql = async (sql) => {
  await client.query(sql);
};

module.exports = {
  writeSql,
};
