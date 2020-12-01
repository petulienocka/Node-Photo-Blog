exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
    })

    .createTable("images", table => {
      table.increments("id");
      table.string("name").notNullable();
    })

    .createTable("posts", table => {
      table.increments("id");
      table.string("title").notNullable();
      table.string("description").notNullable();
      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table
        .timestamp("updated_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      table
        .enum("category", [
          "portraits",
          "nature",
          "abstract",
          "production",
          "urban"
        ])
        .notNullable();
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
        .onUpdate("cascade");
      table
        .integer("image_id")
        .unsigned()
        .notNullable();
      table
        .foreign("image_id")
        .references("id")
        .inTable("images")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.index("title", "category");
    })
    .createTable("user_posts", table => {
      table
        .integer("post_id")
        .unsigned()
        .notNullable();
      table
        .foreign("post_id")
        .references("id")
        .inTable("posts")
        .onDelete("cascade")
        .onUpdate("cascade");
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
        .onUpdate("cascade");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("images")
    .dropTableIfExists("posts")
    .dropTableIfExists("user_posts");
};
