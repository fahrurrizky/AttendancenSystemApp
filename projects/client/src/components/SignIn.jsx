import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authReducer";
import { useNavigate } from "react-router-dom";

const loginschema = Yup.object().shape({
  email: Yup.string().required("email harus diisi").email("email harus valid"),
  password: Yup.string()
    .required("Password harus diisi")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
      "Password minimal 6 karakter, 1 symbol, dan 1 huruf kapital"
    ),
});

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginschema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await dispatch(loginUser(values, navigate));
      setIsLoading(false);
    },
  });

  return (
    <Flex
      flexDirection="row"
      width="100wh"
      height="100vh"
      backgroundColor="gray.400"
      justifyContent="center"
      alignItems="center">
      <Box>
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Box minW={{ base: "90%", md: "468px" }} shadow={"xl"}>
            <form onSubmit={formik.handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                borderRadius={10}
                padding={10}>
                <Text fontSize={"5xl"} align={"center"} fontWeight={"bold"} colorScheme="facebook">
                  Welcome
                </Text>
                <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                  <FormLabel htmlFor="email" fontWeight={"bold"}>
                    email
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <FaUserAlt />
                    </InputLeftElement>
                    <Input
                      name="email"
                      id="email"
                      type="text"
                      placeholder="email"
                      focusBorderColor="#FC2947"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </InputGroup>
                  {formik.touched.email && formik.errors.email && (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={formik.touched.password && formik.errors.password}>
                  <FormLabel htmlFor="password" fontWeight={"bold"}>
                    Password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <RiLockPasswordFill />
                    </InputLeftElement>
                    <Input
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      focusBorderColor="#FC2947"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <InputRightElement>
                      <Button variant={"none"} size={"xl"} onClick={handleShowClick}>
                        {showPassword ? <BiSolidHide /> : <BiShowAlt />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                  )}
                  <FormHelperText textAlign="right" fontWeight={"bold"} mt={"15px"}>
                    <Button
                      variant={""}
                      color={"black "}
                      _hover={{ color: "#FC2947" }}
                      onClick={() => {
                        onOpen();
                      }}>
                      Forget Password
                    </Button>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={5}
                  type="submit"
                  colorScheme="facebook"
                  width="full"
                  isLoading={isLoading}
                  loadingText="Logging in...">
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Box>
      {/* <Modalforgotpass isOpen={isOpen} onClose={onClose} onOpen={onOpen} /> */}
    </Flex>
  );
}
