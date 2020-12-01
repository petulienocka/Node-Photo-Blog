const router = require("express").Router();
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const { isAuthenticated } = require("../functions/auth");

router.get("/users/authenticated", async (req, res, next) => {
  try {
    if (!req.session.user) {
      throw res.status(403).send({ message: "denied" });
    } else res.status(200).send({ message: "authenticated" });
  } catch (error) {
    next();
  }
});

router.get("/user", isAuthenticated, async (req, res, next) => {
  const user = await User.query()
    .select("first_name", "last_name", "email")
    .findById(req.session.user.id);
  res.json(user);
});

router.get("/users/logout", async (req, res) => {
  try {
    req.session.destroy(error => {
      if (error) {
        throw res.status(500).send({ message: "unable to logout" });
      }
      res
        .status(200)
        .clearCookie("connect.sid")
        .send({ message: "Logged out" });
    });
  } catch (error) {}
});

router.post("/users/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (firstName && lastName && email && password) {
    if (password.length < 8) {
      return res
        .status(400)
        .send({ response: "Password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          const existingUser = await User.query()
            .select()
            .where({ email: email })
            .limit(1);
          if (existingUser[0]) {
            return res.status(400).send({ response: "User already exists" });
          } else {
            const newUser = await User.query().insert({
              first_name: firstName,
              last_name: lastName,
              email,
              password: hashedPassword
            });
            return res
              .status(200)
              .send({ response: "User created with email " + newUser.email });
          }
        } catch (error) {
          return res.status(500).send({ response: "DB error" });
        }
      });
    }
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const users = await User.query()
      .select()
      .where({ email: email })
      .limit(1);
    const user = users[0];

    if (!user) {
      return res.status(404).send({ response: "Wrong email" });
    }
    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({});
      }
      if (!isSame) {
        return res.status(404).send({ response: "check the credentials" });
      } else {
        req.session.user = { email: user.email, id: user.id };
        return res.status(200).send({ response: "Logged-in, welcome" });
      }
    });
  } else {
    return res.status(404).send({ response: "Missing email or password" });
  }
});

router.patch("/users/update", isAuthenticated, async (req, res, next) => {
  const { id, email, password, firstName, lastName } = req.body;
  try {
    const user = await User.query()
      .findById(id)
      .throwIfNotFound();
    await user.$query().patch({ email, password, firstName, lastName });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/users/delete", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.query().deleteById(req.session.user.id);
    if (user) {
      res.json({
        message: `User ${req.session.username} successfully deleted`
      });
    } else {
      res.json({
        message: `Error deleting the user`
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
