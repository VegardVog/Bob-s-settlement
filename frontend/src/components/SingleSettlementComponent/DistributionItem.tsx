import { Distribution } from "../../types/DistributionTypes";

interface PropTypes {
  distribution: Distribution;
}

const DistributionItem = ({ distribution }: PropTypes) => {
  const { percent, user, item } = distribution || {};

  return (
    <li>
      <p>Percent: {percent}</p>
      <p>User: {user.email}</p>
      <p>Item Name: {item.name}</p>
      <p>Item Price: £{item.price}</p>
    </li>
  );
};

export default DistributionItem;
