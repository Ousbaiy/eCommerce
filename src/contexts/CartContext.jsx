import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartFromLocalStorage || []);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Total Amount
  useEffect(() => {
    const total = cart.reduce((acc, curItem) => {
      return acc + curItem.price * curItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  // ? is better to do it without use State
  // const total = cart.reduce((acc, curItem) => {
  //   return acc + curItem.price * curItem.amount
  // }, 0)

  //update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, curItem) => {
        return acc + curItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // Add to Cart
  const addToCart = (id, product) => {
    const newItem = { ...product, amount: 1 };
    const CartItem = cart.find((item) => {
      return item.id === id;
    });
    // if cart item is already in the cart
    if (CartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: CartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // increase amount
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(id, cartItem);
  };

  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
