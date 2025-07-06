export type User = {
  id: number;
  username: string;
  email: string;
};

export type Recipe = {
  id: number;
  name: string;
};

export type Favorite = {
  id: number;
  name: string;
};

export type Note = {
  id: number;
  content: string;
  recipe: {
    id: number;
    name: string;
  };
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  likesCount: number;
};

export type SectionType = "personal" | "account" | "favorites" | "notes";
