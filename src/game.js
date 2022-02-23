import Keyboard from "./keyboard";
import TextBox from "./textBox";
import React, { useState } from 'react';
import { Fragment } from "react/cjs/react.production.min";
import { Text, View, Button } from "react-native";
import cuvantAleator from "./cuvantAleator";

function Game() {
  const [secret_word, setSecret_word] = useState(cuvantAleator())

  const [history, setHistory] = useState(Array(5).fill(''))
  const [curentIteration, setCurentIteration] = useState(0)

  const pushHistory = (word) => {
    var temp_history = [...history]
    temp_history[curentIteration] = word
    setCurentIteration(curentIteration + 1)
    setHistory(temp_history)
  }

  const restartGame = () => {
    setHistory(Array(5).fill(''))
    setSecret_word(cuvantAleator())
    setCurentIteration(0)
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
    </Fragment>
  )
}

export default Game;