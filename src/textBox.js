import React, { useState } from 'react';
import { Button, View } from 'react-native';

const TextBox = (props) => {
  const boxes = []
  for (i = 0; i < props.TotalLength; i++) {
    var color = '#a6a6a6'
    if(props.correctWord){
      if(props.correctWord[i] === props.word[i]){
        color = '#aaee66'
      }
      else{
        if(props.correctWord.includes(props.word[i])){
          color = '#FBBD01'
        }
      }
    }
    boxes.push(
      <View style={{ padding: 1.5, height: 60, width: 30 }} key={Math.random()}>
      <Button  
        title={props.word[i] ? props.word[i] : ''}
        color={color}
      />
      </View>)
  }
  return (
    <View style={{ flexDirection: 'row'}}>
      {boxes}
    </View>
  )
}

export default TextBox;