import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import user from "../../api/user";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexLogin({ navigation }) {
  const [username, set_username] = useState('')
  const [password, set_password] = useState('')
  const [error, set_error] = useState(null)

  const login = async () => {
    user.login({ "username": username, "password": password })
      .then(res => {
        try {
          AsyncStorage.setItem('authentication_token', res.data.token)
          AsyncStorage.setItem('username', res.data.username)
          navigation.navigate('Home', {})
        }
        catch (e) {
          console.log(e)
        }
      })
      .catch(e => {
        set_error(e)
      })
  }
  return (
    <SafeAreaView>
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
        placeholder={"Password"}
      />

      <View style={{ marginLeft: 70, marginRight: 70 }}>
        <Button
          title={"Login"}
          onPress={login}
        />
      </View>
      {error &&
        <Text
          style={styles.error}
        >
          Username sau parolă greșită
        </Text>
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
    textAlign: "center"
  },
  error: {
    height: 40,
    marginLeft: 70,
    marginRight: 70,
    paddingTop: 10,
    textAlign: "center",
    color: "red"
  }
});