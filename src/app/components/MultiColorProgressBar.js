import React from 'react';
import './MultiColorProgressBar.css';

const TYPES = [
	{ label: 'Success', field: 'success', color: '#52BE80' },
	{ label: 'Skipped', field: 'skipped', color: '#F4D03F' },
  { label: 'Failed', field: 'failed', color: '#CD6155' },
  { label: 'Remaining', field: 'remaining', color: '#E5E7E9' }
];

function MultiColorProgressBar(props) {

  const { values } = props;
  const { success, skipped, failed, total } = values;

  const getPercentage = (field) => {
    const value = field === 'remaining' ? total - success - skipped - failed : values[field];
    return total == 0 ? 0 : ((value/total) * 100 | 0);
  }

  const getBar = (field) => {
    const color = TYPES.find(t => t.field === field).color;
    const perc = getPercentage(field);
    return ( perc == 0 ? "" :
      <div key={`${field}_bar`} className="bar"
        style={{'backgroundColor': color, 'width': perc + '%'}}>
      </div>
    );
  }

  const getVal = (field) => {
    const color = TYPES.find(t => t.field === field).color;
    const perc = getPercentage(field);
    return ( perc == 0 ? "" :
      <div key={`${field}_Val`} className="value"
        style={{'color': color, 'width': perc + '%'}}>
        <span>{perc}%</span>
      </div>
    );
  }

  return (
    <div className="multicolor-bar" style={{width: '100%'}}>
      <div className="values">
        { TYPES.map((type) => getVal(type.field))}
      </div>
      <div className="bars">
        { TYPES.map((type) => getBar(type.field))}
      </div>
      <div className="legends">
        { TYPES.map((type) => 
          <div className="legend" key={`Legend_${type.name}`}>
            <span className="dot" style={{ color: type.color }}>●</span>
            <span className="label">{type.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default MultiColorProgressBar;
