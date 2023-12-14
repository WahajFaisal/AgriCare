import React, { useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useAppContext } from "../context/ChatProvider";
import { SideDrawer } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const Blog = () => {
  const { user } = useAppContext();
  const [title, setTitle] = useState();
  const [blog, setBlog] = useState();
  const addRequest = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    if (!title || !blog) {
      toast.error("Fill Values", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const value = axios.post("http://localhost:8000/admin/blog/addBlog", {
      title,
      content: blog,
    });
    toast.success("Added", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setBlog("");
    setTitle("");
  };

  return (
    <ChakraProvider>
      {user && <SideDrawer />}
      <CSSReset />
      <Box p={4}>
        <form>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Blog Post</FormLabel>
            <Textarea
              rows={6}
              placeholder="Enter your blog post"
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" onClick={addRequest}>
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default Blog;
