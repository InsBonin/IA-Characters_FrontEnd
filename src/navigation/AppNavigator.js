import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChooseParams from '../components/ChooseParams';
import CollectorZip from '../components/CollectorZip';
import FolderCollector from '../components/FolderCollector';
import ParamsCNN from '../components/ParamsCNN';
import PixelCollector from '../components/PixelCollector';
import ProgressBar from '../components/ProgressBar';
import ClassificarCNN from '../screens/ClassificarCNN';
import FinalScreen from '../screens/FInalScreen';
import HomeScreen from '../screens/HomeScreen';
import UploadImage from '../screens/UploadImage';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CollectorZip" component={CollectorZip} />
            <Stack.Screen name="FolderCollector" component={FolderCollector} />
            <Stack.Screen name="ChooseParams" component={ChooseParams} />
            <Stack.Screen name="PixelCollector" component={PixelCollector} />
            <Stack.Screen name="ProgressBar" component={ProgressBar} />
            <Stack.Screen name="UploadImage" component={UploadImage} />
            <Stack.Screen name="ParamsCNN" component={ParamsCNN} />
            <Stack.Screen name="ClassificarCNN" component={ClassificarCNN} />
            <Stack.Screen name="FinalScreen" component={FinalScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
