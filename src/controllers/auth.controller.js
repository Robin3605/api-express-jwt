import user from "../models/users.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import rol from "../models/roles.js";

export const singup = async (req, res) => {
  const { email, password, userName, roles } = req.body;
  const newUser = new user({
    userName,
    email,
    password: await user.encryptPassword(password),
    // roles,
  });

  if (roles) {
    const foundRoles = await rol.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await rol.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const userSaved = await newUser.save();
  console.log(userSaved);
  //process.env.JWT_SECRET
  const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.status(201).json({ token });
};

export const singin = async (req, res) => {
  const userFound = await user
    .findOne({ email: req.body.email })
    .populate("roles");
  if (!userFound) return res.status(401).json({ msg: "User not found" });

  const matchPassword = await user.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword) return res.status(401).json({ msg: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.json({ token });
};
