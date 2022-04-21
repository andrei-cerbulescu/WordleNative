import { Fragment } from "react/cjs/react.production.min";
import Game from "./game";
import { Text, View, Button, StyleSheet } from "react-native";


export default function HomeScreen({ navigation }) {
  return (
    <View
      style={styles.container}
    >
      <Game />
    </View>


  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
