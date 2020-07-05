const bcrypt = require("bcrypt");
// Adds functions used by Passport.js
// for serialization and storage
const passportLocalMongoose = require("passport-local-mongoose");
// Generates random API tokens upon user account creation.
const randToken = require("rand-token");

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      apiToken: { type: String },
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
    },
    {
      timestamps: true
    }
  );

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

// Check if apiToken exists before save and generates a new
// one if it doesn't.
userSchema.pre("save", function (next) {
  let user = this;
  if (!user.apiToken) user.apiToken = randToken.generate(16);
  next();
});

// Specify the plugin to use "email" as 
// login parameter (automatically takes care of password)
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
