import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  MapPin,
  Clock,
  ChevronDown
} from 'lucide-react'
import { useFoodStore } from '../../store/foodStore'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const {
    cartCount,
    currentLocation,
    setSearchQuery: setStoreSearchQuery
  } = useFoodStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setStoreSearchQuery(searchQuery)
      navigate('/search')
    }
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍕</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FoodExpress</span>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer">
            <MapPin className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">{currentLocation}</p>
              <p className="text-xs text-gray-500">Change location</p>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for restaurants, food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/restaurants"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Restaurants
            </Link>
            
            <Link
              to="/orders"
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Clock className="h-5 w-5" />
              <span>Orders</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <span className="font-medium">Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for restaurants, food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Location - Mobile */}
              <div className="flex items-center space-x-2 text-gray-600 p-2">
                <MapPin className="h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">{currentLocation}</p>
                  <p className="text-xs text-gray-500">Change location</p>
                </div>
              </div>
              
              <Link
                to="/restaurants"
                className="block text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Restaurants
              </Link>
              
              <Link
                to="/orders"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Clock className="h-5 w-5" />
                <span>Orders</span>
              </Link>
              
              <Link
                to="/cart"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cartCount})</span>
              </Link>
              
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
