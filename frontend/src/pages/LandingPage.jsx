import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg" />
            <span className="text-xl font-semibold text-gray-900">GPC Manager</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Gestión de Productos con <span className="text-primary-600">GPC</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Sistema completo para clasificar y gestionar tu catálogo de productos usando el estándar GPC (Global Product Classification)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">
                Comenzar gratis →
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Ver documentación
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué GPC Manager?</h2>
          <p className="text-gray-600">Todas las herramientas que necesitas en una plataforma</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🏗️',
              title: 'Jerarquía GPC Completa',
              desc: 'Navega por 5 niveles: Segment, Family, Class, Brick y Attributes'
            },
            {
              icon: '📦',
              title: 'Gestión de Productos',
              desc: 'CRUD completo: crear, editar, eliminar y listar productos'
            },
            {
              icon: '🔐',
              title: 'Seguridad JWT',
              desc: 'Autenticación segura con tokens JWT'
            },
            {
              icon: '⚡',
              title: 'Ultra Rápido',
              desc: 'Construido con React, Vite y Tailwind CSS'
            },
            {
              icon: '📊',
              title: 'Dashboard',
              desc: 'Estadísticas en tiempo real de tu catálogo'
            },
            {
              icon: '🌐',
              title: 'API REST',
              desc: 'API completa y documentada para integraciones'
            },
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-primary-100 mb-8">Crea tu cuenta gratis y gestiona tus productos con GPC</p>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Crear cuenta →
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2026 GPC Product Manager. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
