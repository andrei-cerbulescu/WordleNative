import React, {useState} from 'react';
import { Button } from 'react-native';

const Key = (props) => {
  var color = props.hasPotential ? '#dceb54' : '#2196F3'
  return(
    <Button
      title={props.letter}
      onPress={()=>props.onPress()}
      disabled={props.disabled}
      color={color}
    />
  )
}

export default Key;