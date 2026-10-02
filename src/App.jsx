import { useState } from "react";
import "./App.css";

import chickenBurger from "./assets/chickenburger.jpg";
import baconBurger from "./assets/baconburger.jpg";
import cheeseBurger from "./assets/cheeseburger.jpg";
import veggieBurger from "./assets/veggieburger.jpg";

function App() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    contact: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const burgers = [
    {
      id: 1,
      name: "Classic Chicken",
      price: 99,
      rating: 4.8,
      image: chickenBurger,
    },
    {
      id: 2,
      name: "Ultimate Bacon",
      price: 129,
      rating: 4.9,
      image: baconBurger,
    },
    {
      id: 3,
      name: "Classic Cheese",
      price: 119,
      rating: 4.9,
      image: cheeseBurger,
    },
    {
      id: 4,
      name: "Veggie Burger",
      price: 109,
      rating: 4.7,
      image: veggieBurger,
    },
  ];

  const addToCart = (burger) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === burger.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === burger.id
            ? {
                ...item,
                quantity: Number(item.quantity) + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...burger,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (
      !customer.name ||
      !customer.contact ||
      !customer.address
    ) {
      alert("Please complete all customer information.");
      return;
    }

    setOrderPlaced(true);
    setCart([]);
  };

  /* ORDER SUCCESS */
  if (orderPlaced) {
    return (
      <div className="success-page">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>ORDER SUCCESSFUL!</h1>

          <p>
            Thank you, {customer.name}!
          </p>

          <p>
            Your Mendoza Burger order has been
            successfully placed.
          </p>

          <div className="order-details">
            <p>
              <strong>Payment:</strong>{" "}
              {customer.payment}
            </p>

            <p>
              <strong>Delivery Address:</strong>{" "}
              {customer.address}
            </p>
          </div>

          <button
            className="back-home-btn"
            onClick={() => {
              setOrderPlaced(false);
              setShowCheckout(false);
              setCustomer({
                name: "",
                contact: "",
                address: "",
                payment: "Cash on Delivery",
              });
            }}
          >
            BACK TO MENU
          </button>

        </div>

      </div>
    );
  }

  /* CHECKOUT PAGE */
  if (showCheckout) {
    return (
      <div className="checkout-page">

        <div className="checkout-container">

          <div className="checkout-header">
            <button
              className="back-btn"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              ← BACK TO CART
            </button>

            <h1>CHECKOUT</h1>

            <p>
              Complete your information to place
              your order.
            </p>
          </div>

          <div className="checkout-content">

            {/* CUSTOMER INFORMATION */}
            <div className="customer-form">

              <h2>
                CUSTOMER INFORMATION
              </h2>

              <form onSubmit={placeOrder}>

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  required
                />

                <label>
                  Contact Number
                </label>

                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={customer.contact}
                  onChange={handleCustomerChange}
                  required
                />

                <label>
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  required
                />

                <label>
                  Payment Method
                </label>

                <select
                  name="payment"
                  value={customer.payment}
                  onChange={handleCustomerChange}
                >
                  <option>
                    Cash on Delivery
                  </option>

                  <option>
                    GCash
                  </option>

                  <option>
                    Credit / Debit Card
                  </option>
                </select>

                <button
                  type="submit"
                  className="place-order-btn"
                >
                  PLACE ORDER
                </button>

              </form>

            </div>

            {/* ORDER SUMMARY */}
            <div className="order-summary">

              <h2>
                ORDER SUMMARY
              </h2>

              {cart.map((item) => (
                <div
                  className="summary-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.quantity} × ₱
                      {item.price}.00
                    </p>
                  </div>

                </div>
              ))}

              <div className="summary-total">

                <div>
                  <span>
                    Total Items
                  </span>

                  <strong>
                    {totalItems}
                  </strong>
                </div>

                <div>
                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₱{totalPrice.toFixed(2)}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  /* MAIN PAGE */
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          MENDOZA BURGER
        </div>

        <div className="nav-links">
          <a href="#about">
            ABOUT
          </a>

          <a href="#menu">
            OUR MENU
          </a>

          <a href="#shop">
            SHOP
          </a>

          <a href="#contact">
            CONTACT
          </a>

          <div className="cart">
            🛒
            <span className="cart-count">
              {totalItems}
            </span>
          </div>
        </div>

      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-text">

          <p className="small-title">
            WELCOME TO
          </p>

          <h1>
            MENDOZA
            <br />
            BURGER
          </h1>

          <p>
            Delicious burgers made fresh and
            served with love.
          </p>

          <button>
            ORDER NOW
          </button>

        </div>

        <div className="hero-image">
          <img
            src={chickenBurger}
            alt="Mendoza Burger"
          />
        </div>

      </section>

      {/* MENU */}
      <section
        id="menu"
        className="menu-section"
      >

        <p className="small-title">
          OUR MENU
        </p>

        <h2>
          OUR CRAZY BURGERS
        </h2>

        <div className="burger-container">

          {burgers.map((burger) => (

            <div
              className="burger-card"
              key={burger.id}
            >

              <button className="heart-btn">
                ♡
              </button>

              <img
                src={burger.image}
                alt={burger.name}
              />

              <h3>
                {burger.name}
              </h3>

              <p>
                ₱{burger.price}.00
              </p>

              <span>
                ⭐ {burger.rating}
              </span>

              <button
                className="add-cart-btn"
                onClick={() =>
                  addToCart(burger)
                }
              >
                ADD TO CART
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* CART */}
      {cart.length > 0 && (

        <section className="cart-section">

          <h2>
            YOUR CART
          </h2>

          <div className="cart-list">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    ₱{item.price}.00
                  </p>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  REMOVE
                </button>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h3>
              Total Items: {totalItems}
            </h3>

            <h2>
              Total: ₱{totalPrice.toFixed(2)}
            </h2>

            <button
              className="checkout-btn"
              onClick={() =>
                setShowCheckout(true)
              }
            >
              PROCEED TO CHECKOUT
            </button>

          </div>

        </section>

      )}

    </div>
  );
}

export default App;