import { Input } from "@chakra-ui/react";

const InputSearch = () => {
  return (
    <Input
      _focus={{ boxShadow: "none !important" }}
      focusBorderColor="none"
      borderRadius={"full"}
      placeholder="Search"
    />
  );
};

export default InputSearch;
