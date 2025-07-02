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

export type SectionType = "personal" | "account" | "favorites";
