db = db.getSiblingDB("library");

db.users.insertMany([
  {
    name: "admin",
  },
  {
    title: "employee",
  },
]);
