import { roles } from "../models/roles.js";
import User from "../models/users.js";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ userName: req.body.userName });
  if (user) {
    res.status(400).json({ message: "Failed! Username is already in use!" });
    return;
  }

  const email = await User.findOne({ email: req.body.email });
  if (email) {
    res.status(400).json({ message: "Failed! Email is already in use!" });
    return;
  }
  next();
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!roles.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};
