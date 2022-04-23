import { Text, View } from "react-native";
import user from "../api/user";



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