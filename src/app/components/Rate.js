import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
export default function Rate(props) {
  const { value, readOnly, size, style } = props;
  const classes = useStyles();

  const handleChange = (e, rating) => {
    rating && props.onChange && props.onChange(rating);
  }

  return (
    <div className={classes.root}>
      <Rating
        defaultValue={value}
        readOnly={readOnly}
        icon={<FavoriteIcon fontSize="inherit" />}
        style={{ fontSize: getSize(size), color: "#ff5cad", ...style}}
        onChange={handleChange}
      />
    </div>
  );
}