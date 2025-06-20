import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Star, 
  Truck, 
  Shield,
  ArrowRight,
  MapPin,
  Search,
  ChefHat,
  Zap
} from 'lucide-react'
import { useFoodStore } from '../store/foodStore'

const Home = () => {
  const { restaurants, currentLocation } = useFoodStore()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    { name: 'All', icon: '🍽️' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Sushi', icon: '🍣' },
    { name: 'Indian', icon: '🍛' },
    { name: 'Chinese', icon: '🥡' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'Healthy', icon: '🥗' },
  ]

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get your food delivered in 30 minutes or less'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Contactless delivery and secure payments'
    },
    {
      icon: ChefHat,
      title: 'Quality Food',
      description: 'Partner with the best restaurants in your area'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery on orders above $25'
    }
  ]

  const topRestaurants = restaurants.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-800/20" />
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200" 
            alt="Food background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hero-content">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Delicious Food
              <br />
              <span className="text-yellow-300">Delivered Fast</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto"
            >
              Order from your favorite restaurants and get fresh, hot food delivered to your doorstep in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-2xl mx-auto"
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex-1 w-full sm:w-auto">
                <MapPin className="h-5 w-5" />
                <span>{currentLocation}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex-1 w-full sm:w-auto">
                <Search className="h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Search for restaurants..."
                  className="bg-transparent placeholder-white/70 outline-none flex-1"
                />
              </div>
              
              <Link
                to="/restaurants"
                className="btn btn-primary btn-lg whitespace-nowrap"
              >
                Find Food
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose FoodExpress?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make food delivery simple, fast, and reliable with our premium service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Browse by Category</h2>
            <p className="text-lg text-gray-600">
              Discover food from all your favorite categories
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`category-chip ${
                  selectedCategory === category.name ? 'active' : ''
                }`}
              >
                <span className="text-lg mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/restaurants"
              className="btn btn-primary btn-lg"
            >
              View All Categories
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Restaurants */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="section-title">Top Restaurants Near You</h2>
              <p className="text-lg text-gray-600">
                Popular restaurants in {currentLocation}
              </p>
            </div>
            <Link
              to="/restaurants"
              className="btn btn-outline btn-md hidden sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          <div className="grid-restaurants">
            {topRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-success">
                        {restaurant.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
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
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Truck className="h-4 w-4" />
                        <span>${restaurant.deliveryFee}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
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

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/restaurants"
              className="btn btn-outline btn-md"
            >
              View All Restaurants
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied customers who trust FoodExpress for their food delivery needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/restaurants"
              className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg"
            >
              Order Now
            </Link>
            <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 btn-lg">
              Download App
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
