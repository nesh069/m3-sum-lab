import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * Layout component wraps all pages with consistent navigation structure.
 * Outlet renders the matched child route component.
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;