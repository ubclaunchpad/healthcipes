import { Alert } from 'react-native';

export default function Alerts(alertVisible, text) {

  return alertVisible ? Alert.alert(
    "Error",
    text
  ) : null;

}
