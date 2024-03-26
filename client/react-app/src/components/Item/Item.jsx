import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./style.css";

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const url = `http://localhost:8080/images/${props.tierlistId}/${props.image}`;

  return (
    <div
      className="sortable-item"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
    >
      <div className="item-image-wrapper">
        {props.image && <img className="item-image" src={url} alt="Photo" />}
      </div>
      <div className="item-text">{props.itemName}</div>
    </div>
  );
};

export default SortableItem;
