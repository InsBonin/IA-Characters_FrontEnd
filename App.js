import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_800ExtraBold, useFonts } from "@expo-google-fonts/poppins";
import { StyleSheet, View } from 'react-native';
import PixelCollector from './src/components/PixelCollector';
// import FolderCollector from './src/components/FolderCollector';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ width: '100%', margin: '0 auto' }}>
        <FolderCollector />
      </ScrollView> */}
      <PixelCollector
        characterName="Personagem X"
        imageUrl="https://images.unsplash.com/photo-1745500415839-503883982264?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

    </View>
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
