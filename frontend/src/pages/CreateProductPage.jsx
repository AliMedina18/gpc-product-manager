import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Card, CardHeader, CardBody, CardFooter } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { GPCSelector } from "../components/GPCSelector";
import { Alert } from "../components/Alert";
import { useForm } from "../hooks/useForm";
import { productService } from "../services/productService";
import { z } from "zod";

const productSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  precio: z.preprocess(
    (value) => Number(value),
    z.number().positive("El precio debe ser mayor a 0"),
  ),
  brickId: z.preprocess(
    (value) => Number(value),
    z.number().int().positive("Debe seleccionar una clasificación GPC"),
  ),
});

const getFieldErrors = (error) =>
  Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, messages]) => [
      key,
      messages?.[0] || "",
    ]),
  );

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedBrickId, setSelectedBrickId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    nombre: "",
    descripcion: "",
    precio: "",
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const response = await productService.getById(id);
        const product = response.data;

        if (!product) {
          setErrorMessage("Producto no encontrado");
          return;
        }

        form.setValues({
          nombre: product.nombre || "",
          descripcion: product.descripcion || "",
          precio: product.precio?.toString() || "",
        });
        setSelectedBrickId(product.brickId || product.brick?.id || "");
      } catch (error) {
        setErrorMessage("Error al cargar el producto");
      }
    };

    loadProduct();
  }, [id]);

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = productSchema.safeParse({
      ...values,
      brickId: selectedBrickId,
    });

    if (!result.success) {
      form.setErrors(getFieldErrors(result.error));
      setErrorMessage("Por favor corrige los campos marcados");
      return;
    }

    try {
      const productData = {
        nombre: result.data.nombre,
        descripcion: result.data.descripcion,
        precio: result.data.precio,
        brickId: result.data.brickId,
      };

      if (id) {
        await productService.update(id, productData);
        setSuccessMessage("Producto actualizado correctamente");
      } else {
        await productService.create(productData);
        setSuccessMessage("Producto creado correctamente");
        form.reset();
        setSelectedBrickId("");
      }

      setTimeout(() => navigate("/products"), 2000);
    } catch (error) {
      setErrorMessage(error.error || "Error al guardar el producto");
    }
  });

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? "Editar Producto" : "Crear Nuevo Producto"}
        </h1>
        <p className="text-gray-600 mt-2">
          {id
            ? "Modifica los detalles del producto"
            : "Agrega un nuevo producto a tu catálogo"}
        </p>
      </div>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Información del Producto" />
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nombre del Producto"
                  name="nombre"
                  placeholder="Ej: Laptop Dell XPS 13"
                  value={form.values.nombre}
                  onChange={form.handleChange}
                  error={form.errors.nombre}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    name="descripcion"
                    placeholder="Describe tu producto..."
                    value={form.values.descripcion}
                    onChange={form.handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <Input
                  label="Precio"
                  name="precio"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={form.values.precio}
                  onChange={form.handleChange}
                  error={form.errors.precio}
                  required
                />

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Clasificación GPC
                  </h3>
                  <GPCSelector
                    onChange={setSelectedBrickId}
                    selectedBrickId={selectedBrickId}
                  />
                  {form.errors.brickId && (
                    <p className="mt-2 text-sm text-red-600">
                      {form.errors.brickId}
                    </p>
                  )}
                </div>

                <CardFooter className="border-0 p-0 mt-8">
                  <Button
                    type="submit"
                    disabled={form.loading}
                    className="flex-1"
                  >
                    {form.loading ? "Guardando..." : "Guardar Producto"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/products")}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader title="Ayuda" />
            <CardBody>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-900 mb-1">¿Qué es GPC?</p>
                  <p>
                    Global Product Classification es un estándar internacional
                    para la clasificación de productos.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Pasos:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Selecciona el Segment</li>
                    <li>Selecciona la Family</li>
                    <li>Selecciona la Class</li>
                    <li>Selecciona el Brick</li>
                    <li>Revisa los atributos</li>
                  </ol>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
