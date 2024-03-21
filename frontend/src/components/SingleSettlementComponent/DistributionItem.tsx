import { Distribution } from "../../types/DistributionTypes";

interface PropTypes {
  distribution: Distribution;
}

const DistributionItem = ({ distribution }: PropTypes) => {
  const { percent, user, item } = distribution || {};

  return (
    <li>
      <p>User: {user.username}</p>
      <p>Item Name: {item.name}</p>
      <p>Percent: {percent.toFixed(2)}</p>
      <p>Payed share: £{((item.price * percent) / 100).toFixed(2)}</p>
    </li>
  );
};

export default DistributionItem;
