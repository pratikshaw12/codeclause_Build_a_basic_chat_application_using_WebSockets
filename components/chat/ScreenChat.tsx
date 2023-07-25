import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { ChatItem } from '../../model/ChatModel';
import ChatList from './ChatList';
import Socket from '../socket/Socket';

type ScreenChatProps = {
  userName: string;
  image: string;
};

const ScreenChat: React.FC<ScreenChatProps> = ({ userName, image }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatItemList, setChatItemList] = useState<ChatItem[]>([]);

  const renderItem: ListRenderItem<ChatItem> = ({ item }) => (
    <ChatList chatItem={item} userName={userName} />
  );

  useEffect(() => {
    (async () => {
      try {
        if (Socket.state === 'Disconnected') {
          await Socket.start();
        }
      } catch (error) {
        console.log(error);
      }
    })();
    Socket.on('ReceiveMessage', (chatItem) => {
      setChatItemList((chatItemList) => {
        if (chatItemList.find((i) => i.id == chatItem.id)) return chatItemList;
        return [...chatItemList, chatItem];
      });
    });
  }, []);

  const onPress = async () => {
    await Socket.invoke('SendMessage', {
      id: Math.random().toString(36).substring(7),
      text: chatInput,
      image: image,
      timeStamp: Date.now(),
      by: userName,
    });
    setChatInput('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* *
        inverted: fill starting from the bottom
        data bind chatItemList and sort by timeStamp
        keyExtractor: designate unique piece of data for each item
      * */}

        <FlatList
          inverted
          data={chatItemList.sort((a, b) => b.timeStamp - a.timeStamp)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <View style={styles.section}>
          <TextInput
            style={styles.chatTextInput}
            value={chatInput}
            onChangeText={(text) => setChatInput(text)}
          />
          <View style={styles.buttonSend}>
            <Button title="Send" onPress={onPress} color="#FFF" />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ScreenChat;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    margin: 15,
  },
  chatTextInput: {
    flexGrow: 1,
    marginRight: 5,
    paddingHorizontal: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    color: '#fff',
  },
  buttonSend: {
    backgroundColor: '#4bcded',
    borderRadius: 5,
  },
});
