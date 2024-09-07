import type { Channel } from "stream-chat";
import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";

import { useChat } from "~/app/ChatContext";
import { chatUserId } from "~/chatConfig";

export const MyChats = () => {
  const { setChannel } = useChat();
  const filters = {
    members: {
      $in: [chatUserId],
    },
  };

  return (
    <ChannelList
      filters={filters}
      onSelect={(channel: Channel) => {
        setChannel(channel);
        router.navigate("./chat");
      }}
    />
  );
};
