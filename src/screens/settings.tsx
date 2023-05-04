import withBackground from "../utilities/background"
import GoogleLogin from "../components/googleLogin"

export const SettingsScreen = () => {
  return (
    withBackground(GoogleLogin)
  )
}
