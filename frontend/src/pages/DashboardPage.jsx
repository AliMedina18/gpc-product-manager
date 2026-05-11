import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardHeader, CardBody } from "../components/Card";
import { Spinner } from "../components/Spinner";
import { Button } from "../components/Button";
import { productService } from "../services/productService";
import { gpcService } from "../services/gpcService";
import { importGPCData } from "../utils/importGPC";

export const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSegments: 0,
    totalBricks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);

  const handleImportGPC = async () => {
    setImporting(true);
    try {
      const success = await importGPCData();
      if (success) {
        // Recargar estadísticas
        const [productsRes, segmentsRes, bricksRes] = await Promise.all([
          productService.getAll(),
          gpcService.getSegments(),
          gpcService.getBricks(1).catch(() => ({ data: [] })),
        ]);

        setStats({
          totalProducts: productsRes.data?.length || 0,
          totalSegments: segmentsRes.data?.length || 0,
          totalBricks: bricksRes.data?.length || 0,
        });
        alert("Datos GPC importados exitosamente");
      } else {
        alert("Error importando datos GPC");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error importando datos GPC");
    } finally {
      setImporting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bienvenido al sistema de gestión GPC
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader title="Productos" />
              <CardBody>
                <p className="text-4xl font-bold text-primary-600">
                  {stats.totalProducts}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Total de productos registrados
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Segmentos" />
              <CardBody>
                <p className="text-4xl font-bold text-primary-600">
                  {stats.totalSegments}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Categorías GPC disponibles
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Bricks" />
              <CardBody>
                <p className="text-4xl font-bold text-primary-600">
                  {stats.totalBricks}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Clasificaciones disponibles
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader title="Importar datos GPC" />
              <CardBody>
                <p className="text-gray-600 text-sm mb-4">
                  Importa los datos GPC desde GPCData.json al local storage para
                  usar en el frontend.
                </p>
                <Button
                  onClick={handleImportGPC}
                  disabled={importing}
                  className="w-full"
                >
                  {importing ? "Importando..." : "Importar datos GPC"}
                </Button>
              </CardBody>
            </Card>
          </div>
        </>
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Información del sistema" />
          <CardBody>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base de datos:</span>
                <span className="font-medium">PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">API:</span>
                <span className="font-medium">Node.js + Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frontend:</span>
                <span className="font-medium">React + Vite</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Jerarquía GPC" />
          <CardBody>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
                <span>Segment (Nivel 1)</span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
                <span>Family (Nivel 2)</span>
              </div>
              <div className="flex items-center gap-2 ml-8">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
                <span>Class (Nivel 3)</span>
              </div>
              <div className="flex items-center gap-2 ml-12">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
                <span>Brick (Nivel 4)</span>
              </div>
              <div className="flex items-center gap-2 ml-16">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
                <span>Attributes (Nivel 5)</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};
