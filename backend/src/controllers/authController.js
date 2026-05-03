const authService = require("../services/authService");
const { z } = require("zod");

const authSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

function formatZodErrors(error) {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, messages]) => [
      key,
      messages?.[0] || "",
    ]),
  );
}

async function register(req, res, next) {
  try {
    const parseResult = authSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        fieldErrors: formatZodErrors(parseResult.error),
      });
    }

    const { email, password } = parseResult.data;
    const user = await authService.register(email, password);
    res.status(201).json({ message: "Usuario registrado", user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const parseResult = authSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        fieldErrors: formatZodErrors(parseResult.error),
      });
    }

    const { email, password } = parseResult.data;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
