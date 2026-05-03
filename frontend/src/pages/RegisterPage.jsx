import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import { Card, CardBody, CardFooter } from "../components/Card";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmar contraseña es requerida"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const getFieldErrors = (error) =>
  Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, messages]) => [
      key,
      messages?.[0] || "",
    ]),
  );

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [submitError, setSubmitError] = useState("");
  const form = useForm({ email: "", password: "", confirmPassword: "" });

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = registerSchema.safeParse(values);
    if (!result.success) {
      form.setErrors(getFieldErrors(result.error));
      return;
    }

    try {
      await register(result.data.email, result.data.password);
      navigate("/dashboard");
    } catch (error) {
      setSubmitError(error.error || "Error al registrarse");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-lg mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">GPC Manager</h1>
          <p className="text-gray-600 mt-2">Crear nueva cuenta</p>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <Alert
                  type="error"
                  message={submitError}
                  onClose={() => setSubmitError("")}
                />
              )}

              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="tu@email.com"
                value={form.values.email}
                onChange={form.handleChange}
                error={form.errors.email}
                required
              />

              <Input
                type="password"
                name="password"
                label="Contraseña"
                placeholder="••••••••"
                value={form.values.password}
                onChange={form.handleChange}
                error={form.errors.password}
                required
              />

              <Input
                type="password"
                name="confirmPassword"
                label="Confirmar contraseña"
                placeholder="••••••••"
                value={form.values.confirmPassword}
                onChange={form.handleChange}
                error={form.errors.confirmPassword}
                required
              />

              <Button type="submit" className="w-full" disabled={form.loading}>
                {form.loading ? "Registrando..." : "Registrarse"}
              </Button>
            </form>
          </CardBody>

          <CardFooter>
            <p className="text-sm text-gray-600 w-full">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
