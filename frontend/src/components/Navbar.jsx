import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from './Button';

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:text-primary-600';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg" />
          <span className="text-xl font-semibold text-gray-900">GPC Manager</span>
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-8">
            <div className="flex gap-8">
              <Link to="/dashboard" className={`text-sm font-medium ${isActive('/dashboard')} pb-1 transition-colors`}>
                Dashboard
              </Link>
              <Link to="/products" className={`text-sm font-medium ${isActive('/products')} pb-1 transition-colors`}>
                Productos
              </Link>
              <Link to="/explorer" className={`text-sm font-medium ${isActive('/explorer')} pb-1 transition-colors`}>
                Explorador GPC
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
