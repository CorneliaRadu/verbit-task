import React, { useState } from "react";
import { Book } from "../types";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";
import { Card, Flex, Text, Button, StepperField } from "@aws-amplify/ui-react";

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const cartItem = cartItems.find((item) => item.book.id === book.id);
  const stock = cartItem ? book.stock - cartItem.quantity : book.stock;

  const handleAddToCart = () => {
    if (selectedQuantity > stock) {
      toast.error(`Only ${stock} copies available`);
      return;
    }

    dispatch(addToCart({ book, quantity: selectedQuantity }));

    toast.success("Added to cart!");
  };

  return (
    <Card variation="elevated">
      <Flex alignItems="flex-start">
        <Flex direction="column" gap="xs">
          <Text fontSize="large" fontWeight="semibold">
            {book.title}
          </Text>
          <Text color="font.tertiary">{book.author}</Text>
          <Text fontSize="large" color="secondary">
            {book.price}
          </Text>
          <Text fontSize="large" color="secondary">
            Stock: {stock}
          </Text>
          <Flex>
            <StepperField
              label="Quantity"
              min={1}
              max={book.stock}
              step={1}
              defaultValue={1}
              value={selectedQuantity}
              minWidth="fit-content"
              onStepChange={(value) => setSelectedQuantity(value)}
              labelHidden
              data-testid="quantity-input" 
            />
            <Button
              variation="primary"
              onClick={handleAddToCart}
              disabled={stock === 0}
            >
              Add to cart
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
