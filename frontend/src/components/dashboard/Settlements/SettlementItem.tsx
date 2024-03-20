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
        <p>
          <strong>Participants:</strong> {settlement.participants.length}
        </p>
        <p>
          <strong>Owner:</strong> {settlement.owner.username}
        </p>
        <p>
          <strong>Items:</strong> {settlement.items.length}
        </p>
        {!settlement.settled && (
          <p>
            <strong>Active</strong>
          </p>
        )}
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
