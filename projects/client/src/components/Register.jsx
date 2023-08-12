import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRole, registerUser } from "../redux/authReducer";

const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const regisScheme = Yup.object().shape({
    email: Yup.string().required("Email harus diisi").email("Email harus valid"),
    roleID: Yup.string().required("Role harus diisi"),
    baseSalary: Yup.string().matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/, "not valid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      roleID: "",
      baseSalary: "",
    },
    validationSchema: regisScheme,
    onSubmit: async (values) => {
      try {
        console.log(values);
        await dispatch(registerUser(values));
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    dispatch(getRole());
  }, []);

  const { role } = useSelector((state) => state.authreducer);

  return (
    <Box>
      <Button colorScheme="facebook" onClick={onOpen}>
        Add New Cashier
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} isCentered>
        <ModalOverlay />
        <ModalContent pb={"20px"}>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>Register Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table>
                <Tbody>
                  <Tr>
                    <Th>Email</Th>
                    <Td>
                      <Input id="email" placeholder="Masukan Email Pegawai" {...formik.getFieldProps("email")} />
                      {formik.touched.email && formik.errors.email && (
                        <Center style={{ color: "red" }}>{formik.errors.email}</Center>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>role</Th>
                    <Td>
                      <Select placeholder="Pilih Role" {...formik.getFieldProps("roleID")}>
                        {role.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.role}
                          </option>
                        ))}
                      </Select>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Gaji Pegawai</Th>
                    <Td>
                      <Input placeholder="Masukan Gaji Pegawai" {...formik.getFieldProps("baseSalary")} />
                      {formik.touched.baseSalary && formik.errors.baseSalary && (
                        <Center style={{ color: "red" }}>{formik.errors.baseSalary}</Center>
                      )}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme={"facebook"} type="submit">
                Register
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Register;
