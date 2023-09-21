import { Alert, AlertIcon, Button, Text } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
const ShowAlert = (props) => {
  let dispatch = useDispatch();
  return (
    <Alert status={props?.status} position={"relative"}>
      <AlertIcon />
      <Text> {props?.message}</Text>
      <Button
        onClick={() => dispatch({ type: props?.type })}
        position={"absolute"}
        right={5}
        colorScheme="whiteAlpha"
        p={0}
        borderRadius={"full"}
      >
        <RxCross2 color="black" size={25} />
      </Button>
    </Alert>
  );
};

export default ShowAlert;
