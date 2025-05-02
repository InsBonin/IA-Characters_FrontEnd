import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_800ExtraBold, useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
// import ChooseParams from './src/components/ChooseParams.jsx';
// import PixelCollector from './src/components/PixelCollector';
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const [message, setMessage] = useState("");

  return (
    // <View style={styles.container}>
    //   {/* <ScrollView style={{ width: '100%', margin: '0 auto' }}>
    //     <FolderCollector />
    //   </ScrollView> */}
    //   {/* <PixelCollector
    //     apiEndpoint={fetchData}
    //   /> */}
    //   {/* <ChooseParams /> */}
    // </View>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
