import { Request, Response } from "express";
import {
  PostRequest,
  PostResponse,
  PostListResponse,
} from "../interfaces/feed_interface";

export const getPosts = (
  req: Request<PostRequest>,
  res: Response<PostListResponse>
) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is the first post!" }],
  });
};

export const createPost = (
  req: Request<PostRequest>,
  res: Response<PostResponse>
) => {
  const title = req.body.title;
  const content = req.body.content;

  // Create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
