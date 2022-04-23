import Keyboard from "./keyboard";
import TextBox from "../parts/textBox";
import React, { useEffect, useState } from 'react';
import { Fragment } from "react/cjs/react.production.min";
import { Text, View, Button } from "react-native";
import words from "../../api/words";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RateWord from "./rate";

function Game(props) {
  const [secret_word, setSecret_word] = useState('______')
  const [word_id, set_word_id] = useState(0)
  useEffect(() => {
    generateWord();
    AsyncStorage.getItem('username').then(username => {
      set_username(username)
    })
  }, [])

  const [username, set_username] = useState('')
  const [keyboard_key, set_keyboard_key] = useState(1)
  const [history, setHistory] = useState(Array(5).fill(''))
  const [curentIteration, setCurentIteration] = useState(0)
  const [rating, set_rating] = useState(0)

  const generateWord = () => {
    words.random_word().then(res => {
      setSecret_word(res.data.word)
      set_word_id(res.data.id)
      set_rating(res.data.rating)
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
    set_keyboard_key(keyboard_key + 1)
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
          <RateWord
            word_id={word_id}
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
          <RateWord />
        </Fragment>
      }
      {!((!history.includes(secret_word) && curentIteration >= history.length) || history.includes(secret_word)) && <Fragment>
        <Text
          style={{ paddingBottom: 25 }}
        >Acest cuvânt are un rating de {rating}%</Text>
        {historyBoxes}
        <Keyboard
          key={keyboard_key}
          word={secret_word}
          pushHistory={pushHistory}
        />
      </Fragment>}
      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: 35
        }}
      >
        <Button
          title={"Sugerează un cuvânt"}
          onPress={() => props.navigation.navigate('SuggestWord', {})}
        />
      </View>

    </Fragment>
  )
}

export default Game;