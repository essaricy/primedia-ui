import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
  const { value, readOnly, size, style } = props;
  const classes = useStyles();

  const handleChange = (e, quality) => {
    quality && props.onChange && props.onChange(quality?quality:3);
  }

  return (
    <div className={classes.root} style={style}>
      <Rating
        max={4}
        defaultValue={value}
        readOnly={readOnly}
        icon={<PhotoCamera fontSize="inherit" />}
        style={{ fontSize: getSize(size), color: "#8db600", ...style}}
        onChange={handleChange}
      />
    </div>

  );
}