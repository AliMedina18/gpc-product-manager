import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import { Card, CardBody, CardFooter } from "../components/Card";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const getFieldErrors = (error) =>
  Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, messages]) => [
      key,
      messages?.[0] || "",
    ]),
  );

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState("");
  const form = useForm({ email: "", password: "" });

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      form.setErrors(getFieldErrors(result.error));
      return;
    }

    try {
      await login(result.data.email, result.data.password);
      navigate("/dashboard");
    } catch (error) {
      setSubmitError(error.error || "Error al iniciar sesión");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-lg mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">GPC Manager</h1>
          <p className="text-gray-600 mt-2">Gestión de productos con GPC</p>
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

              <Button type="submit" className="w-full" disabled={form.loading}>
                {form.loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
          </CardBody>

          <CardFooter>
            <p className="text-sm text-gray-600 w-full">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
