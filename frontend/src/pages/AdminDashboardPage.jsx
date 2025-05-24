
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminEvents } from '../services/adminService';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus, 
  Settings, 
  Eye, 
  Edit3, 
  MapPin, 
  Clock,
  BarChart3,
  Activity,
  ChevronRight
} from 'lucide-react';
import BackToTop from '../components/BackToTop';

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAdminEvents();
        setEvents(data);
        
        // Calculate stats
        const now = new Date();
        const upcomingEvents = data.filter(event => new Date(event.date) >= now).length;
        const totalRegistrations = data.reduce((sum, event) => sum + event.registrations_count, 0);
        
        setStats({
          totalEvents: data.length,
          upcomingEvents,
          totalRegistrations
        });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Dashboard Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }
  
  // Get the next 5 upcoming events
  const now = new Date();
  const upcomingEvents = [...events]
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white bg-opacity-5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white bg-opacity-5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">
                Admin Dashboard
              </h1>
              <p className="text-xl text-blue-100 animate-fade-in delay-300">
                Manage your ENSA events system
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -mt-16 relative z-10">
          {[
            { 
              label: "Total Events", 
              value: stats.totalEvents, 
              icon: Calendar, 
              color: "from-blue-500 to-blue-600"
            },
            { 
              label: "Upcoming Events", 
              value: stats.upcomingEvents, 
              icon: Clock, 
              color: "from-emerald-500 to-emerald-600"
            },
            { 
              label: "Total Registrations", 
              value: stats.totalRegistrations, 
              icon: Users, 
              color: "from-purple-500 to-purple-600"
            }
          ].map((stat, idx) => (
            <div key={idx} 
                 className={`bg-gradient-to-r ${stat.color} p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 animate-fade-in`}
                 style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-white/80" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in delay-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-indigo-600" />
                Quick Actions
              </h2>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/admin/events/new" 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Event
                </Link>
                
                <Link 
                  to="/admin/events" 
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Manage All Events
                </Link>
              </div>
            </div>

            {/* Upcoming Events Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in delay-600">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-indigo-600" />
                    Upcoming Events
                  </h2>
                  <Link to="/admin/events" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center hover:underline">
                    View all
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No upcoming events scheduled.</h3>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Event</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Registrations</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {upcomingEvents.map((event, idx) => (
                        <tr key={event.id} 
                            className="hover:bg-gray-50 transition-colors duration-200"
                            style={{ animationDelay: `${700 + idx * 100}ms` }}>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{event.title}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                              {event.location}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2 text-indigo-500" />
                              <span className="font-semibold text-gray-900">
                                {event.registrations_count || 0}
                              </span>
                              {event.capacity && (
                                <span className="text-gray-500 ml-1">
                                  / {event.capacity}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-3">
                              <Link 
                                to={`/admin/events/edit/${event.id}`}
                                className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center hover:underline"
                              >
                                <Edit3 className="w-4 h-4 mr-1" />
                                Edit
                              </Link>
                              <Link 
                                to={`/events/${event.id}`}
                                className="text-gray-600 hover:text-gray-700 font-semibold flex items-center hover:underline"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Link>
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

          {/* Right Column - Additional Stats */}
          <div className="space-y-6">
            {/* Performance Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in delay-800">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Events</span>
                  <span className="font-bold text-gray-900">{stats.upcomingEvents}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Events</span>
                  <span className="font-bold text-gray-900">{stats.totalEvents}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Registrations</span>
                  <span className="font-bold text-gray-900">{stats.totalRegistrations}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-gray-600">Avg. per Event</span>
                  <span className="font-bold text-indigo-600">
                    {stats.totalEvents > 0 ? Math.round(stats.totalRegistrations / stats.totalEvents) : 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in delay-1000">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">System Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Database</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-sm text-gray-500">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>)
}
export default DashboardPage;