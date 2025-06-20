# Food Delivery Application

This is a modern and responsive food delivery application built with React, Vite, and Tailwind CSS. It provides a seamless experience for users to browse restaurants, order food, manage their cart, and track orders.

## Features

- **User Authentication**: Secure login and registration for users.
- **Restaurant Listing**: Browse a list of available restaurants.
- **Restaurant Details**: View detailed information about each restaurant, including menus.
- **Food Ordering**: Add food items to the cart.
- **Shopping Cart**: Manage items in the cart, update quantities, and remove items.
- **Checkout Process**: A streamlined checkout flow for placing orders.
- **Order History**: View past orders and their statuses.
- **User Profile**: Manage user profile information.
- **Search Functionality**: Search for restaurants or food items.
- **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).
- **State Management**: Efficient state management using Zustand.
- **Routing**: Seamless navigation between different pages using React Router DOM.
- **Form Handling**: Robust form validation and handling with React Hook Form and Zod.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides a lightning-fast development experience.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **React Router DOM**: Declarative routing for React.
- **Zustand**: A small, fast, and scalable bearbones state-management solution.
- **React Hook Form**: Performant, flexible and extensible forms with easy-to-use validation.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Framer Motion**: A production-ready motion library for React.
- **Lucide React**: A beautiful, customizable icon library.
- **Date-fns**: A modern JavaScript date utility library.
- **React Hot Toast**: A lightweight and customizable toast notification library.

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/food-delivery.git
    cd food-delivery
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
```

This will start the development server, and you can view the application in your browser at `http://localhost:5173` (or another port if 5173 is in use).

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with the production-ready build.

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
Food_Delivery/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global CSS styles
│   ├── main.tsx            # Entry point for React application
│   ├── style.css           # Additional styles
│   ├── components/
│   │   ├── cart/
│   │   │   └── FloatingCart.tsx # Component for displaying cart summary
│   │   └── layout/
│   │       ├── Footer.tsx  # Footer component
│   │       └── Navbar.tsx  # Navigation bar component
│   ├── pages/
│   │   ├── About.tsx       # About Us page
│   │   ├── Cart.tsx        # Shopping Cart page
│   │   ├── Checkout.tsx    # Checkout process page
│   │   ├── Contact.tsx     # Contact Us page
│   │   ├── Home.tsx        # Home page
│   │   ├── Login.tsx       # User Login page
│   │   ├── NotFound.tsx    # 404 Not Found page
│   │   ├── Orders.tsx      # User Orders history page
│   │   ├── Profile.tsx     # User Profile page
│   │   ├── Register.tsx    # User Registration page
│   │   ├── RestaurantDetail.tsx # Individual Restaurant details page
│   │   ├── Restaurants.tsx # List of Restaurants page
│   │   └── Search.tsx      # Search page
│   └── store/
│       └── foodStore.ts    # Zustand store for food-related state management
├── .gitignore              # Git ignore file
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project README file
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for Node.js environment
└── vite.config.ts          # Vite configuration
