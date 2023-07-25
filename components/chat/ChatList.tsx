import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChatItem } from '../../model/ChatModel';
import { unknownAvatarImage } from '../../constants';

type ChatListProps = {
  chatItem: ChatItem;
  userName: string;
};

const ChatList: React.FC<ChatListProps> = ({ chatItem, userName }) => {
  let avatarImage = chatItem.image ?? unknownAvatarImage;

  let [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: (number) => Easing.linear(number),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.flatListItem,
        {
          borderColor: userName === chatItem.by ? 'green' : 'blue',
        },
        {
          opacity: animatedValue,
        },
        {
          transform: [{ scale: animatedValue }],
        },
      ]}
    >
      <View style={styles.chatItemHeader}>
        <View style={styles.authorContainer}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + avatarImage,
            }}
            style={styles.authorAvatar}
          />
          <Text style={styles.authorName}>{chatItem.by}</Text>
        </View>
        <View style={styles.timeStampContainer}>
          <Text style={styles.timeStamp}>
            {new Date(chatItem.timeStamp).toLocaleTimeString()}
          </Text>
        </View>
      </View>
      <Text style={styles.chatText}>{chatItem.text}</Text>
    </Animated.View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  flatListItem: {
    backgroundColor: '#6961d1',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  chatItemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  timeStampContainer: {
    flexShrink: 1,
  },
  timeStamp: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  authorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  authorName: {
    alignSelf: 'center',
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
  },
  chatText: {
    fontSize: 18,
  },
});
