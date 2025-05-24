import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, updateEvent, getAdminEvents } from '../services/adminService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ArrowLeft, Upload, X, Calendar, Clock, MapPin, Users, Tag, Loader2 } from 'lucide-react';
import BackToTop from '../components/BackToTop';

function AdminEventFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: '09:00',
    location: '',
    capacity: '',
    category: '',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  
  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        try {
          setInitialLoading(true);
          const events = await getAdminEvents();
          const event = events.find(e => e.id.toString() === id);
          
          if (!event) {
            navigate('/admin/events');
            return;
          }
          
          setFormData({
            ...event,
            date: new Date(event.date),
          });
          
          if (event.image_url) {
            setImagePreview(event.image_url);
          }
        } catch (err) {
          console.error('Failed to fetch event:', err);
          navigate('/admin/events');
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchEvent();
    }
  }, [id, isEditMode, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
    
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: undefined }));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ 
        ...prev, 
        image: 'Invalid file type. Please upload a JPG, PNG, or GIF image.'
      }));
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ 
        ...prev, 
        image: 'Image size must be less than 2MB.'
      }));
      return;
    }
    
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    if (formData.capacity && (isNaN(formData.capacity) || Number(formData.capacity) < 1)) {
      newErrors.capacity = 'Capacity must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const eventFormData = new FormData();
      eventFormData.append('title', formData.title);
      eventFormData.append('description', formData.description);
      eventFormData.append('date', formData.date.toISOString().split('T')[0]);
      eventFormData.append('time', formData.time);
      eventFormData.append('location', formData.location);
      
      if (formData.capacity) {
        eventFormData.append('capacity', Number(formData.capacity));
      }
      
      if (formData.category) {
        eventFormData.append('category', formData.category);
      }
      
      if (selectedImage) {
        eventFormData.append('image', selectedImage);
      }
      
      if (isEditMode) {
        await updateEvent(id, eventFormData);
      } else {
        await createEvent(eventFormData);
      }
      
      navigate('/admin/events');
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ 
          general: err.response?.data?.message || 'Failed to save event' 
        });
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Events
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">
            {isEditMode ? 'Edit Event' : 'Create New Event'}
          </h1>
          <p className="text-indigo-100">
            {isEditMode ? 'Update event details' : 'Add a new event to the system'}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
                    placeholder="Enter event title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.date ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
                      dateFormat="MMMM d, yyyy"
                      minDate={new Date()}
                    />
                    <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.time ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
                    />
                    {/* <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /> */}
                    {errors.time && (
                      <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location & Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
                      placeholder="e.g., Main Auditorium"
                    />
                    <MapPin className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.capacity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
                      placeholder="Maximum attendees"
                      min="1"
                    />
                    <Users className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    {errors.capacity && (
                      <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category (optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
                    placeholder="e.g., Tech, Workshop, Seminar"
                  />
                  <Tag className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Image (optional)
                </label>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      {imagePreview ? 'Change Image' : 'Upload Image'}
                    </button>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleImageChange}
                    />
                    
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                          fileInputRef.current.value = '';
                        }}
                        className="flex items-center text-red-600 hover:text-red-800"
                      >
                        <X className="w-5 h-5 mr-1" />
                        Remove
                      </button>
                    )}
                  </div>
                  
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                  )}
                  
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Event preview" 
                        className="max-h-64 rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    Recommended size: 1200×600px (JPG/PNG). Max size: 2MB.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
                  placeholder="Provide details about the event..."
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/admin/events')}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : isEditMode ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}

export default AdminEventFormPage;