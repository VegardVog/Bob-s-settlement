import { User } from "./UserTypes";

export interface Settlement {
    id: number;
    name: string;
    settled: boolean;
    owner: object;
    participants: User[];
}
