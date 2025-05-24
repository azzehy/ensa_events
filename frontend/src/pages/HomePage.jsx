import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/eventService';
import { Calendar, MapPin, Users, Filter, Search, Clock, ArrowRight } from 'lucide-react';
import BackToTop from '../components/BackToTop';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const filters = selectedCategory ? { category: selectedCategory } : {};
        const data = await getEvents(filters);
        setEvents(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(event => event.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [selectedCategory]);
  
  // Filter events based on search term
  const filteredEvents = events.filter(event => {
    if (!searchTerm) return true;
    return event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing events...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white bg-opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white bg-opacity-5 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse delay-1000"></div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in">
              Upcoming Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in delay-300">
              Discover and register for upcoming events at ENSA
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto animate-fade-in delay-500">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-lg bg-white/90 shadow-xl transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-20 relative z-10">
          {[
            { label: "Total Events", value: events.length, icon: Calendar, color: "from-blue-500 to-blue-600" },
            { label: "Active Categories", value: categories.length, icon: Filter, color: "from-purple-500 to-purple-600" },
            { label: "Available Now", value: filteredEvents.length, icon: Users, color: "from-green-500 to-green-600" }
          ].map((stat, idx) => (
            <div key={idx} 
                 className={`bg-gradient-to-r ${stat.color} p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 animate-fade-in`}
                 style={{ animationDelay: `${600 + idx * 200}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-white/80" />
              </div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Filter className="w-6 h-6 mr-2 text-indigo-600" />
              Filter by category
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === '' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                All
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500 text-lg">Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, idx) => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  {event.image_url ? (
                    <img 
                      src={event.image_url} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {event.category && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        {event.category}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h2 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {event.title}
                  </h2>
                  
                  {/* Date and Time */}
                  <div className="flex items-center mb-3 text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                    <span className="text-sm font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <Clock className="w-4 h-4 ml-4 mr-2 text-indigo-500" />
                    <span className="text-sm font-medium">{event.time.substring(0, 5)}</span>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center mb-4 text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                    <span className="text-sm font-medium">{event.location}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {event.location}
                    </span>
                    <span className="flex items-center text-indigo-600 font-semibold text-sm group-hover:text-indigo-700 transition-colors">
                      View details
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <BackToTop />
    </div>
  );
}

export default HomePage;