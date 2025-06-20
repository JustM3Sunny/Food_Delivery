import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Star,
  Clock,
  Truck,
  MapPin,
  Phone,
  Heart,
  Share2,
  Plus,
  Minus,
  ArrowLeft,
  Search,
  Filter
} from 'lucide-react'
import { useFoodStore } from '../store/foodStore'
import toast from 'react-hot-toast'

const RestaurantDetail = () => {
  const { id } = useParams()
  const { restaurants, addToCart } = useFoodStore()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [quantities, setQuantities] = useState<{[key: string]: number}>({})

  const restaurant = restaurants.find(r => r.id === id)

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant Not Found</h2>
          <Link to="/restaurants" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Restaurants
          </Link>
        </div>
      </div>
    )
  }

  const categories = ['All', ...Array.from(new Set(restaurant.menu.map(item => item.category)))]

  const filteredMenu = restaurant.menu.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }))
  }

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1
    addToCart(item, restaurant, quantity)
    toast.success(`${item.name} added to cart!`)
    setQuantities(prev => ({ ...prev, [item.id]: 0 }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Back Button */}
        <Link
          to="/restaurants"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-900" />
        </Link>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
            <Heart className="h-5 w-5 text-gray-900" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
            <Share2 className="h-5 w-5 text-gray-900" />
          </button>
        </div>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg opacity-90 mb-4">{restaurant.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{restaurant.rating}</span>
              <span className="opacity-75">({restaurant.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Truck className="h-4 w-4" />
              <span>${restaurant.deliveryFee} delivery</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.distance} km away</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Restaurant Status */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`badge ${restaurant.isOpen ? 'badge-success' : 'badge-error'}`}>
                    {restaurant.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                  <span className="text-sm text-gray-600">
                    Min order: ${restaurant.minOrder}
                  </span>
                </div>
                <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                  <Phone className="h-4 w-4" />
                  <span>Call Restaurant</span>
                </button>
              </div>

              {/* Offers */}
              {restaurant.offers.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Special Offers</h3>
                  <div className="space-y-2">
                    {restaurant.offers.map((offer, index) => (
                      <div key={index} className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                        <p className="text-primary-800 text-sm">{offer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menu Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 w-full"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              {categories.filter(cat => cat !== 'All').map(category => {
                const categoryItems = filteredMenu.filter(item => item.category === category)
                if (categoryItems.length === 0) return null

                return (
                  <div key={category} className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{category}</h2>
                    <div className="grid-food-items">
                      {categoryItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="food-item-card"
                        >
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <div className="flex items-center space-x-1">
                                  {item.isVeg ? (
                                    <div className="w-4 h-4 border-2 border-green-500 rounded-sm flex items-center justify-center">
                                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center">
                                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium">{item.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{item.preparationTime} min</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="price-tag">${item.price}</span>
                                  {item.originalPrice && (
                                    <span className="original-price">${item.originalPrice}</span>
                                  )}
                                </div>

                                {item.isAvailable ? (
                                  <div className="flex items-center space-x-2">
                                    {quantities[item.id] > 0 ? (
                                      <div className="quantity-controls">
                                        <button
                                          onClick={() => updateQuantity(item.id, -1)}
                                          className="quantity-btn"
                                        >
                                          <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                                          {quantities[item.id]}
                                        </span>
                                        <button
                                          onClick={() => updateQuantity(item.id, 1)}
                                          className="quantity-btn"
                                        >
                                          <Plus className="h-4 w-4" />
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="btn btn-outline btn-sm"
                                      >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add
                                      </button>
                                    )}

                                    {quantities[item.id] > 0 && (
                                      <button
                                        onClick={() => handleAddToCart(item)}
                                        className="btn btn-primary btn-sm"
                                      >
                                        Add to Cart
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-red-500 text-sm font-medium">Not Available</span>
                                )}
                              </div>
                            </div>

                            <div className="w-24 h-24 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Restaurant Info Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Restaurant Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuisine</span>
                    <span className="font-medium">{restaurant.cuisine.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time</span>
                    <span className="font-medium">{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">${restaurant.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Order</span>
                    <span className="font-medium">${restaurant.minOrder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance</span>
                    <span className="font-medium">{restaurant.distance} km</span>
                  </div>
                </div>
              </div>

              {/* Popular Items */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Popular Items</h3>
                <div className="space-y-3">
                  {restaurant.menu.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-primary-600 font-semibold text-sm">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetail
