import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, registerForEvent, cancelRegistration } from '../services/eventService';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, MapPin, Users, Loader2, ArrowLeft, LogIn, X } from 'lucide-react';

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await getEvent(id);
        setEvent(data);
      } catch (err) {
        setError('Failed to load event details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);
  
  const handleRegister = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    
    try {
      setRegistering(true);
      await registerForEvent(id);
      setEvent(prev => ({ ...prev, is_registered: true }));
      setRegistrationStatus({ success: true, message: 'Successfully registered for this event!' });
    } catch (err) {
      setRegistrationStatus({ 
        success: false, 
        message: err.response?.data?.message || 'Failed to register for event' 
      });
      console.error(err);
    } finally {
      setRegistering(false);
    }
  };
  
  const handleCancelRegistration = async () => {
    try {
      setRegistering(true);
      await cancelRegistration(id);
      setEvent(prev => ({ ...prev, is_registered: false }));
      setRegistrationStatus({ success: true, message: 'Registration canceled successfully' });
    } catch (err) {
      setRegistrationStatus({ 
        success: false, 
        message: err.response?.data?.message || 'Failed to cancel registration' 
      });
      console.error(err);
    } finally {
      setRegistering(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-xl max-w-md mx-auto">
          {error || 'Event not found'}
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Events
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Event image banner */}
        <div className="h-80 bg-gray-100 relative">
          {event.image_url ? (
            <img 
              src={event.image_url} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
              <Calendar className="w-12 h-12" />
            </div>
          )}
          
          {event.category && (
            <span className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          )}
        </div>
        
        {/* Event details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{event.title}</h1>
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>{event.time.substring(0, 5)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{event.location}</span>
            </div>
            
            {event.capacity && (
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-gray-500" />
                <span>
                  <span className="font-medium">{event.registered_count || 0}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span>{event.capacity}</span>
                </span>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About this event</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {event.description}
            </div>
          </div>
          
          {/* Registration status message */}
          {registrationStatus && (
            <div className={`mb-6 p-4 rounded-lg border ${
              registrationStatus.success 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {registrationStatus.message}
            </div>
          )}
          
          {/* Registration button */}
          {user ? (
            <div className="mt-6">
              {event.is_registered ? (
                <button
                  onClick={handleCancelRegistration}
                  disabled={registering}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {registering ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                  Cancel Registration
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering || (event.capacity && event.registered_count >= event.capacity)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {registering ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    (event.capacity && event.registered_count >= event.capacity) 
                      ? 'Event Full' 
                      : 'Register for this Event'
                  )}
                </button>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <button
                onClick={() => navigate('/login', { state: { from: `/events/${id}` } })}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Sign in to Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;