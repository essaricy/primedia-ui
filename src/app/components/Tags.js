import React from 'react';
import Chip from '@material-ui/core/Chip';
import ChipInput from "material-ui-chip-input";

export default function Tags(props) {
  return (
    <ChipInput value={props.value}
      disableUnderline
      chipRenderer={({ text, handleDelete }, key) => {
        return <Chip key={key} size="small" label={text.trim()}
          style={{ marginRight: 5 }}
          onDelete={handleDelete} />;
      }}
      style={{ maxHeight: 30 }}
      onAdd={props.onAdd}
      onDelete={props.onDelete} />
  );
}