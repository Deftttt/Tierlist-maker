import {React, useState} from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "../Item/Item";
import { getGradientColor } from '../../utils/gradientColors';
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
    border: "0.5px solid #ccc",
    borderRadius: "5px",
    minHeight: "160px",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
  };


  return (
    <SortableContext id={tierId} items={items} strategy={horizontalListSortingStrategy}>
      <Container ref={setNodeRef} style={tierStyle} className="d-flex flex-wrap m-0 p-0">
        <Row className="w-100 m-0 p-0">
          {editedTierName && (
            <Col xs={2} className="d-flex align-items-center justify-content-center m-0 p-0" style={{ backgroundColor: getGradientColor(tierId), borderRadius: '5px' }}>
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
            </Col>
          )}
          <Col xs={editedTierName ? 10 : 12} className="d-flex flex-wrap m-0 p-0 align-items-center">
            {Object.values(items).map((item) => (
              <SortableItem key={item.itemId} tierlistId={tierlistId} id={item.itemId} itemName={item.name} image={item.image} />
            ))}
          </Col>
        </Row>
      </Container>
    </SortableContext>
  );
  
};

export default Tier;
