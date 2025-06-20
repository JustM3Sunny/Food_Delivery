import { create } from 'zustand'

export interface FoodItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isVeg: boolean
  rating: number
  preparationTime: number
  isAvailable: boolean
  customizations?: string[]
}

export interface Restaurant {
  id: string
  name: string
  description: string
  image: string
  coverImage: string
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  minOrder: number
  cuisine: string[]
  isOpen: boolean
  distance: number
  offers: string[]
  menu: FoodItem[]
}

export interface CartItem {
  id: string
  foodItem: FoodItem
  restaurant: Restaurant
  quantity: number
  customizations: string[]
  totalPrice: number
}

export interface Order {
  id: string
  restaurant: Restaurant
  items: CartItem[]
  totalAmount: number
  deliveryAddress: string
  status: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered'
  orderTime: string
  estimatedDelivery: string
}

interface FoodStoreState {
  // Data
  restaurants: Restaurant[]
  cart: CartItem[]
  orders: Order[]
  currentLocation: string
  
  // UI State
  isLoading: boolean
  searchQuery: string
  selectedCategory: string
  sortBy: string
  
  // Cart state
  cartTotal: number
  cartCount: number
  deliveryFee: number
  
  // Actions
  setRestaurants: (restaurants: Restaurant[]) => void
  addToCart: (foodItem: FoodItem, restaurant: Restaurant, quantity?: number, customizations?: string[]) => void
  removeFromCart: (itemId: string) => void
  updateCartQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  
  // Search & Filter
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setSortBy: (sortBy: string) => void
  
  // Orders
  placeOrder: (deliveryAddress: string) => string
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  
  // Location
  setCurrentLocation: (location: string) => void
  
  // UI
  setIsLoading: (loading: boolean) => void
}

// Mock data
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    description: 'Authentic Italian pizzas with fresh ingredients',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    rating: 4.5,
    reviewCount: 1250,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minOrder: 15,
    cuisine: ['Italian', 'Pizza', 'Fast Food'],
    isOpen: true,
    distance: 1.2,
    offers: ['20% off on orders above $30', 'Free delivery on first order'],
    menu: [
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 12.99,
        originalPrice: 15.99,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
        category: 'Pizza',
        isVeg: true,
        rating: 4.6,
        preparationTime: 20,
        isAvailable: true,
      },
      {
        id: '2',
        name: 'Pepperoni Pizza',
        description: 'Delicious pizza topped with pepperoni and cheese',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
        category: 'Pizza',
        isVeg: false,
        rating: 4.7,
        preparationTime: 22,
        isAvailable: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Burger Junction',
    description: 'Gourmet burgers made with premium ingredients',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    coverImage: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    rating: 4.3,
    reviewCount: 890,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minOrder: 12,
    cuisine: ['American', 'Burgers', 'Fast Food'],
    isOpen: true,
    distance: 0.8,
    offers: ['Buy 1 Get 1 Free on burgers'],
    menu: [
      {
        id: '3',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        category: 'Burgers',
        isVeg: false,
        rating: 4.4,
        preparationTime: 15,
        isAvailable: true,
      },
      {
        id: '4',
        name: 'Veggie Burger',
        description: 'Plant-based patty with fresh vegetables and vegan mayo',
        price: 8.99,
        originalPrice: 10.99,
        image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400',
        category: 'Burgers',
        isVeg: true,
        rating: 4.2,
        preparationTime: 12,
        isAvailable: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Sushi Zen',
    description: 'Fresh sushi and Japanese cuisine',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    coverImage: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    rating: 4.8,
    reviewCount: 567,
    deliveryTime: '30-45 min',
    deliveryFee: 3.99,
    minOrder: 20,
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    isOpen: true,
    distance: 2.1,
    offers: ['15% off on orders above $40'],
    menu: [
      {
        id: '5',
        name: 'Salmon Roll',
        description: 'Fresh salmon with avocado and cucumber',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
        category: 'Sushi',
        isVeg: false,
        rating: 4.9,
        preparationTime: 25,
        isAvailable: true,
      },
    ],
  },
]

export const useFoodStore = create<FoodStoreState>((set, get) => ({
  // Initial state
  restaurants: mockRestaurants,
  cart: [],
  orders: [],
  currentLocation: 'New York, NY',
  isLoading: false,
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'rating',
  cartTotal: 0,
  cartCount: 0,
  deliveryFee: 2.99,

  // Actions
  setRestaurants: (restaurants) => set({ restaurants }),

  addToCart: (foodItem, restaurant, quantity = 1, customizations = []) => {
    const { cart } = get()
    const existingItem = cart.find(
      item => item.foodItem.id === foodItem.id && 
      item.restaurant.id === restaurant.id &&
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
    )

    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * item.foodItem.price }
            : item
        )
      })
    } else {
      const newItem: CartItem = {
        id: `${foodItem.id}-${restaurant.id}-${Date.now()}`,
        foodItem,
        restaurant,
        quantity,
        customizations,
        totalPrice: quantity * foodItem.price,
      }
      set({ cart: [...cart, newItem] })
    }

    // Update cart totals
    const newCart = get().cart
    const cartTotal = newCart.reduce((total, item) => total + item.totalPrice, 0)
    const cartCount = newCart.reduce((count, item) => count + item.quantity, 0)
    set({ cartTotal, cartCount })
  },

  removeFromCart: (itemId) => {
    const { cart } = get()
    const newCart = cart.filter(item => item.id !== itemId)
    const cartTotal = newCart.reduce((total, item) => total + item.totalPrice, 0)
    const cartCount = newCart.reduce((count, item) => count + item.quantity, 0)
    set({ cart: newCart, cartTotal, cartCount })
  },

  updateCartQuantity: (itemId, quantity) => {
    const { cart } = get()
    if (quantity <= 0) {
      get().removeFromCart(itemId)
      return
    }

    const newCart = cart.map(item =>
      item.id === itemId
        ? { ...item, quantity, totalPrice: quantity * item.foodItem.price }
        : item
    )
    const cartTotal = newCart.reduce((total, item) => total + item.totalPrice, 0)
    const cartCount = newCart.reduce((count, item) => count + item.quantity, 0)
    set({ cart: newCart, cartTotal, cartCount })
  },

  clearCart: () => set({ cart: [], cartTotal: 0, cartCount: 0 }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),

  placeOrder: (deliveryAddress) => {
    const { cart, cartTotal, deliveryFee } = get()
    if (cart.length === 0) return ''

    const orderId = `order-${Date.now()}`
    const newOrder: Order = {
      id: orderId,
      restaurant: cart[0].restaurant, // Assuming single restaurant orders
      items: [...cart],
      totalAmount: cartTotal + deliveryFee,
      deliveryAddress,
      status: 'placed',
      orderTime: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
    }

    set(state => ({
      orders: [newOrder, ...state.orders],
      cart: [],
      cartTotal: 0,
      cartCount: 0,
    }))

    return orderId
  },

  updateOrderStatus: (orderId, status) => {
    set(state => ({
      orders: state.orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    }))
  },

  setCurrentLocation: (currentLocation) => set({ currentLocation }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))
