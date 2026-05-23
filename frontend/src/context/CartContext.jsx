import {
  createContext,
  useContext,
  useState,
} from "react";

// =====================================================
// CONTEXT
// =====================================================

const CartContext =
  createContext();

// =====================================================
// PROVIDER
// =====================================================

export const CartProvider = ({
  children,
}) => {

  // =====================================================
  // CART STATE
  // =====================================================

  const [
    finalCartItems,
    setFinalCartItems,
  ] = useState([]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (
    product
  ) => {

    const alreadyExists =
      finalCartItems.find(
        (item) =>
          item.id === product.id
      );

    if (!alreadyExists) {

      setFinalCartItems([
        ...finalCartItems,
        product,
      ]);

    }

  };

  // =====================================================
  // REMOVE FROM CART
  // =====================================================

  const removeFromCart = (
    productId
  ) => {

    const updatedCart =
      finalCartItems.filter(
        (item) =>
          item.id !== productId
      );

    setFinalCartItems(
      updatedCart
    );

  };

  // =====================================================
  // CLEAR CART
  // =====================================================

  const clearCart = () => {

    setFinalCartItems([]);

  };

  // =====================================================
  // TOTAL PRICE
  // =====================================================

  const totalPrice =
    finalCartItems.reduce(

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
  // PROVIDER VALUE
  // =====================================================

  return (

    <CartContext.Provider
      value={{

        finalCartItems,

        addToCart,

        removeFromCart,

        clearCart,

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