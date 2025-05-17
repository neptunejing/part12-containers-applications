db = db.getSiblingDB("the_database");

db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "the_database",
    },
  ],
});

db.createCollection("persons");

db.persons.insert({ name: "Antti", number: "1234567" });
db.persons.insert({ name: "Lara", number: "2345678" });
