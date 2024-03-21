import { Settlement } from "./SettlementTypes";
import { User } from "./UserTypes";

export interface Item {
  id: number;
  name: string;
  price: number;
  addedBy: User;
  settlement: Settlement;
}
