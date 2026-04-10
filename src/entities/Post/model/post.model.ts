export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type FetchPostsResponse = {
  data: Post[];
  totalCount: number;
}

export type FetchPostsParams = {
  page: number;
  limit?: number;
}