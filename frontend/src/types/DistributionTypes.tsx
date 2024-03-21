import { Item } from "./ItemTypes";
import { User } from "./UserTypes";

export interface Distribution {
  id: number;
  item: Item;
  percent: number;
  user: User;
}
