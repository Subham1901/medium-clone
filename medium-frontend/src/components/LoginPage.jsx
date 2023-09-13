import {
  Box,
  Container,
  Input,
  Heading,
  Button,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";

const LoginPage = () => {
  const [signup, setSignUp] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setTimeout(() => {
      setUserData({ ...userData, [event.target.name]: event.target.value });
    }, 300);
  };
  const handleAuth = () => {};
  return (
    <>
      <Container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"80vh"}
      >
        <Box
          w={"sm"}
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
          <form onSubmit={handleAuth}>
            <FormControl w={"xs"}>
              {signup && (
                <Input
                  defaultValue={userData.name}
                  onChange={handleChange}
                  name="name"
                  mt={2}
                  focusBorderColor="black"
                  placeholder="Name"
                  type="text"
                />
              )}
              <Input
                defaultValue={userData.email}
                onChange={handleChange}
                name="email"
                mt={2}
                className="auth-input"
                focusBorderColor="black"
                placeholder="Email"
                type="email"
              />
              <Input
                defaultValue={userData.password}
                onChange={handleChange}
                name="password"
                mt={2}
                focusBorderColor="black"
                className="auth-input"
                type="password"
                placeholder="Password"
              />
              <Button
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
                ml={1}
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
