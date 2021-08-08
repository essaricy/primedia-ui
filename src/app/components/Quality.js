import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const labels = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'HD'
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});
function getSize(size) {
  if (size === "xs") {
    return 12;
  }
  return 18;
}
export default function Quality(props) {
  const [hover, setHover] = React.useState(-1);
  const { value, size, noLabel, style } = props;
  const classes = useStyles();

  const handleChange = (e, quality) => {
    props.onChange && props.onChange(quality);
  }

  return (
    <div className={classes.root} style={style}>
      <Rating size="small"
        value={value}
        max={4}
        icon={<PhotoCamera fontSize="inherit" />}
        style={{ fontSize: getSize(size), color: "#34D80B"}}
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      { !noLabel && value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>

  );
}