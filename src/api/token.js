import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthenticationHeader() {
  return new Promise((resolve) => {
    AsyncStorage.getItem('authentication_token')
      .then(token => {
        resolve(token ? {
          headers: { 'Authorization': token }
        } : {}
        )
      }
      )
      .catch(e => {
        console.log(e)
      }
      )
  }
  )
}