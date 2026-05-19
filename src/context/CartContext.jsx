import {
  createContext,
  useContext,
  useState,
} from "react";

// ================= CONTEXT =================

const CartContext =
  createContext();

// =====================================================
// PROVIDER
// =====================================================

export const CartProvider = ({
  children,
}) => {

  // ================= STATE =================

  const [cartItems, setCartItems] =
    useState([]);

  // =====================================================
  // ADD PRODUCT
  // =====================================================

  const addToCart = (
    product
  ) => {

    const alreadyExists =
      cartItems.find(
        (item) =>
          item.id === product.id
      );

    if (!alreadyExists) {

      setCartItems([
        ...cartItems,
        product,
      ]);
    }
  };

  // =====================================================
  // REMOVE PRODUCT
  // =====================================================

  const removeFromCart = (
    productId
  ) => {

    const updatedCart =
      cartItems.filter(
        (item) =>
          item.id !== productId
      );

    setCartItems(
      updatedCart
    );
  };

  // =====================================================
  // TOTAL PRICE
  // =====================================================

  const totalPrice =
    cartItems.reduce(
      (total, item) => {

        return (
          total +
          Number(
            item.discount_price || 0
          )
        );

      },
      0
    );

  // =====================================================
  // PROVIDER
  // =====================================================

  return (

    <CartContext.Provider
      value={{

        cartItems,

        addToCart,

        removeFromCart,

        totalPrice,

      }}
    >

      {children}

    </CartContext.Provider>

  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useCart = () => {

  return useContext(
    CartContext
  );
};