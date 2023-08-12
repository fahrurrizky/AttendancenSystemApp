import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Navbar = () => {
  return (
    <Box bgColor={"white"} borderBottom={"3px solid #E0E0E0"}>
      <Flex p={3} mx={"15vw"} justifyContent={"space-between"}>
        <Flex>
          <Image boxSize={"60px"} ml={2} src=""></Image>
          <Text ml={"10px"} fontSize={"40px"} fontWeight={"bold"}>
            LOELOS
          </Text>
        </Flex>
        <Text>Avatar Badge ETC</Text>
      </Flex>
    </Box>
  );
};
