import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserEvents, cancelRegistration } from '../services/eventService';
import { useAuth } from '../contexts/AuthContext';
import { Edit2, X, Calendar, Clock, MapPin, User, Mail, Loader2, ArrowRight } from 'lucide-react';
import BackToTop from '../components/BackToTop';

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [updateMessage, setUpdateMessage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        setLoading(true);
        const data = await getUserEvents();
        setRegistrations(data);
      } catch (err) {
        setError('Failed to load your events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserEvents();
  }, []);
  
  const handleCancelRegistration = async (eventId) => {
    if (!confirm('Are you sure you want to cancel your registration for this event?')) {
      return;
    }
    
    try {
      await cancelRegistration(eventId);
      setRegistrations(prev => prev.filter(reg => reg.event_id !== eventId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel registration');
      console.error(err);
    }
  };
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setUpdateMessage({
        type: 'error',
        text: 'Name cannot be empty'
      });
      return;
    }
    
    try {
      setUpdateLoading(true);
      await updateProfile({ name });
      setIsEditing(false);
      setUpdateMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
      
      setTimeout(() => {
        setUpdateMessage(null);
      }, 3000);
    } catch (err) {
      setUpdateMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile'
      });
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-xl max-w-md mx-auto">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-indigo-100">Manage your profile and event registrations</p>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
          
          {updateMessage && (
            <div className={`mb-6 p-4 rounded-lg border ${
              updateMessage.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {updateMessage.text}
            </div>
          )}
          
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  disabled={updateLoading}
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : 'Save Changes'}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setName(user.name);
                    setUpdateMessage(null);
                  }}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={updateLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <span className="font-medium text-gray-700">Name:</span> {user.name}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <span className="font-medium text-gray-700">Email:</span> {user.email}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-gray-500">👤</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Account Type:</span> {user.role === 'admin' ? 'Administrator' : 'Student'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Registered Events Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold">My Registered Events</h2>
          <p className="text-indigo-100">Manage your upcoming event registrations</p>
        </div>

        <div className="p-6">
          {registrations.length === 0 ? (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No registered events</h3>
              <p className="text-gray-500 mb-6">You haven't registered for any events yet</p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-colors"
              >
                Browse Events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.map(registration => (
                <div key={registration.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-gray-800">{registration.event.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(registration.event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {registration.event.time.substring(0, 5)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {registration.event.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/events/${registration.event_id}`}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </Link>
                      
                      <button
                        onClick={() => handleCancelRegistration(registration.event_id)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BackToTop />
    </div>
  );
}

export default ProfilePage;