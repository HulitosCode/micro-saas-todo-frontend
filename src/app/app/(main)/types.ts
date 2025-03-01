import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import getUserTodos from "./actions";

/*/ Ao inves de usarmos 
export type Todo = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt?: Date;
};

Subistituimos pelo ReturnTypeWithoutPromise que ja pega a tipagem directa sem retornar
a promise.

usamos o ReturnTypeWithoutPromise em caso de nao mudarmos a tipagem
/*/
export type Todo = ReturnTypeWithoutPromise<typeof getUserTodos>[0];
