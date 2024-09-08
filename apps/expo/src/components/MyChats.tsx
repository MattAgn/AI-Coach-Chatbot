import type { Channel } from "stream-chat";
import type { ChannelPreviewMessengerProps } from "stream-chat-expo";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Avatar, ChannelList, useChannelsContext } from "stream-chat-expo";

import { useChat } from "~/app/ChatContext";
import { useChatClient } from "~/app/useChatClient";
import { chatUserId } from "~/chatConfig";

export const MyChats = () => {
  const { setChannel } = useChat();
  const { clientIsReady } = useChatClient();
  const filters = {
    members: {
      $in: [chatUserId],
    },
  };

  if (!clientIsReady) {
    return <CustomLoadingIndicator />;
  }

  return (
    <ChannelList
      filters={filters}
      LoadingIndicator={CustomLoadingIndicator}
      Preview={CustomChannelPreview}
      onSelect={(channel: Channel) => {
        setChannel(channel);
        router.navigate("./chat");
      }}
    />
  );
};

const CustomChannelPreview = ({ channel }: ChannelPreviewMessengerProps) => {
  // need to use context because the prop onSelect is undefined https://github.com/GetStream/stream-chat-react-native/issues/1717
  const { onSelect } = useChannelsContext();

  if (!onSelect) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(channel)}>
      <>
        <Avatar image={channel.data?.image} size={60} />
        <Text style={styles.channelName}>{channel.data?.name}</Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "#d9c2ff",
    padding: 50,
  },
  channelName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
