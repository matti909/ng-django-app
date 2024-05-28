export interface UserCurrent {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  posts_count: number;
  avatar: string;
  bio: string;
  created: Date;
  updated: Date;
}

export interface PostProps {
  id: string;
  author: UserCurrent;
  body: string;
  edited: boolean;
  liked: boolean;
  likes_count?: number;
  comments_count?: number;
  created: Date;
  updated: Date;
}

export type CommentProps = {
  id: string;
  post: PostProps;
  author: UserCurrent;
  body: string;
  edited?: boolean;
  liked: boolean;
  likes_count: number;
  created: Date;
  updated: Date;
};
