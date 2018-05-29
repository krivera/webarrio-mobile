import { NavigationActions } from 'react-navigation';
import { navigatorRef } from '../navigation/MainTabNavigator';

const currentRoute = state => {
  if(state.index){
    return currentRoute(state.routes[state.index]);
  }
  else{
    return state;
  }
}

export function handleNotification(data){
  switch(data.kind){
    case 'message':
      state = currentRoute(navigatorRef.state.nav);
      if(state.routeName === 'Chat' && String(state.params.user.id) === String(data.sender.id))
        return {type: ''};
      return dispatch => {
        navigatorRef.dispatch(
          NavigationActions.navigate({
            routeName: 'Chat',
            params: {
              user: {
                id: data.sender.id,
                name: data.sender.name,
                apartments: data.sender.apartments,
                avatar: data.sender.avatar
              }
            }
          })
        );
      }
    default:
      return {};
  }
}
