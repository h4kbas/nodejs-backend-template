import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export function authenticateViaJWT(user: User) {
  const secret = process.env.JWT_SECRET || "secret";
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "2d",
      issuer: process.env.JWT_ISSUER || "soulmeet",
    }
  );
  return token;
}
