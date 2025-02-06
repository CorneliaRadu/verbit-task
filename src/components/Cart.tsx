import React from "react";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { View, Text, Flex, Button, Divider } from "@aws-amplify/ui-react";

import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  removeFromCart,
  updateQuantity,
  toggleCart,
  checkout,
} from "../store/cartSlice";
import { toast } from "react-hot-toast";

export const Cart: React.FC = () => {
  const { items, total, isOpen } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (
    bookId: number,
    currentQuantity: number,
    delta: number
  ) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 1) return;

    const item = items.find((item) => item.book.id === bookId);
    if (!item) return;

    const maxStock = item.book.originalStock || item.book.stock;

    if (newQuantity > maxStock) {
      toast.error(`Only ${maxStock} copies available`);
      return;
    }

    dispatch(updateQuantity({ bookId, quantity: newQuantity }));
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    dispatch(checkout());
    toast.success("Order placed successfully!");
  };
  if (!isOpen) return null;

  return (
    <Flex
      width="320px"
      height="100vh"
      backgroundColor="white"
      borderColor="gray.10"
      padding="1rem"
      display="flex"
      data-testid="cart"
      direction="column"
    >
      <Flex marginBottom="1rem" width="100%">
        <Flex alignItems="center">
          <Button onClick={() => dispatch(toggleCart())} size="small" aria-label="toggle-cart">
            <X size="16" />
          </Button>
          <ShoppingCart />
          <Text fontWeight="bold" fontSize="1.125rem">
            Shopping Cart
          </Text>
        </Flex>
      </Flex>
      <View maxHeight="100vh" overflow="scroll">
        {items.length === 0 ? (
          <Text textAlign="center" color="gray.60">
            Your cart is empty
          </Text>
        ) : (
          <Flex direction="column" gap="1rem">
            {items.map((item) => (
              <View
                key={item.book.id}
                backgroundColor="gray.10"
                borderRadius="0.5rem"
                padding="0.75rem"
                data-testid={`cart-item-${item.book.id}`}
              >
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  alignItems="start"
                >
                  <View flex="1">
                    <Text fontWeight="medium" fontSize="0.875rem">
                      {item.book.title}
                    </Text>
                    <Text fontSize="0.875rem" color="gray.60">
                      {item.book.author}
                    </Text>
                    <Text fontWeight="semibold" marginTop="0.25rem">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                  <Button
                    variation="link"
                    onClick={() => dispatch(removeFromCart(item.book.id))}
                    aria-label="Remove from cart"
                  >
                    <X />
                  </Button>
                </Flex>
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  marginTop="0.5rem"
                >
                  <Flex direction="row" alignItems="center" gap="0.5rem">
                    <Button
                      variation="primary"
                      size="small"
                      onClick={() =>
                        handleUpdateQuantity(item.book.id, item.quantity, -1)
                      }
                      aria-label="Decrease quantity"
                    >
                      <Minus />
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button
                      variation="primary"
                      size="small"
                      onClick={() =>
                        handleUpdateQuantity(item.book.id, item.quantity, 1)
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus />
                    </Button>
                  </Flex>
                </Flex>
              </View>
            ))}
          </Flex>
        )}
      </View>

      {!!items.length && (
        <Flex direction="column">
          <Divider marginTop="1rem" marginBottom="1rem" />
          <Flex
            direction="row"
            justifyContent="space-between"
            marginBottom="1rem"
          >
            <Text fontWeight="semibold">Total:</Text>
            <Text fontWeight="semibold" data-testid="cart-total">
              ${total.toFixed(2)}
            </Text>
          </Flex>
          <Button variation="primary" onClick={handleSubmit} >
            Submit
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Cart;
