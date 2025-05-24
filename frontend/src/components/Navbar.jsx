import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, CalendarDays, User, LogOut, LogIn, UserPlus, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();


  useEffect(() => {
    setIsOpen(false); // Close mobile menu on route change
  }, [location]);

  return (
    <header 
    //className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-0 bg-white shadow-lg' : 'py-2 bg-gradient-to-r from-indigo-600 to-purple-600'}`}
    className={`sticky top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-0 bg-white shadow-lg' : 'py-2 bg-gradient-to-r from-indigo-600 to-purple-600'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${scrolled ? 'bg-indigo-600' : 'bg-white'}`}>
              <CalendarDays className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-indigo-600'}`} />
            </div>
            <span className={`text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              ENSA Events
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-2 rounded-lg transition-all ${scrolled ? 'hover:bg-indigo-50 text-gray-700' : 'hover:bg-white/10 text-white'}`}
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className={`flex items-center px-3 py-2 rounded-lg transition-all ${scrolled ? 'hover:bg-indigo-50 text-gray-700' : 'hover:bg-white/10 text-white'}`}
                >
                  <User className="w-5 h-5 mr-2" />
                  My Events
                </Link>
                
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className={`flex items-center px-3 py-2 rounded-lg transition-all ${scrolled ? 'hover:bg-indigo-50 text-gray-700' : 'hover:bg-white/10 text-white'}`}
                  >
                    Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={logout}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${scrolled ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 hover:bg-gray-100'}`}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`flex items-center px-3 py-2 rounded-lg transition-all ${scrolled ? 'hover:bg-indigo-50 text-gray-700' : 'hover:bg-white/10 text-white'}`}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${scrolled ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 hover:bg-gray-100'}`}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <Link 
              to="/" 
              className="flex items-center px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-5 h-5 mr-3" />
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5 mr-3" />
                  My Events
                </Link>
                
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className="flex items-center px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 rounded-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center px-4 py-3 rounded-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="w-5 h-5 mr-3" />
                  Register
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;