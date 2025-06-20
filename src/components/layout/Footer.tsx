import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍕</span>
              <span className="text-xl font-bold">FoodExpress</span>
            </div>
            <p className="text-gray-400">
              Fast, reliable food delivery from your favorite restaurants.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/restaurants" className="hover:text-white">Restaurants</Link></li>
              <li><Link to="/orders" className="hover:text-white">Orders</Link></li>
              <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Download App</h3>
            <div className="space-y-2">
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                📱 iOS App
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                🤖 Android App
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FoodExpress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
