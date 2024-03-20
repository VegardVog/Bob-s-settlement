
export interface Settlement {
    id: number;
    name: string;
    settled: boolean;
    owner: object;
    participants: [object];
}
