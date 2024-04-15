import React, { useState, useEffect } from "react";
import {
DndContext,
KeyboardSensor,
PointerSensor,
useSensor,
useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./TierRow";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../utils/array";
import { Button, Container, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';



const TierList = ({ tierListData, onTierListNameChange, onTierNameChange, onItemsOrderChange, onAddTier, onDeleteTier}) =>  {
    const [tiers, setTiers] = useState(tierListData.tiers);
    const [tierlistName, setTierlistName] = useState(tierListData.name);
    const [isEditing, setIsEditing] = useState(false);
    
      const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

      const handleTierListNameClick = () => {
        setIsEditing(true);
      };
    
      const handleSaveTierListName = () => {
        onTierListNameChange(tierlistName)
        setIsEditing(false);
      };  
      
      
      useEffect(() => {
        setTiers(tierListData.tiers);
      }, [tierListData.tiers]);


      useEffect(() => {
        onItemsOrderChange(tiers);
      }, [tiers]);
    
      
      
      const handleAddTier = () => {
        onAddTier(tierListData.id, "Nowy Tier");
      }
      

      const handleDragOver = ({ over, active }) => {
        const overId = over?.id;
    
        if (!overId) {
          return;
        }
    
        const activeContainerId = active.data.current.sortable.containerId;
        const overContainerId = over.data.current?.sortable.containerId|| over.id;

    
        if (!overContainerId) {
          return;
        }
    
        if (activeContainerId !== overContainerId) {
          setTiers((tiers) => {

            const activeIndex = findIndexByTierId(tiers, activeContainerId);
            const overIndex = findIndexByTierId(tiers, overContainerId);
    
            return moveBetweenContainers(
                tiers,
              activeContainerId,
              activeIndex,
              overContainerId,
              overIndex,
              active.id
            );
          });
        }
      };

    
      const handleDragEnd = ({ active, over }) => {
        if (!over) {
          return;
        }
        
    
        if (active.id !== over.id) {
          const activeContainerId = active.data.current.sortable.containerId;
          const overContainerId = over.data.current?.sortable.containerId || over.id;

          const activeIndex = findIndexByTierId(tiers, activeContainerId);
          const overIndex = findIndexByTierId(tiers, overContainerId);

          const itemIndexA = active.data.current.sortable.items.findIndex(item => item.itemId === active.id);
          const itemIndexO = over.data.current.sortable.items.findIndex(item => item.itemId === over.id);
          
          setTiers((tiers) => {
            let newTiers;
            if (activeContainerId === overContainerId) {
              newTiers = {
                ...tiers,
                [overIndex]: arrayMove(
                    tiers[overIndex],
                    itemIndexA,
                    itemIndexO
                ),
              };
            } else {
              newTiers = moveBetweenContainers(
                tiers,
                activeContainerId,
                activeIndex,
                overContainerId,
                overIndex,
                active.id
              );
            }

    
            return newTiers;
          });
        }
      };


      const findIndexByTierId = (tiers, targetTierId) => {
        const tierIds = Object.keys(tiers);
        for (let i = 0; i < tierIds.length; i++) {
          const tierId = tierIds[i];
          if (tiers[tierId].tierId === targetTierId) {
            return i;
          }
        }
        return -1;
      };
    
      const moveBetweenContainers = (
        tiers,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        itemId
      ) => {
        const tierIndexA = findIndexByTierId(tiers, activeContainer);
        const tierIndexO = findIndexByTierId(tiers, overContainer);

        const item = tiers[tierIndexA].items.find(item => item.itemId === itemId);
        const itemIndex = tiers[tierIndexA].items.findIndex(item => item.itemId === itemId);

        return {
          ...tiers,
          [tierIndexA]: removeAtIndex(tiers[tierIndexA], itemIndex),
          [tierIndexO]: insertAtIndex(tiers[tierIndexO], 0, item),
        };
      };
    
      return (
        <Container>
          {isEditing ? (
            <input
              type="text"
              value={tierlistName}
              onChange={(e) => {
                if (e.target.value.length <= 40 && e.target.value.length > 0) {
                  setTierlistName(e.target.value);
                }
              }}
              onBlur={handleSaveTierListName}
              autoFocus
              className="mb-3"
            />
          ) : (
            <h1 onClick={handleTierListNameClick} className="mb-3">{tierlistName}</h1>
          )}
      
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <Container fluid="md" className="p-3">  
              {Object.values(tiers).filter(tier => !tier.pool).map((tier) => (   
                <Row className="mb-3">
                  <Droppable key={tier.tierId} tierlistId={tierListData.id} tierId={tier.tierId} tierName={tier.name} items={tier.items} 
                  onTierNameChange={(newName) => onTierNameChange(tier.tierId, newName)}
                  onTierDeleteClicked={(tierId) => onDeleteTier(tierId)}/>
                </Row>
              ))}
      
              {Object.values(tiers).filter(tier => tier.pool).map((tier) => (   
                <Row className="mb-3">
                  <Droppable key={tier.tierId} tierlistId={tierListData.id} tierId={tier.tierId}  items={tier.items} 
                  onTierNameChange={(newName) => onTierNameChange(tier.tierId, newName)}
                  onTierDeleteClicked={(tierId) => onDeleteTier(tierId)}/>
                </Row>
              ))}
            </Container>
          </DndContext>
      
          <div className="d-flex justify-content-center mb-4">
            <Button onClick={handleAddTier} size="lg" className="rounded-pill px-4">
              <Plus className="mb-1" /> Add new tier
            </Button>
          </div>
      
        </Container>
      );
    }

export default TierList