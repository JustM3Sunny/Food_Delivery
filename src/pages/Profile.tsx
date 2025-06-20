import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  Bell,
  Edit,
  Plus,
  Trash2,
  Star,
  Clock,
  Phone,
  Mail,
  Camera,
  Save
} from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  })

  const [addresses] = useState([
    {
      id: '1',
      label: 'Home',
      address: '123 Main Street, New York, NY 10001',
      isDefault: true
    },
    {
      id: '2',
      label: 'Work',
      address: '456 Business Ave, New York, NY 10002',
      isDefault: false
    }
  ])

  const [paymentMethods] = useState([
    {
      id: '1',
      type: 'card',
      label: 'Visa ending in 4242',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      label: 'PayPal Account',
      isDefault: false
    }
  ])

  const [favoriteRestaurants] = useState([
    {
      id: '1',
      name: 'Pizza Palace',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150',
      rating: 4.5,
      cuisine: 'Italian'
    },
    {
      id: '2',
      name: 'Burger Junction',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=150',
      rating: 4.3,
      cuisine: 'American'
    }
  ])

  const [recentOrders] = useState([
    {
      id: '1',
      restaurant: 'Pizza Palace',
      items: 'Margherita Pizza, Garlic Bread',
      total: 24.98,
      date: '2024-01-15',
      status: 'delivered'
    },
    {
      id: '2',
      restaurant: 'Burger Junction',
      items: 'Classic Cheeseburger, Fries',
      total: 15.99,
      date: '2024-01-12',
      status: 'delivered'
    }
  ])

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'payments', name: 'Payment Methods', icon: CreditCard },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'orders', name: 'Order History', icon: Clock },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 hover:bg-primary-700">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-gray-600">{profile.phone}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-outline btn-md"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className={`h-5 w-5 ${
                      activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'
                    }`} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>

                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="input w-full"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={handleSaveProfile}
                          className="btn btn-primary btn-md"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="font-medium text-gray-900">{profile.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium text-gray-900">{profile.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium text-gray-900">{profile.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Delivery Addresses</h2>
                    <button className="btn btn-primary btn-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </button>
                  </div>

                  <div className="space-y-4">
                    {addresses.map(address => (
                      <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900">{address.label}</h3>
                              {address.isDefault && (
                                <span className="badge badge-primary text-xs">Default</span>
                              )}
                            </div>
                            <p className="text-gray-600 mt-1">{address.address}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="btn btn-ghost btn-sm">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="btn btn-ghost btn-sm text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                    <button className="btn btn-primary btn-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-6 w-6 text-gray-400" />
                            <div>
                              <h3 className="font-medium text-gray-900">{method.label}</h3>
                              {method.isDefault && (
                                <span className="badge badge-primary text-xs">Default</span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="btn btn-ghost btn-sm">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="btn btn-ghost btn-sm text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Favorite Restaurants</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteRestaurants.map(restaurant => (
                      <div key={restaurant.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
                            <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{restaurant.rating}</span>
                            </div>
                          </div>
                          <button className="btn btn-ghost btn-sm text-red-600">
                            <Heart className="h-4 w-4 fill-current" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Order History</h2>

                  <div className="space-y-4">
                    {recentOrders.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{order.restaurant}</h3>
                            <p className="text-gray-600 text-sm">{order.items}</p>
                            <p className="text-gray-500 text-xs mt-1">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">${order.total}</p>
                            <span className="badge badge-success text-xs">{order.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Push Notifications</h3>
                        <p className="text-gray-600 text-sm">Get notified about order updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-gray-600 text-sm">Receive promotional emails</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
