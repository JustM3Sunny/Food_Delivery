import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import { useFoodStore } from '../../store/foodStore'
import { motion, AnimatePresence } from 'framer-motion'

const FloatingCart = () => {
  const { cartCount, cartTotal } = useFoodStore()

  if (cartCount === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="floating-cart"
      >
        <Link
          to="/cart"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-white text-primary-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </div>
          <div>
            <p className="font-semibold">${cartTotal.toFixed(2)}</p>
            <p className="text-xs opacity-90">View Cart</p>
          </div>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

export default FloatingCart
