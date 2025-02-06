import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Button,
  Input,
  Text,
  View,
  Flex,
  useTheme,
  Card,
  Heading,
  Label,
} from "@aws-amplify/ui-react";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { updateProfile } from "../store/userSlice";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  dateOfBirth: Yup.date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable()
    .notRequired(),
});

export const ProfilePage: React.FC = () => {
  const { tokens } = useTheme();
    const dispatch = useAppDispatch();
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    dispatch(updateProfile(data));
    toast.success("Profile updated successfully!");
    reset();
  };

  return (
    <View maxWidth="500px" margin="auto" padding={tokens.space.medium}>
      <Card variation="elevated" padding={tokens.space.large}>
        <Flex direction="column" gap={tokens.space.large}>
          <Heading level={2}>Profile Settings</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap={tokens.space.medium}>
              <Flex direction="column" gap="4px">
                <Label htmlFor="firstName">First Name *</Label>

                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                  hasError={!!errors.firstName}
                />
              </Flex>

              <Flex direction="column" gap="4px">
                <Label htmlFor="lastName">Last Name *</Label>

                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  hasError={!!errors.lastName}
                />
              </Flex>

              <Flex direction="column" gap="4px">
                <Label htmlFor="email">Email *</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  {...register("email")}
                  hasError={!!errors.email}
                />
                {errors.email && (
                  <Text fontSize="sm" color="darkred">
                    {errors.email.message}
                  </Text>
                )}
              </Flex>

              <Flex direction="column" gap="4px">
                <Label htmlFor="dateOfBirth">Date of Birth (Optional)</Label>

                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  hasError={!!errors.dateOfBirth}
                />
              </Flex>
            </Flex>

            <Button
              type="submit"
              variation="primary"
              width="100%"
              marginTop="16px"
            >
              Update Profile
            </Button>
          </form>
        </Flex>
      </Card>
    </View>
  );
};
