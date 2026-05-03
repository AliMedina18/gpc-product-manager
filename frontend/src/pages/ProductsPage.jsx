import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Button } from '../components/Button';
import { ProductTable } from '../components/ProductTable';
import { Modal } from '../components/Modal';
import { Alert } from '../components/Alert';
import { Spinner } from '../components/Spinner';
import { productService } from '../services/productService';

export const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await productService.delete(deleteModal.productId);
      setSuccessMessage('Producto eliminado correctamente');
      setDeleteModal({ open: false, productId: null });
      loadProducts();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 mt-2">Gestiona tu catálogo de productos</p>
        </div>
        <Button onClick={() => navigate('/products/create')}>
          ➕ Crear Producto
        </Button>
      </div>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      <Card>
        <CardHeader title="Listado de Productos" />
        <CardBody>
          <ProductTable
            products={products}
            onEdit={(product) => navigate(`/products/edit/${product.id}`)}
            onDelete={(id) => setDeleteModal({ open: true, productId: id })}
            isLoading={loading}
          />
        </CardBody>
      </Card>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, productId: null })}
        title="Confirmar eliminación"
        size="sm"
      >
        <p className="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar este producto?</p>
        <div className="flex gap-3">
          <Button
            variant="danger"
            onClick={handleDelete}
            className="flex-1"
          >
            Eliminar
          </Button>
          <Button
            variant="secondary"
            onClick={() => setDeleteModal({ open: false, productId: null })}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </Layout>
  );
};
