import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles((theme) => ({
  chipInput: {
    paddingTop: 4,
    paddingLeft: 4,
    backgroundColor: '#F0F0F0'
  },
  chip: {
    marginRight: 5,
    marginBottom: 4,
    backgroundColor: "white",
    color: '#6D6A6A'
  },
  
}));
export default function Tags(props) {
  const classes = useStyles();

  return (
    <ChipInput value={props.value}
      disableUnderline
      chipRenderer={({ text, handleDelete }, key) => {
        return (
        <Chip key={key} label={text.trim()}
          variant="outlined"
          color="primary"
          size="small"
          color="primary"
          className={classes.chip}
          onDelete={handleDelete} />
        );
      }}
      className={classes.chipInput}
      onAdd={props.onAdd}
      onDelete={props.onDelete} />
  );
}