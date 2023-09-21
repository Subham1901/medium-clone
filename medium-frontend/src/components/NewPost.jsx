import {
  Alert,
  AlertIcon,
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
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import ShowAlert from "./ShowAlert";
import Loader from "./Loader";
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
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopics] = useState([]);
  const topicRef = useRef();
  const handleAdd = (id) => {
    if (topicRef.current.value) {
      setTopics([...topic, { id, topic: topicRef.current.value }]);
      topicRef.current.value = "";
    }
  };
  const deleteTopic = (id) => {
    setTopics(topic.filter((data) => data?.id !== id));
  };
  console.log(topic);
  let { user } = useSelector((state) => state.auth);
  let { isPublished, error, success, loading } = useSelector(
    (state) => state.post
  );

  const publishStory = (event) => {
    event.preventDefault();

    const payload = {
      title,
      story: content,
      topic: topic.map((data) => data.topic),
      userid: user?.pk_user_id,
    };
    dispatch({ type: "ADD_POST", payload });

    setTitle("");
    setContent("");
    setTopics([]);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Container maxW={"container.md"}>
      <form onSubmit={publishStory}>
        <Input
          onChange={(event) => setTitle(event.target.value)}
          name="title"
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
            <Button
              _hover={{ backgroundColor: "black" }}
              fontWeight={"thin"}
              color={"white"}
              bgColor="black"
              padding={2}
              onClick={() => handleAdd(v1())}
            >
              <AiOutlinePlus color="white" size={"50px"} />
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
              <button onClick={() => deleteTopic(data?.id)} className="cross">
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
        {isPublished && (
          <ShowAlert
            status="success"
            message={success}
            type="CLEAR_POST_SUCCESS_MESSAGE"
          />
        )}
        {error && (
          <ShowAlert status="error" message={error} type="CLEAR_POST_ERROR" />
        )}
      </form>
    </Container>
  );
};

export default NewPost;
