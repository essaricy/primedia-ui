import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';

const labels = {
  1: 'Useless',
  2: 'OK!',
  3: 'Good!',
  4: 'Excellent!!',
  5: 'Favorite!!!',
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
export default function Rate(props) {
  const [hover, setHover] = React.useState(-1);
  const { value, readOnly, size, style } = props;
  const classes = useStyles();

  const handleChange = (e, rating) => {
    props.onChange && props.onChange(rating);
  }

  return (
    <div className={classes.root}>
      <Rating
        defaultValue={value}
        icon={<FavoriteIcon fontSize="inherit" />}
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        readOnly={readOnly}
        style={{ fontSize: getSize(size), ...style}}
      />
      {value !== null && !readOnly && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
  );
}