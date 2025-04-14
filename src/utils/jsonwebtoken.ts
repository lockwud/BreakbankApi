import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpException from "./http-error";
import { HttpStatus } from "./http-status";

// Define the payload to handle both admin and users
export interface UserPayload {
  id: string;
 studentId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // user payload
    }
  }
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return next(new HttpException(HttpStatus.FORBIDDEN, "No token found"));
  }

  jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, decoded) => {
    if (err) {
      return next(new HttpException(HttpStatus.FORBIDDEN, "Invalid token"));
    }
    next();
  });
};

// Function to sign a JWT token with the user payload
export const signToken = (payload: UserPayload): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "JWT configuration is missing"
    );
  }

  // Ensure the secret and expiresIn are the correct types.
  return jwt.sign(payload, secret as jwt.Secret, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],  // Add type assertion here
  });
};

// Function to create a short-lived invalid token
export const setInvalidToken = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "JWT secret is missing"
    );
  }

  // Ensure the secret is the correct type.
  return jwt.sign({ logout: "logout" }, secret as jwt.Secret, {
    expiresIn: "1h", // Short-lived token with correct format
  });
};