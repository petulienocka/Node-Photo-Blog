exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Carla",
          last_name: "Podenco",
          email: "carla@carla.com",
          password: "pass123"
        }
      ]);
    });
};
