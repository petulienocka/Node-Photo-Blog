const { Model } = require("objection");
const Post = require("./Post");

class User extends Model {
  static get tableName() {
    return "users";
  }
  static get relationMappings() {
    return {
      relation: Model.HasManyRelation,
      modelClass: Post,
      join: {
        from: "user.id",
        through: {
          from: "user_posts.user_id",
          to: "user_posts.post_id"
        },
        to: "post.id"
      }
    };
  }
}

module.exports = User;
