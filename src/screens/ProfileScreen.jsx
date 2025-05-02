import React from 'react';
import { Button, Text, View } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Bem-vindo à Página de Perfil!</Text>
      <Button
        title="Voltar à Home"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default ProfileScreen;
