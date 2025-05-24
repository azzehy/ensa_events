import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminEventFormPage from './pages/AdminEventFormPage';

// Protected route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected student routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              {/* Protected admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboardPage />
                // </ProtectedRoute>
              } />
              <Route path="/admin/events" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminEventsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/events/new" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminEventFormPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/events/edit/:id" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminEventFormPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="bg-gray-100 py-4 text-center">
            <p>© {new Date().getFullYear()} ENSA Events System</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;