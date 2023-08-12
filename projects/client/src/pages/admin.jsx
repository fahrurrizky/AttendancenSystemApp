import { Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../components/Navbar";
import Register from "../components/Register";

export const Admin = () => {
  return (
    <Box>
      <Navbar />
      <Register />
    </Box>
  );
};

export default Admin;
