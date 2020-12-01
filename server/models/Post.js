const { Model } = require("objection");
const Image = require("./Image");
const User = require("./User");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  static get relationMappings() {
    return {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "post.id",
        through: {
          from: "user_posts.post_id",
          to: "user_posts.user_id"
        },
        to: "user.id"
      }
    };
  }

  static get relationMappings() {
    return {
      image: {
        relation: Model.HasManyRelation,
        modelClass: Image,
        join: {
          from: "posts.image_id",
          to: "image.id"
        }
      }
    };
  }
}

module.exports = Post;
