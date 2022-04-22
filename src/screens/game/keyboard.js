import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Fragment } from 'react/cjs/react.production.min';
import Key from './key';
import TextBox from '../parts/textBox';

const Keyboard = (props) => {
  const [typedWord, setCurentWord] = useState('')
  const addLetter = (letter) => {
    if (typedWord.length < props.word.length) {
      setCurentWord(typedWord + letter)
    }
  }

  const removeLetter = () => {
    setCurentWord(typedWord.slice(0, -1))
  }

  const submitWord = () => {
    var temp_letters = letters
    temp_letters.forEach(row => {
      row.forEach(element => {
        if (typedWord.includes(element.letter)) {
          if (!props.word.includes(element.letter)) {
            element.disabled = true
          }
          else {
            element.has_potential = true
          }
        }
      });
    });
    setLetters(temp_letters)
    props.pushHistory(typedWord)
    setCurentWord('')
  }

  let existing_letters = [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"], ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ș", "ț"], ["z", "x", "c", "v", "b", "n", "m", "ă", "î", "â"]]
  const [letters, setLetters] = useState(
    existing_letters.map(row => {
      return row.map(elem => {
        return ({
          letter: elem,
          disabled: false,
          has_potential: false
        })
      })
    })
  )
  var letterButtons = letters.map(row => {
    return (
      <View style={{ flexDirection: 'row' }} key={Math.random()}>
        {row.map(elem => {
          return (
            <View
              style={{ padding: 3 }}
              key={Math.random()}
            >
              <Key
                letter={elem.letter}
                disabled={elem.disabled}
                onPress={() => addLetter(elem.letter)}
                hasPotential={elem.has_potential}
              />
            </View>
          )

        })}
      </View>
    )
  });

  letterButtons.push(
    <View style={{ flexDirection: 'row' }} key={Math.random()}>
      <View style={{ padding: 3 }}>
        <Key
          letter={'Delete'}
          disabled={false}
          onPress={() => removeLetter()}
        />
      </View>
      <View style={{ padding: 3 }} key={Math.random()}>
        <Key
          letter={'Submit'}
          disabled={typedWord.length !== props.word.length}
          onPress={() => submitWord()}
        />
      </View>
    </View>
  )

  return (
    <Fragment>
      <View>
        <TextBox
          word={typedWord}
          TotalLength={props.word.length}
        />
      </View>
      <View>
        {letterButtons}
      </View>
    </Fragment>
  )

}

export default Keyboard;