import { User } from "./UserTypes";

export interface Settlement {
    id: number;
    name: string;
    settled: boolean;
    owner: User;
    participants: User[];
}
