import { Platform, Picker } from 'react-native'
import { Picker as PickerIOS } from 'react-native-picker-dropdown'

export default Platform.OS === 'ios' ? PickerIOS : Picker
