

export const grid = 8;

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 ${grid}px 0 0`,
    marginBottom: 20,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

 export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list.images);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };