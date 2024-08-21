import { Todo } from "../entities/todos";

export interface TodoResponse {
    data: Todo[],
    message: string
}