/**
*
* LocaleToggle
*
*/

import React from 'react';

import Select from './Select';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
  return (
    <Select value={props.value} onChange={props.onToggle}>
    </Select>
  );
}

Toggle.propTypes = {
  onToggle: React.PropTypes.func,
  values: React.PropTypes.array,
  value: React.PropTypes.string,
  messages: React.PropTypes.object,
};

export default Toggle;
