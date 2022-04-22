import { View, StyleSheet } from "react-native";
import Game from "./game";

export default function IndexGame({ navigation }) {
  return (
    <View
      style={styles.container}>
      <Game
        navigation={navigation}
      />
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