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
          <form>
            <FormControl w={"xs"}>
              {signup && (
                <Input
                  mt={2}
                  focusBorderColor="black"
                  placeholder="Name"
                  type="text"
                />
              )}
              <Input
                mt={2}
                className="auth-input"
                focusBorderColor="black"
                placeholder="Email"
                type="email"
              />
              <Input
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
