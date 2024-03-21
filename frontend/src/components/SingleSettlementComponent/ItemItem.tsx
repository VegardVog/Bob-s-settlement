import { Item } from "../../types/ItemTypes";

interface PropTypes {
  item: Item;
}

const ItemItem = ({ item }: PropTypes) => {
  const { name, price } = item || {};

  return (
    <li>
      <p>Name: {name} </p> <p> Price: £{price}</p>
    </li>
  );
};

export default ItemItem;
