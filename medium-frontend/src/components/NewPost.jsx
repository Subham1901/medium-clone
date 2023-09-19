import {
  Box,
  Button,
  Code,
  Container,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { RxCross2 } from "react-icons/rx";
import { v1 } from "uuid";

import ReactQuill from "react-quill";
const module = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "strike", "blockquote", "code"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code",
];

const NewPost = () => {
  const [content, setContent] = useState("");
  const [topic, setTopics] = useState([]);
  const topicRef = useRef();
  const handleAdd = (id) => {
    setTopics([...topic, { id, topic: topicRef.current.value }]);
    topicRef.current.value = "";
  };
  const deleteTopic = (id) => {
    setTopics(topic.filter((data) => data?.id !== id));
  };
  console.log(topic);
  return (
    <Container maxW={"container.md"}>
      <form>
        <Input
          w={["xs", "md", "xl"]}
          placeholder="Title"
          className="textarea"
          sx={{ _focusVisible: "none" }}
        />
        <InputGroup>
          <Input
            ref={topicRef}
            w={["xs", "md", "xl"]}
            placeholder="Topic"
            className="textarea"
            sx={{ _focusVisible: "none" }}
          />
          <InputRightElement margin={"10px"}>
            <Button onClick={() => handleAdd(v1())} variant={"outline"}>
              +
            </Button>
          </InputRightElement>
        </InputGroup>
        {topic &&
          topic.map((data) => (
            <Code
              position={"relative"}
              padding={2}
              borderRadius={"md"}
              margin={"10px"}
              key={data?.id}
            >
              {data.topic}{" "}
              <button onClick={(e) => deleteTopic(data?.id)} className="cross">
                <RxCross2 />
              </button>
            </Code>
          ))}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={module}
          formats={formats}
          placeholder="Story description"
        />

        <Button
          type="submit"
          m={"10px"}
          _hover={{ backgroundColor: "black" }}
          fontWeight={"thin"}
          color={"white"}
          bgColor="black"
        >
          Publish
        </Button>
      </form>
    </Container>
  );
};

export default NewPost;
