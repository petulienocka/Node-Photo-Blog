const { Model } = require("objection");
const User = require("./User");
const Post = require("./Post");

class UserPosts extends Model {
  static get tableName() {
    return "user_posts";
  }
  static get relationMappings() {
    return {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "user_posts.user_id",
        to: "users.id"
      }
    };
  }
  static get relationMappings() {
    return {
      relation: Model.BelongsToOneRelation,
      modelClass: Post,
      join: {
        from: "user_posts.post_id",
        to: "posts.id"
      }
    };
  }
}

module.exports = UserPosts;
