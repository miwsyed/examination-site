import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      return res.status(401).send("Unauthorized: No token Provided");
      // throw new Error("User not found");
    }
    console.log(rootUser);

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No token Provided");
    console.log(err);
  }
};

export default Authenticate;
