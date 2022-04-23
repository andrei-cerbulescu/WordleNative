import { View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from "react-native";
import words from "../../api/words";
import { useState } from "react";

export default function RateWord(props) {
  const [disable_rating, set_disable_rating] = useState(false)

  const rate = (rating) => {
    console.log({
      rating,
      id: props.word_id
    })
    words.rate_word({
      rating,
      word_id: props.word_id
    }).then(res => {
      set_disable_rating(true)
    })
  }

  return (
    <View>
      {!disable_rating && <View style={{
        flexDirection: 'row',
        paddingTop: 30
      }}>
        <MaterialIcons
          onPress={() => { rate(-1) }}
          style={{ paddingRight: 10, color: "#108EE9" }}
          name="thumb-down-off-alt"
          size={48}
        />
        <Text>Ți-a plăcut acest cuvânt?</Text>
        <MaterialIcons
          onPress={() => { rate(1) }}
          style={{ paddingLeft: 10, color: "#108EE9" }}
          name="thumb-up-off-alt"
          size={48}
        />
      </View>}

      {disable_rating && <View style={{
        flexDirection: 'row',
        paddingTop: 30
      }}>
        <Text>Mulțumim pentru răspuns</Text>
      </View>}

    </View>
  )
}