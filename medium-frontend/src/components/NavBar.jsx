import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import InputSearch from "./InputSearch";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { FiEdit } from "react-icons/fi";
const NavBar = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("mediumv1"))
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    if (user?.token && user) {
      let expiryDate = jwt_decode(user?.token)?.exp;
      if (expiryDate * 1000 <= new Date().getTime()) {
        dispatch({ type: "LOGOUT" });
      } else {
        dispatch({ type: "KEEP_LOGIN", payload: user });
      }
    }
  }, [user, dispatch]);

  return (
    <Container maxWidth="100%">
      <Container
        p={0}
        pt={1}
        maxWidth="100%"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Link to={"/"}>
            <Heading fontWeight={"semibold"} fontSize={["2xl"]}>
              Medium.
            </Heading>
          </Link>
          <Box className="search" ml={10}>
            <InputSearch />
          </Box>

          <Button
            onClick={onOpen}
            className="searchIcon"
            ml={5}
            variant={"unstyled"}
            borderRadius={"full"}
            height={10}
            width={10}
            p={0}
          >
            <AiOutlineSearch size={25} />
          </Button>
        </Box>

        {auth?.isLoggedin ? (
          <Menu>
            <MenuButton
              as={Button}
              overflow={"hidden"}
              size={"xl"}
              borderRadius={"full"}
            >
              <Avatar name={auth?.user?.name} size={["sm"]} />
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <Text textAlign={"center"} fontSize={"xs"}>
                  {auth?.user?.name}
                </Text>
                <MenuItem>Account</MenuItem>
                <MenuItem>
                  <Link to={"/create-post"}>
                    <Box
                      className="write"
                      display={"flex"}
                      alignItems={"self-end"}
                    >
                      <FiEdit size={25} /> Write
                    </Box>
                  </Link>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Action">
                <MenuItem
                  as={"button"}
                  onClick={() => dispatch({ type: "LOGOUT" })}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <Box className="right-navbar" display={"flex"} alignItems={"center"}>
            <Link to={"/create-post"}>
              <Box className="write" display={"flex"} alignItems={"self-end"}>
                <FiEdit size={25} /> Write
              </Box>
            </Link>
            <Button fontWeight={"normal"} variant={"unstyled"}>
              <Link to={"/auth"}>Signin</Link>
            </Button>
          </Box>
        )}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputSearch />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default NavBar;
