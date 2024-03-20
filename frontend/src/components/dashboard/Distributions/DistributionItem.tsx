interface Settlement {
  id: number;
  name: string;
  owner: {
    id: number;
    username: string;
    email: string;
  };
  participants: {
    id: number;
    username: string;
    email: string;
  }[];
  items: {
    id: number;
    name: string;
    price: number;
  }[];
  settled: boolean;
}

interface Item {
  id: number;
  name: string;
  price: number;
  addedBy: {
    id: number;
    username: string;
    email: string;
  };
  settlement: Settlement;
}

interface Distribution {
  id: number;
  percent: number;
  item: Item;
}

interface User {
  id: number;
  username: string;
  email: string;
  roles: {
    id: number;
    name: string;
  }[];
  distributions: Distribution[];
}

interface JSONData {
  distribution: {
    id: number;
    percent: number;
    item: Item;
    user: User;
  };
}

const DistributionItem: React.FC<JSONData> = ({ distribution }) => {
  return (
    <div className="distributionItem">
      <span>
        <h4>{distribution.item.name}</h4>
      </span>
      <span>
        <p>${distribution.item.price}</p>
      </span>
      <span>
        <p>{distribution.percent.toFixed(2)}%</p>
      </span>
      <span>
        <p>{distribution.item.settlement.name}</p>
      </span>
    </div>
  );
};

export default DistributionItem;
