import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Star,
  Clock,
  Truck,
  MapPin,
  SlidersHorizontal
} from 'lucide-react'
import { useFoodStore } from '../store/foodStore'

const Restaurants = () => {
  const { restaurants, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useFoodStore()
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50])

  const categories = ['All', 'Pizza', 'Burgers', 'Sushi', 'Indian', 'Chinese', 'Italian', 'Mexican']
  const sortOptions = [
    { value: 'rating', label: 'Rating' },
    { value: 'delivery_time', label: 'Delivery Time' },
    { value: 'delivery_fee', label: 'Delivery Fee' },
    { value: 'distance', label: 'Distance' }
  ]

  const filteredRestaurants = restaurants
    .filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(restaurant =>
      selectedCategory === 'All' || selectedCategory === '' ||
      restaurant.cuisine.includes(selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'delivery_time':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
        case 'delivery_fee':
          return a.deliveryFee - b.deliveryFee
        case 'distance':
          return a.distance - b.distance
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Restaurants Near You</h1>
          <p className="text-gray-600">Discover amazing food from local restaurants</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-full lg:w-48"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline btn-md flex items-center space-x-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                className={`category-chip ${
                  (selectedCategory === category) || (selectedCategory === '' && category === 'All')
                    ? 'active'
                    : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">$0</span>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Fee
                  </label>
                  <select className="input w-full">
                    <option>Any</option>
                    <option>Free Delivery</option>
                    <option>Under $3</option>
                    <option>Under $5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select className="input w-full">
                    <option>Any Rating</option>
                    <option>4.5+ Stars</option>
                    <option>4.0+ Stars</option>
                    <option>3.5+ Stars</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredRestaurants.length} restaurants found
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid-restaurants">
          {filteredRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover food-image"
                  />
                  <div className="restaurant-image-overlay" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${restaurant.isOpen ? 'badge-success' : 'badge-error'}`}>
                      {restaurant.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>

                  {/* Offers */}
                  {restaurant.offers.length > 0 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-primary-600 text-white text-sm px-3 py-1 rounded-lg truncate">
                        {restaurant.offers[0]}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {restaurant.description}
                  </p>

                  <div className="delivery-info mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="h-4 w-4" />
                      <span>${restaurant.deliveryFee}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{restaurant.distance} km</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {restaurant.cuisine.slice(0, 3).map((cuisine) => (
                      <span
                        key={cuisine}
                        className="badge badge-primary text-xs"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find more restaurants.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Restaurants
