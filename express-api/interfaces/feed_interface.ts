export interface Post {
  id: Required<string>;
  title: Required<string>;
  content: Partial<string>;
}

export type PostRequest = Omit<Post, "id">;

export interface PostResponse {
  message: Required<string>;
  post: Required<Post>;
}

export interface PostListResponse {
  posts: Array<PostRequest>;
}
