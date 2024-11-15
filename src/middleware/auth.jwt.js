import jwt from "jsonwebtoken";
import config from "../config.js";
import rol from "../models/roles.js";

export const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["x-access-token"];

    if (!bearerHeader)
      return res.sendStatus(403).json({ msg: "No token provided" });

    const decoded = jwt.verify(bearerHeader, config.SECRET);
    const user = await user.findById(decoded.id, { password: 0 });

    if (!user) return res.sendStatus(403).json({ msg: "User not found" });
    next();
  } catch (error) {
    return res.sendStatus(403).json({ msg: "unauthorized" });
  }
};

export const isModerator = async (req, res, next) => {
  const user = await user.findById(req.userId);
  const roles = await rol.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ msg: "Require Moderator Role!" });
};

export const isAdmin = async (req, res, next) => {
  const user = await user.findById(req.userId);
  const roles = await rol.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ msg: "Require Admin Role!" });
};
