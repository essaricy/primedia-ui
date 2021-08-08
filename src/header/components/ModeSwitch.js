import React from 'react';
import Switch from '@material-ui/core/Switch';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

import * as MediaUtil from '../../app/util/MediaUtil';

function ModeSwitch(props) {
  const { mode, onModeChange } = props;

  const toggleMode = (e) => onModeChange(e.target.checked ? MediaUtil.VIDEO : MediaUtil.IMAGE);

  return (
    <React.Fragment>
      <PhotoCamera color="action" /> 
        <Switch color="default" checked={mode === MediaUtil.VIDEO} onChange={toggleMode} />
      <Videocam color="action" />
    </React.Fragment>
  );
}
export default ModeSwitch;
