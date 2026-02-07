export interface Todo {
  id: string;
  title?: string;
  body?: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
