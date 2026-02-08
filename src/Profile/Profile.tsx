import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export const Profile = () => {
  return (
    <SafeAreaView style = {styles.container} />
  )
}
