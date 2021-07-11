import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import CameraEnhance from '@material-ui/icons/CameraEnhance';

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

export default function Quality(props) {
  const [hover, setHover] = React.useState(-1);
  const { value, style } = props;
  const classes = useStyles();

  const handleChange = (e, quality) => {
    props.onChange && props.onChange(quality);
  }

  return (
    <div className={classes.root} style={style}>
      <Rating size="small"
        value={value}
        max={4}
        icon={<CameraEnhance fontSize="inherit" />}
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>

  );
}