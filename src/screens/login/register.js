import { useState } from "react";
import { Text, SafeAreaView, StyleSheet, TextInput, View, Button } from "react-native";
import user from "../../api/user";

export default function Register({ navigation }) {
  const [username, set_username] = useState('')
  const [password, set_password] = useState('')
  const [confirm_password, set_confirm_password] = useState('')
  const [errors, set_errors] = useState(null)

  const register = () => {
    set_errors(null)
    const new_errors = []
    if (password != confirm_password) {
      new_errors.push("Parolele nu sunt identice")
    }

    if (password.length < 6) {
      new_errors.push("Parola este prea scurtă")
    }

    if (username.length < 4 || username.length > 16) {
      new_errors.push("Numele trebuie să aibă între 4 și 16 caractere")
    }

    if (!username.match(/^[a-z0-9A-Z]+$/)) {
      new_errors.push("Numele nu poate să conțină caractere speciale")
    }

    if (new_errors.length > 0) {
      set_errors([...new_errors])
      return
    }

    user.register({
      username,
      password
    }).then(res => {
      navigation.goBack()
    }).catch(e => {
      console.log(e.response.data)
      set_errors([e.response.data.error])
    })
  }

  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        top: 0, left: 0,
        right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        style={styles.input}
        onChangeText={set_username}
        autoComplete="off"
        placeholder={"Username"}

      />

      <TextInput
        style={styles.input}
        onChangeText={set_password}
        autoComplete="password"
        secureTextEntry={true}
        placeholder={"Parolă"}
      />
      <TextInput
        style={styles.input}
        onChangeText={set_confirm_password}
        autoComplete="password"
        secureTextEntry={true}
        placeholder={"Confirmă parola"}
      />
      <View style={{ marginLeft: 70, marginRight: 70, marginTop: 20, flexDirection: "row" }}>
        <View>
          <Button
            title={"Register"}
            onPress={register}
          />
        </View>
      </View>
      {errors && errors.map(e => {
        return (
          <Text key={Math.random()} style={{ paddingTop: 10 }}>
            {e}
          </Text>
        )
      })
      }
    </SafeAreaView>
  )
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
  },
  error: {
    height: 40,
    marginLeft: 70,
    marginRight: 70,
    paddingTop: 10,
    textAlign: "center",
    color: "red",
    marginTop: 20
  }
});