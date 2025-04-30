import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_800ExtraBold, useFonts } from "@expo-google-fonts/poppins";
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
// import ChooseParams from './src/components/ChooseParams.jsx';
import PixelCollector from './src/components/PixelCollector';
import api from "./src/services/api";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get('get-url-image');
      setMessage(response.data.message);
      return response.data; // você pode retornar os dados se quiser usar no PixelCollector
    } catch (err) {
      //console.error('Erro ao conectar com a API:', err);
      throw err;
    }
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ width: '100%', margin: '0 auto' }}>
        <FolderCollector />
      </ScrollView> */}
      <PixelCollector
        apiEndpoint={fetchData}
      />
      {/* <ChooseParams /> */}

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
