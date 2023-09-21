import {
  Box,
  Container,
  Input,
  Heading,
  Button,
  Text,
  FormControl,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import ShowAlert from "./ShowAlert";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });
  const [signup, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleAuth = (event) => {
    event.preventDefault();
    if (signup) {
      dispatch({ type: "USER_SIGNUP", payload: userData });
      setUserData({ ...userData, name: "", email: "", password: "" });
    } else {
      dispatch({ type: "USER_LOGIN", payload: userData });
      setUserData({ ...userData, name: "", email: "", password: "" });
    }
  };

  const { isLoggedin, loading, error, isSignedup } = useSelector(
    (state) => state.auth
  );

  if (isLoggedin) {
    navigate("/");
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"80vh"}
      >
        <Box
          w={["sm", "md"]}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
          className="authContainer"
          borderRadius={"md"}
        >
          <Heading p={2} textAlign={"center"} fontWeight={"bold"}>
            {signup ? "Signup" : "Login"}
          </Heading>
          {isSignedup && signup && (
            <Alert status="success">
              <AlertIcon />
              Successfully signed up! Please login
            </Alert>
          )}
          {error && (
            <ShowAlert status="error" message={error} type="CLEAR_ERROR" />
          )}

          <form onSubmit={handleAuth}>
            <FormControl w={["xs", "sm"]}>
              {signup && (
                <Input
                  value={userData?.name}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="name"
                  mt={2}
                  focusBorderColor="black"
                  placeholder="Name"
                  type="text"
                />
              )}
              <Input
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
                value={userData?.email}
                name="email"
                mt={2}
                className="auth-input"
                focusBorderColor="black"
                placeholder="Email"
                type="email"
              />
              <Input
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
                name="password"
                mt={2}
                focusBorderColor="black"
                className="auth-input"
                type="password"
                placeholder="Password"
              />
              <Button
                sx={{
                  _disabled: true,
                }}
                type="submit"
                mt={4}
                fontWeight={"md"}
                w={"full"}
                color={"white"}
                bgColor="black"
                variant={"unstyled"}
              >
                {signup ? "Signup" : "Login"}
              </Button>
            </FormControl>
          </form>
          <Text m={2} fontSize={"xs"}>
            {signup ? "Already have an account?" : `Don't have account?`}
            <span>
              <Button
                onClick={() => setSignUp((prev) => !prev)}
                variant={"unstyled"}
                fontSize={"xs"}
                ml={2}
              >
                {signup ? "Login" : "Signup"}
              </Button>
            </span>
          </Text>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
