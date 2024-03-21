import { Distribution } from "../../types/DistributionTypes";
import { Item } from "../../types/ItemTypes";

interface PropTypes {
  distributions: Distribution[];
}

const ItemsWithDistributions = ({ distributions }: PropTypes) => {
  const filteredArray = [];
  for (const distribution of distributions) {
  }

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default ItemsWithDistributions;
