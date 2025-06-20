import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  MapPin,
  Clock,
  Truck,
  Tag,
  CreditCard
} from 'lucide-react'
import { useFoodStore } from '../store/foodStore'
import toast from 'react-hot-toast'

const Cart = () => {
  const navigate = useNavigate()
  const {
    cart,
    cartTotal,
    cartCount,
    deliveryFee,
    updateCartQuantity,
    removeFromCart,
    clearCart
  } = useFoodStore()

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main St, New York, NY')

  const subtotal = cartTotal
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax + deliveryFee - discount

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
      toast.success('Item removed from cart')
    } else {
      updateCartQuantity(itemId, newQuantity)
    }
  }

  const handleApplyPromo = () => {
    const validCodes = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'FIRST15': 15
    }

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setDiscount(validCodes[promoCode as keyof typeof validCodes])
      toast.success(`Promo code applied! $${validCodes[promoCode as keyof typeof validCodes]} off`)
    } else {
      toast.error('Invalid promo code')
    }
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/restaurants" className="btn btn-primary btn-lg">
              Browse Restaurants
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/restaurants"
              className="btn btn-ghost btn-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600">{cartCount} items in your cart</p>
            </div>
          </div>

          <button
            onClick={handleClearCart}
            className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Delivery Address */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Delivery Address</h3>
                      <p className="text-gray-600 text-sm">{deliveryAddress}</p>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Change
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="cart-item"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.foodItem.image}
                        alt={item.foodItem.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.foodItem.name}</h3>
                        <p className="text-gray-600 text-sm">{item.restaurant.name}</p>
                        {item.customizations.length > 0 && (
                          <p className="text-gray-500 text-xs">
                            {item.customizations.join(', ')}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="price-tag">${item.foodItem.price}</span>
                          {item.foodItem.originalPrice && (
                            <span className="original-price">${item.foodItem.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="quantity-controls">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="quantity-btn"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="quantity-btn"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${item.totalPrice.toFixed(2)}</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="input flex-1"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="btn btn-outline btn-md"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                {discount > 0 && (
                  <div className="mt-2 text-green-600 text-sm">
                    Promo code applied! You saved ${discount}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <hr className="my-3" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated delivery: 25-35 min</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span>Free delivery on orders over $25</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="btn btn-primary btn-lg w-full mt-6"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">We accept</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-red-600 rounded text-xs text-white flex items-center justify-center font-bold">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-yellow-500 rounded text-xs text-white flex items-center justify-center font-bold">
                    PP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
