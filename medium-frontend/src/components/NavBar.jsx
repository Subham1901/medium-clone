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
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import InputSearch from "./InputSearch";
import { useState } from "react";
const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Heading fontWeight={"semibold"} fontSize={["2xl", "3xl"]}>
            Medium.
          </Heading>
          <Box className="search" ml={10}>
            <InputSearch />
          </Box>

          <Button
            onClick={onOpen}
            className="searchIcon"
            ml={5}
            variant={"outline"}
            borderRadius={"full"}
            height={10}
            width={10}
            p={0}
          >
            <AiOutlineSearch size={25} />
          </Button>
        </Box>
        {isLoggedIn ? (
          <Menu>
            <MenuButton
              as={Button}
              overflow={"hidden"}
              size={"xl"}
              borderRadius={"full"}
            >
              <Avatar name="s" />
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem>My Account</MenuItem>
                <MenuItem>Payments </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
                <MenuItem onClick={() => setIsLoggedIn(false)}>FAQ</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <Button variant={"unstyled"} onClick={() => setIsLoggedIn(true)}>
            Login
          </Button>
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
