import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminEvents, deleteEvent } from '../services/adminService';
import { Edit2, Trash2, Plus, Calendar, Clock, MapPin, Users, Loader2, ArrowLeft } from 'lucide-react';
import BackToTop from '../components/BackToTop';

function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getAdminEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteEvent = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      setDeleteInProgress(true);
      await deleteEvent(id);
      setEvents(events.filter(event => event.id !== id));
      setSuccessMessage(`Event "${title}" has been deleted successfully.`);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event');
      console.error(err);
    } finally {
      setDeleteInProgress(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <p className="text-indigo-100">Create, edit, and delete events</p>
        </div>

        <div className="p-6">
         {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              {successMessage}
            </div>
          )}

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-medium text-gray-700">
              {events.length} {events.length === 1 ? 'Event' : 'Events'}
            </h2>
            
            <Link 
              to="/admin/events/new" 
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Event
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first event</p>
              <Link 
                to="/admin/events/new" 
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Event
              </Link>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map(event => (
                    <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          {event.image_url ? (
                            <img 
                              src={event.image_url} 
                              alt={event.title} 
                              className="w-14 h-14 rounded-lg object-cover mr-4"
                            />
                          ) : (
                            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                              <Calendar className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{event.title}</div>
                            <div className="text-sm text-gray-500 mt-1 flex items-center">
                              <MapPin className="w-4 h-4 mr-1.5" />
                              {event.location}
                            </div>
                            {event.category && (
                              <span className="inline-block mt-2 text-xs px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                                {event.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-500 mr-2" />
                            {event.time.substring(0, 5)}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium">{event.registrations_count || 0}</span>
                          {event.capacity && (
                            <span className="text-gray-400 mx-1">/</span>
                          )}
                          {event.capacity && (
                            <span>{event.capacity}</span>
                          )}
                          <span className="ml-1">attendees</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/admin/events/edit/${event.id}`}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDeleteEvent(event.id, event.title)}
                            disabled={deleteInProgress}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {deleteInProgress ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <BackToTop />
    </div>
  );

}

export default AdminEventsPage;