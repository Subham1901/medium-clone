import { Input } from "@chakra-ui/react";

const InputSearch = () => {
  return (
    <Input
      height={"35px"}
      w={"xs"}
      _focus={{ boxShadow: "none !important" }}
      focusBorderColor="none"
      borderRadius={"full"}
      placeholder="Search"
    />
  );
};

export default InputSearch;
