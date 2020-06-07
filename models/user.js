const bcrypt = require("bcrypt");
// Adds functions used by Passport.js
// for serialization and storage
const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
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

// Specify the plugin to use "email" as 
// login parameter (automatically takes care of password)
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
