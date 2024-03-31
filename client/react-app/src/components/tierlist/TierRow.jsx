import {React, useState} from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "../Item/Item";
import { Container, Col, Row } from "react-bootstrap";

const Tier = ({ tierlistId, tierId, tierName, items, onTierNameChange  }) => {
  const { setNodeRef } = useDroppable({ id: tierId });
  const [isEditing, setIsEditing] = useState(false);
  const [editedTierName, setEditedTierName] = useState(tierName);

  const handleTierNameClick = () => {
    setIsEditing(true);
  };

  const handleSaveTierName = () => {
    onTierNameChange(editedTierName);
    setIsEditing(false);
  };


  const tierStyle = {
    padding: "10px",
    margin: "10px 20px",  
    border: "1px solid red",
    borderRadius: "5px",
    minHeight: "120px",
  };


  return (
    <SortableContext id={tierId} items={items} strategy={horizontalListSortingStrategy}>
      <Container ref={setNodeRef} style={tierStyle} className="d-flex flex-wrap align-items-center">
        {isEditing ? (
          <input
            type="text"
            value={editedTierName}
            onChange={(e) => setEditedTierName(e.target.value)}
            onBlur={handleSaveTierName}
            autoFocus
          />
        ) : (
          <h6 onClick={handleTierNameClick}>{editedTierName}</h6>
        )}
        {Object.values(items).map((item) => (
          <SortableItem key={item.itemId} tierlistId={tierlistId} id={item.itemId} itemName={item.name} image={item.image} />
        ))}
      </Container>
    </SortableContext>
    
  );
};

export default Tier;
