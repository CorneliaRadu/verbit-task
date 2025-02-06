import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Flex, View, Text, Button, Avatar } from "@aws-amplify/ui-react";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { toggleCart } from "../store/cartSlice";
import { selectUserInitials } from "../store/userSlice";


export const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userInitials = useAppSelector(selectUserInitials);

  return (
    <View
      as="nav"
      backgroundColor="brand.primary.80"
      boxShadow="medium"
      height="4rem"
      width="100%"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="80rem"
        margin="0 auto"
        padding="0.5rem"
        height="100%"
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <BookOpen color="var(--amplify-colors-teal-80)" />
          <Text
            color="var(--amplify-colors-teal-80)"
            fontWeight="bold"
            fontSize="1.25rem"
            marginLeft="0.5rem"
          >
            BookStore
          </Text>
        </Link>

        <Flex direction="row" gap="1rem">
          <Button
            variation={location.pathname === "/" ? "primary" : "menu"}
            onClick={() => {}}
            as={Link}
            to="/"
            size="small"
            aria-label="go-home"
          >
            Books
          </Button>

          <Button
            variation={location.pathname === "/profile" ? "primary" : "menu"}
            onClick={() => {}}
            as={Link}
            to="/profile"
            size="small"
            aria-label="go-to-profile"
          >
            <Flex alignItems="center" gap="0.25rem">
              {userInitials ? (
                <Avatar data-testid="go-to-profile">{userInitials}</Avatar>
              ) : (
                <Avatar></Avatar>
              )}

              <Text>Profile</Text>
            </Flex>
          </Button>

          <Button
            onClick={() => dispatch(toggleCart())}
            aria-label="toggle-cart"
          >
            <ShoppingCart />
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export default Navbar;
