import { prismaClient } from "../extras/prisma.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const { sign } = jwt; // ✅ Extract sign from default import


const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (username: string, password: string, name: string) => {
  const hashedPassword = await hash(password, 10);
  return await prismaClient.user.create({
    data: { username, password: hashedPassword, name },
  });
};

export const loginUser = async (username: string, password: string) => {
  const user = await prismaClient.user.findUnique({ where: { username } });
  if (!user) throw new Error("Invalid credentials");

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
  return { user, token };
};
