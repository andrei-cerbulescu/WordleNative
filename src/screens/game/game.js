import Keyboard from "./keyboard";
import TextBox from "../parts/textBox";
import React, { useEffect, useState } from 'react';
import { Fragment } from "react/cjs/react.production.min";
import { Text, View, Button } from "react-native";
import words from "../../api/words";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Game(props) {
  const [secret_word, setSecret_word] = useState('______')
  useEffect(() => {
    generateWord();
    AsyncStorage.getItem('username').then(username => {
      set_username(username)
    })
  })

  const [username, set_username] = useState('')
  const [history, setHistory] = useState(Array(5).fill(''))
  const [curentIteration, setCurentIteration] = useState(0)

  const generateWord = () => {
    words.random_word().then(res => {
      setSecret_word(res.data.word)
    }).catch(e => {
      console.log(e)
    })
  }

  const pushHistory = (word) => {
    var temp_history = [...history]
    temp_history[curentIteration] = word
    setCurentIteration(curentIteration + 1)
    setHistory(temp_history)
  }

  const restartGame = () => {
    setHistory(Array(5).fill(''))
    generateWord()
    setCurentIteration(0)
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authentication_token')
      props.navigation.navigate('Home', {})
    }
    catch (e) {
      console.log(e)
    }


  }

  const historyBoxes = history.map(elem => {
    return (
      <View
        key={Math.random()}
      >
        <TextBox
          TotalLength={secret_word.length}
          correctWord={secret_word}
          word={elem}
        />
      </View>
    )
  })

  return (
    <Fragment>
      <View
        style={{
          position: 'absolute',
          left: 15,
          top: 15,
        }}
      >
        <Button
          onPress={() => restartGame()}
          title="Restart"
        />
      </View>

      <View
        style={{
          position: 'absolute',
          right: 15,
          top: 15,
        }}
      >
        <Button
          onPress={() => logout()}
          title="Logout"
        />
      </View>
      {history.includes(secret_word) &&
        <Fragment>
          <Text>Ai castigat!</Text>
          <Text>Cuvantul era: {secret_word}</Text>
          <Button
            title={"Reporneste"}
            onPress={(() => restartGame())}
          />
        </Fragment>
      }
      {!history.includes(secret_word) && curentIteration >= history.length &&
        <Fragment>
          <Text>Ai pierdut!</Text>
          <Text>Cuvantul era: {secret_word}</Text>
          <Button
            title={"Reporneste"}
            onPress={(() => restartGame())}
          />
        </Fragment>
      }
      {!((!history.includes(secret_word) && curentIteration >= history.length) || history.includes(secret_word)) && <Fragment>
        {historyBoxes}
        <Keyboard
          word={secret_word}
          pushHistory={pushHistory}
        />
      </Fragment>}
      <Text>Hello {username}</Text>
    </Fragment>
  )
}

export default Game;