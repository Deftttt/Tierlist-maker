import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

/*
export const removeAtIndex = (array, index) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};


export const insertAtIndex = (array, index, item) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (array, oldIndex, newIndex) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};

*/




export const removeAtIndex = (tier, index) => {
  console.log("REMOVE AT ", tier, index);
  
  return {
    ...tier,
    items: [
      ...tier.items.slice(0, index),
      ...tier.items.slice(index + 1)
    ]
  };
};

export const insertAtIndex = (tier, index, item) => {
  return {
    ...tier,
    items: [
      ...tier.items.slice(0, index),
      item,
      ...tier.items.slice(index)
    ]
  };
};




export const arrayMove = (tier, oldIndex, newIndex) => {
  // Sprawdź, czy zmienna tier jest obiektem z właściwością 'items' będącą tablicą
  if (!tier || !tier.items || !Array.isArray(tier.items)) {
    throw new Error('arrayMove: Oczekiwano obiektu tier z właściwością items będącą tablicą');
  }

  // Skorzystaj bezpośrednio z metody slice na tablicy items
  const newItems = tier.items.slice();
  if (oldIndex >= newItems.length || newIndex >= newItems.length) {
    throw new Error('arrayMove: Przekroczono indeks tablicy');
  }

  // Przesuń elementy w nowej tablicy items
  newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);

  // Zwróć nowy obiekt tier z zaktualizowaną tablicą items
  return {
    ...tier,
    items: newItems,
  };
};




/*

export const arrayMove = (array, oldIndex, newIndex) => {
  // Sprawdź, czy zmienna array jest tablicą
  if (!Array.isArray(array)) {
    throw new Error('arrayMove: Oczekiwano tablicy jako pierwszy argument');
  }

  // Skorzystaj bezpośrednio z metody slice na tablicy
  const newArray = array.slice();
  if (oldIndex >= newArray.length || newIndex >= newArray.length) {
    throw new Error('arrayMove: Przekroczono indeks tablicy');
  }

  // Przesuń elementy w nowej tablicy
  newArray.splice(newIndex, 0, newArray.splice(oldIndex, 1)[0]);

  return newArray;
}







export const arrayMove = (array, oldIndex, newIndex) => {
  if (oldIndex === newIndex) {
    return array;
  }

  const newArray = [...array];
  const [removed] = newArray.splice(oldIndex, 1);
  newArray.splice(newIndex, 0, removed);

  return newArray;
};
*/