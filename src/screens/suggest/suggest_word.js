import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import words from "../../api/words";

export default function SuggestWord(props) {
  const [word, set_word] = useState('')
  const [message, set_meassage] = useState(null)
  const [error, set_error] = useState(null)

  const sugereaza = () => {
    words.suggest_word({ "word": word }).then(res => {
      set_meassage("Cuvântul a fost adăugat cu succes!")
      setTimeout(() => {
        props.navigation.goBack()
      }, 5000)
    }).catch(e => {
      set_error(e.response.data.error)
    })
  }
  if (!message)
    return (
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0,
          right: 0, bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={styles.input}
          onChangeText={set_word}
          autoComplete="off"
          placeholder={"Introdu cuvântul"}

        />
        {error && <Text style={{ color: 'red', marginLeft: 70, marginRight: 70, marginTop: 50 }}>{error}</Text>}
        <View
          style={{ marginLeft: 70, marginRight: 70, marginTop: 50 }}>
          <Button
            title={"Sugerează"}
            onPress={sugereaza}
          />
        </View>

      </View>
    )
  else {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0,
          right: 0, bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'green' }}>Cuvântul a fost adăugat cu succes!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginLeft: 70,
    marginRight: 70,
    borderWidth: 1,
    paddingTop: 10,
    textAlign: "center",
    width: 250,
    marginTop: 20
  }
})