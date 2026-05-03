import { Button } from './Button';
import { Badge } from './Badge';

export const ProductTable = ({ products, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Brick</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{product.descripcion || '-'}</td>
              <td className="px-6 py-4 text-sm text-gray-600">${parseFloat(product.precio).toFixed(2)}</td>
              <td className="px-6 py-4 text-sm">
                <Badge variant="primary">{product.brick?.nombre || '-'}</Badge>
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                <Button size="sm" variant="secondary" onClick={() => onEdit?.(product)}>
                  Editar
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete?.(product.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
