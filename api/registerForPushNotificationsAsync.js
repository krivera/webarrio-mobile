import { Constants, Permissions, Notifications } from 'expo';
import { API_URL } from "react-native-dotenv";

// Example server, implemented in Rails: https://git.io/vKHKv


export default (async function registerForPushNotificationsAsync(userId, neighborhood_id, authToken) {
  // Remote notifications do not work in simulators, only on device
  if (!Constants.isDevice) {
    return;
  }

  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  const PUSH_ENDPOINT = `${API_URL}/users/${userId}/device`;
  // POST the token to our backend so we can use it to send pushes from there
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': authToken
    },
    body: JSON.stringify({ token, neighborhood_id }),
  });
});
