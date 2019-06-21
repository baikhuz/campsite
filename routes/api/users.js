const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");

const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Test route
// @access  Public

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  [check("email", "Please include a valid email").isEmail()],
  [
    check(
      "password",
      "Please enter a password with at least 6 characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // VV checks if the user exists in the db VV
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // VV gets the user's gravatar VV
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // VV salting and hashing the password VV

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save(); // this is a mongodb command

      // VV return jwt VV
      const payload = {
        user: {
          // VV mongoose uses an abstraction, so instead of using "_id" from MongoDB, we can just use id VV
          id: user.id
        }
      };

      // VV uses the config's default.json to feed the secret to the jwt sign method VV
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //   res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
