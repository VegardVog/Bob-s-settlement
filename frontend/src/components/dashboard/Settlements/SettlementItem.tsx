import React from "react";
import { Link } from "react-router-dom";

interface SettlementProps {
  settlement: {
    id: number;
    items: any[];
    name: string;
    owner: {
      email: string;
      id: number;
      username: string;
    };
    participants: Participant[];
    settled: boolean;
  };
}

interface Participant {
  name: string;
  email: string;
  id: number;
}

const SettlementItem: React.FC<SettlementProps> = ({ settlement }) => {
  return (
    <div className="settlementItem">
      <div>
        <h4>{settlement.name}</h4>
      </div>
      <div>
        <p>Participants: {settlement.participants.length}</p>
        <p>Owner: {settlement.owner.username}</p>
        <p>Items: {settlement.items.length}</p>
        {!settlement.settled && <p>Active</p>}
        <Link to={`/settlement/${settlement.id}`}>Go to Settlement</Link>
      </div>
      <div>
        {settlement.participants.map((participant, index) => {
          return <p key={index}>{participant.name}</p>;
        })}
      </div>
    </div>
  );
};

export default SettlementItem;
