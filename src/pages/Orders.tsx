import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  MapPin,
  Phone,
  Star,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { useFoodStore } from '../store/foodStore'
import { format } from 'date-fns'

const Orders = () => {
  const { orders } = useFoodStore()
  const [filter, setFilter] = useState('all')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'placed':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'preparing':
        return <Package className="h-5 w-5 text-orange-500" />
      case 'out_for_delivery':
        return <Truck className="h-5 w-5 text-purple-500" />
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'placed':
        return 'Order Placed'
      case 'confirmed':
        return 'Confirmed'
      case 'preparing':
        return 'Preparing'
      case 'out_for_delivery':
        return 'Out for Delivery'
      case 'delivered':
        return 'Delivered'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-100 text-blue-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'preparing':
        return 'bg-orange-100 text-orange-800'
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'placed', label: 'Placed' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' }
  ]

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title">Your Orders</h1>
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">
              When you place your first order, it will appear here.
            </p>
            <a href="/restaurants" className="btn btn-primary btn-lg">
              Start Ordering
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Your Orders</h1>
          <p className="text-gray-600">Track your current and past orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === option.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {format(new Date(order.orderTime), 'MMM dd, yyyy • h:mm a')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={order.restaurant.image}
                      alt={order.restaurant.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{order.restaurant.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{order.restaurant.distance} km away</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{order.restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{order.items.length} items</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200">
                <h5 className="font-medium text-gray-900 mb-3">Order Items</h5>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.foodItem.image}
                        alt={item.foodItem.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{item.foodItem.name}</p>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">${item.totalPrice.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Status & Actions */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Delivering to:</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{order.deliveryAddress}</p>
                    {order.status !== 'delivered' && (
                      <p className="text-sm text-gray-600 mt-1">
                        Estimated delivery: {format(new Date(order.estimatedDelivery), 'h:mm a')}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    {order.status === 'out_for_delivery' && (
                      <button className="btn btn-outline btn-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Driver
                      </button>
                    )}

                    {order.status !== 'delivered' && (
                      <button className="btn btn-primary btn-sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Track Order
                      </button>
                    )}

                    {order.status === 'delivered' && (
                      <button className="btn btn-outline btn-sm">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Progress */}
                {order.status !== 'delivered' && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className={order.status === 'placed' ? 'text-primary-600 font-medium' : 'text-gray-600'}>
                        Order Placed
                      </span>
                      <span className={['confirmed', 'preparing', 'out_for_delivery'].includes(order.status) ? 'text-primary-600 font-medium' : 'text-gray-600'}>
                        Preparing
                      </span>
                      <span className={order.status === 'out_for_delivery' ? 'text-primary-600 font-medium' : 'text-gray-600'}>
                        Out for Delivery
                      </span>
                      <span className={order.status === 'delivered' ? 'text-primary-600 font-medium' : 'text-gray-600'}>
                        Delivered
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: order.status === 'placed' ? '25%' :
                                 order.status === 'confirmed' ? '50%' :
                                 order.status === 'preparing' ? '50%' :
                                 order.status === 'out_for_delivery' ? '75%' :
                                 order.status === 'delivered' ? '100%' : '0%'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredOrders.length === 0 && filter !== 'all' && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-4">
              You don't have any orders with the selected status.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="btn btn-outline"
            >
              View All Orders
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
