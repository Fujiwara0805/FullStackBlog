export type PostProps = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export type UpdateBlogParams = {
  title: string | undefined;
  description: string | undefined;
  id: number;
};
