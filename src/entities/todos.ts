export interface Todo {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
  }