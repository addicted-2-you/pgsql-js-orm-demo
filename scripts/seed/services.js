const { client } = require("../client");

const selectRoles = async () => {
  const result = await client.query("SELECT * from roles");
  return (result.rows || []).map((item) => ({
    id: item.id,
    title: item.title,
  }));
};

const selectPermissions = async () => {
  const result = await client.query("SELECT * from permissions");
  return (result.rows || []).map((item) => ({
    id: item.id,
    title: item.title,
  }));
};

module.exports = {
  selectRoles,
  selectPermissions,
};
