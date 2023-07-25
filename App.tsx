import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ScreenChat from './components/chat/ScreenChat';
import Home from './components/home/Home';
import { storageImageKey, storageUserNameKey } from './constants';

export default function App() {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchPersonalData = async () => {
    let fetchedUsername = await AsyncStorage.getItem(storageUserNameKey);
    let username = fetchedUsername == null ? '' : fetchedUsername;
    let fetchedImage = await AsyncStorage.getItem(storageImageKey);
    let image = fetchedImage == null ? '' : fetchedImage;
    setUserName(username);
    setImage(image);
  };

  const onPersonalInfo = async (name: string, image: string) => {
    setUserName(name);
    await AsyncStorage.setItem(storageUserNameKey, userName);
    setImage(image);
    await AsyncStorage.setItem(storageImageKey, image);
  };

  if (isLoading) {
    return (
      <AppLoading
        startAsync={fetchPersonalData}
        onFinish={() => setIsLoading(false)}
        onError={() => console.log('Error')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {userName !== '' ? (
        <ScreenChat userName={userName} image={image} />
      ) : (
        <Home onClosed={onPersonalInfo} />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5836DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
