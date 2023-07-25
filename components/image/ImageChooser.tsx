import { Button, Platform, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

type ImageChooseProps = {
  onChangeImage: (image: string) => void;
}

const ImageChooser: React.FC<ImageChooseProps> = ({onChangeImage}) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
          alert("Sorry!, we need camera roll permissions to make this")
        } 
      }
    })()
  }, []);
  
  const pickImage = async () => {
    // User pick an image from the photo gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1]
    })

    if (!result.cancelled) {
      var resizedImage = await ImageManipulator.manipulateAsync(
        result.uri,
        [
          {
            resize: {
              width: 50,
              height: 50
            }
          }
        ],
        {
          base64: true
        }
      )
      var imageBase64 = resizedImage.base64 ?? ""
      setImage(result.uri)
      onChangeImage(imageBase64)
    }
  }

  return (
    <View style={styles.container}>
      <Button title='Pick an image' color="#FFEEB9" onPress={pickImage} />
      {image ? (
        <Image
          resizeMode='cover'
          source={{uri: image}}
          style={styles.avatarBig}
        />
      ): (
        <Text style={{textAlign:'center', color:'#fff'}}>No image selected</Text>
      )}
    </View>
  );
}

export default ImageChooser

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  avatarBig: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginTop: 15,
    alignSelf: "center",
  },
});
