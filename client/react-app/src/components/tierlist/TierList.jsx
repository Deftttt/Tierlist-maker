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



const TierList = ({ tierListData, onTierListNameChange, onTierNameChange, onItemsOrderChange, onAddTier}) =>  {
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
        //console.log("Active:", active);
        //console.log("Over:", over);
        const overId = over?.id;
    
        if (!overId) {
            //console.log("NIE MA OVERID");
          return;
        }
    
        const activeContainerId = active.data.current.sortable.containerId;
        const overContainerId = over.data.current?.sortable.containerId|| over.id;

        //console.log("activeContainerId:", activeContainerId);
        //console.log("overContainerId:", overContainerId);
        //console.log("EMPTY overContainerId:", over.id); // zle, to jest id itemu
    
        if (!overContainerId) {
          return;
        }
    
        if (activeContainerId !== overContainerId) {
          setTiers((tiers) => {
            //const activeIndex = active.data.current.sortable.index;
            //const overIndex = over.data.current?.sortable.index || 0;

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
        <div>
          {isEditing ? (
        <input
          type="text"
          value={tierlistName}
          onChange={(e) => setTierlistName( e.target.value )}
          onBlur={handleSaveTierListName}
          autoFocus
        />
      ) : (
        <h1 onClick={handleTierListNameClick}>{tierlistName}</h1>
         )}

        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <Container fluid="md">  
            {Object.values(tiers).filter(tier => !tier.isPool).map((tier) => (   
              <Row>
                <Droppable key={tier.tierId} tierlistId={tierListData.id} tierId={tier.tierId} tierName={tier.name} items={tier.items} 
                onTierNameChange={(newName) => onTierNameChange(tier.tierId, newName)}/>
              </Row>
            ))}
          
          </Container>

          {Object.values(tiers).find(tier => tier.isPool) && (
            <Row>
              <Droppable 
                key={poolTier.tierId} 
                tierId={poolTier.tierId} 
                tierName={poolTier.name} 
                items={poolTier.items} 
                onTierNameChange={(newName) => onTierNameChange(poolTier.tierId, newName)}
              />
            </Row>
          )}

        </DndContext>

        <div>
          <Button onClick={handleAddTier}>Add Tier</Button>
        </div>
        
        </div>
      );
    }

export default TierList