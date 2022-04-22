import { Fragment } from "react/cjs/react.production.min";
import Game from "./game/game";
import { Text, View, Button, StyleSheet } from "react-native";
import { useState } from "react";
import user from "../api/user";
import IndexLogin from "./login";



export default function HomeScreen({ navigation }) {
  user.get_current_user().then(res => {
    navigation.navigate('IndexGame', {})
  }).catch(err => {
    navigation.navigate('IndexLogin', {})
  })
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}