const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function register(email, password) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    throw Object.assign(new Error("El email ya está registrado"), {
      status: 409,
    });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: {
        connectOrCreate: {
          where: { name: "EMPLOYEE" },
          create: { name: "EMPLOYEE" },
        },
      },
    },
    include: { role: true },
  });
  return { id: user.id, email: user.email, role: user.role.name };
}

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });
  if (!user)
    throw Object.assign(new Error("Credenciales inválidas"), { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    throw Object.assign(new Error("Credenciales inválidas"), { status: 401 });

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );

  return {
    token,
    user: { id: user.id, email: user.email, role: user.role.name },
  };
}

module.exports = { register, login };
