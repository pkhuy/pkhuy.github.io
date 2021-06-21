import { CommonActions } from '@react-navigation/native';
import { LOGIN, LOGOUT } from '../constants/index';

export const loginSuccess = ({user, navigation})  =>{
  // const  = useDispatch()
  return (dispatch) => {
        dispatch({
            type: LOGIN,
            payload: user
        });
        
      //  return navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //       actions: [
      //         CommonActions.navigate({
      //               name: 'Unauthorized',
      //           })
      //       ],
      //   })
      // )
    };

  }
export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT,
        });
        
        // const resetNavigator = CommonActions.reset({
        //       index: 0,
        //       actions: [
        //         CommonActions.navigate({
        //             name: 'Unauthorized',
        //         })
        //       ],
        //     })
        //     this.props.navigation.dispatch(resetNavigator);
    }
};
