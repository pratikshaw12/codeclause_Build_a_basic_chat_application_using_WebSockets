import { StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import ImageChooser from '../image/ImageChooser';

type PersonalInfoProps = {
  onClosed: (name: string, image: string) => void
}

const Home: React.FC<PersonalInfoProps> = ({onClosed}) => {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.inputForm}>
        <Text style={styles.textLabel}>Please enter your name here</Text>
        <TextInput 
          style={styles.textInput}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
      </View>

      <ImageChooser onChangeImage={(image) => setImage(image)}/>

      <Button 
        title='Start Chatting!' 
        color="#FFEEB9"
        onPress={() => onClosed(userName, image)} 
      />

    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  logo: {
    width: 100,
    height: 100,
  },
  inputForm: {
    marginTop: 20,
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 20,
    color:'#fff'
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    borderStyle: 'solid',
    color:'#fff'
  }
});
