import React, {AppRegistry, Navigator, StyleSheet, Text, View, BackAndroid, ToastAndroid} from 'react-native'
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} from 'react-native-router-flux'
import MovieList from './components/MovieList'
import MovieScreen from './components/MovieScreen'

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        return defaultReducer(state, action);
    }
};

const scenes = Actions.create(
    <Scene key="modal" component={Modal} >
        <Scene key="root" hideNavBar={true}>
            <Scene key="movie_list" component={MovieList} title="Movie List" initial={true} style={{flex:1, backgroundColor:'transparent'}}/>
            <Scene key="movie_screen" component={MovieScreen} title="Movie Screen" style={{flex:1, backgroundColor:'transparent'}}/>                    
        </Scene>
    </Scene>
);

class ReactNativeTraining extends React.Component {

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            try {
                Actions.pop();
                return true;
            }
            catch (err) {
                ToastAndroid.show(err.message, ToastAndroid.SHORT);
                return false;
            }
        });
    }


    render() {
        return <Router createReducer={reducerCreate} scenes={scenes} sceneStyle={{backgroundColor:'#F7F7F7'} }>

        </Router>;
    }
}

AppRegistry.registerComponent('ReactNativeTraining', () => ReactNativeTraining);