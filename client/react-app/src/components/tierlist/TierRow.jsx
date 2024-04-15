import {React, useState} from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "../Item/Item";
import { getGradientColor } from '../../utils/gradientColors';
import { Container, Col, Row, Button } from "react-bootstrap";
import { Trash } from 'react-bootstrap-icons';


const Tier = ({ tierlistId, tierId, tierName, items, onTierNameChange, onTierDeleteClicked}) => {
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

  const handleTierDelete = () => {
    onTierDeleteClicked(tierId);
  }


  const tierStyle = {
    padding: "10px",
    margin: "10px 20px",  
    border: "0.5px solid #ccc",
    borderRadius: "5px",
    minHeight: "160px",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
  };


  return (
    <>
    <SortableContext id={tierId} items={items} strategy={horizontalListSortingStrategy}>

        <Container ref={setNodeRef} style={tierStyle} className="d-flex flex-wrap m-0 p-0">

          <Row className="w-100 m-0 p-0">
            {editedTierName && (
              <Col xs={2} className="d-flex align-items-center justify-content-center m-0 p-0" style={{ backgroundColor: getGradientColor(tierId), borderRadius: '5px' }}>

                {isEditing ? (
                  <input
                    type="text"
                    value={editedTierName}
                    onChange={(e) => {
                      if (e.target.value.length <= 40 && e.target.value.length > 0) {
                        setEditedTierName(e.target.value);
                      }
                    } }
                    onBlur={handleSaveTierName}
                    autoFocus
                    style={{ padding: '0 10px' }} />
                ) : (
                  <h6 onClick={handleTierNameClick} style={{ wordWrap: 'break-word', overflow: 'hidden', padding: '0 10px' }}>{editedTierName}</h6> // Add this style
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
      <Button
        variant="outline-danger"
        onClick={handleTierDelete}
        style={{ width: '100px', margin: '0 auto', display: 'block' }}>
        <Trash />
      </Button>
      </>
  );
  
};

export default Tier;
