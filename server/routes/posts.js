const router = require("express").Router();
const crypto = require("crypto");
const multer = require("multer");
const mime = require("mime");
const User = require("../models/User");
const Image = require("../models/Image");
const Post = require("../models/Post");
const UserPosts = require("../models/UserPosts");
const { isAuthenticated } = require("../functions/auth");
//const fileUpload = require("express-fileupload");

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + "/../files/images");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      crypto.randomBytes(16).toString("hex") +
        "." +
        mime.getExtension(file.mimetype)
    );
  }
});
const uploadImages = multer({ storage: imageStorage });

router.get("/posts", async (req, res) => {
  const { id } = req.session.user;
  //const usersPosts = await user.$relatedQuery("posts");
  try {
    const user = await User.query().findById(id);
    if (!user) {
      return res.status(401).send("User was not found");
    }
    const posts = await Post.query()
      .select([
        "images.name",
        "posts.category",
        "posts.title",
        "posts.description",
        "posts.created_at"
      ])
      .join("images", { "posts.image_id": "images.id" });

    console.log("it worked");
    return res.status(200).send({ posts: posts });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ response: "No posts found" });
  }
});

router.post(
  "/posts/create",
  isAuthenticated,
  uploadImages.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    if (req.files.image[0]) {
      const userId = req.session.user.id;
      const image = {
        filename: req.files.image[0].filename
      };

      const { title, description, category } = req.body;

      try {
        let image = await Image.query().insert({
          name: req.files.image[0].filename
        });
        console.log(image);
        let post = await Post.query().insert({
          title,
          description,
          category,
          image_id: image.id,
          user_id: userId
        });
        console.log(post);
        await UserPosts.query().insert({
          post_id: post.id,
          user_id: userId
        });
        return res.status(200).send("Success!");
      } catch (error) {
        console.log(error);
        return res.status(500).send("error");
      }
    }
  }
);

router.patch("/posts/update", isAuthenticated, async (req, res, next) => {
  const { id, title, description, category, image } = req.body;
  try {
    const post = await Post.query()
      .findById(id)
      .throwIfNotFound();
    await post.$query().patch({ title, description, category, image });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete("/posts/delete", isAuthenticated, async (req, res, next) => {
  const { id } = req.body;
  try {
    const post = await Post.query()
      .findById(id)
      .throwIfNotFound();
    await post.$query().delete();
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
