import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin,
  CreditCard,
  Clock,
  Truck,
  ArrowLeft,
  Plus,
  Check,
  Edit
} from 'lucide-react'
import { useFoodStore } from '../store/foodStore'
import toast from 'react-hot-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, cartTotal, deliveryFee, placeOrder, clearCart } = useFoodStore()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    instructions: ''
  })

  const subtotal = cartTotal
  const tax = subtotal * 0.08
  const total = subtotal + tax + deliveryFee

  const handlePlaceOrder = () => {
    const orderId = placeOrder(`${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}`)
    toast.success('Order placed successfully!')
    navigate(`/orders`)
  }

  if (cart.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="btn btn-ghost btn-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Address */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.street}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                      className="input w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.state}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                        className="input w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.zipCode}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, zipCode: e.target.value})}
                      className="input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      value={deliveryAddress.instructions}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, instructions: e.target.value})}
                      placeholder="e.g., Leave at door, Ring doorbell, etc."
                      className="input w-full h-20 resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="btn btn-primary btn-lg w-full mt-6"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

                <div className="space-y-4">
                  {/* Credit Card */}
                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`} onClick={() => setPaymentMethod('card')}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-primary-600"
                      />
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                  </div>

                  {/* PayPal */}
                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'paypal' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`} onClick={() => setPaymentMethod('paypal')}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="text-primary-600"
                      />
                      <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <span className="font-medium">PayPal</span>
                    </div>
                  </div>

                  {/* Cash on Delivery */}
                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'cash' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`} onClick={() => setPaymentMethod('cash')}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                        className="text-primary-600"
                      />
                      <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">$</span>
                      </div>
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="input w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="input w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="btn btn-outline btn-lg flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn btn-primary btn-lg flex-1"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                      <img
                        src={item.foodItem.image}
                        alt={item.foodItem.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.foodItem.name}</h4>
                        <p className="text-gray-600 text-sm">{item.restaurant.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.quantity}x ${item.foodItem.price}</p>
                        <p className="text-sm text-gray-600">${item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Delivery Address</h4>
                    <button
                      onClick={() => setStep(1)}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      <Edit className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {deliveryAddress.street}, {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
                  </p>
                  {deliveryAddress.instructions && (
                    <p className="text-gray-500 text-xs mt-1">
                      Instructions: {deliveryAddress.instructions}
                    </p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="btn btn-outline btn-lg flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn btn-primary btn-lg flex-1"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 text-sm mb-4">
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
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated delivery: 25-35 min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Standard delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Delivering to {deliveryAddress.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
