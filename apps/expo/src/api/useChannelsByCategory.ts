import { useQuery } from "@tanstack/react-query";

import { chatUserId } from "~/chatConfig";
import { getChatClient } from "~/utils/chatClient";
import { Category } from "~/utils/coachByCategory";

export const useChannelsByCategory = (category: Category) => {
  return useQuery({
    queryKey: ["channels", category],
    queryFn: () => fetchChannels(category),
  });
};

const fetchChannels = async (category: Category) => {
  const filter = { type: category, members: { $in: [chatUserId] } };
  const sort = [{ last_message_at: -1 as const }];

  const channels = await getChatClient().queryChannels(filter, sort, {
    watch: true, // this is the default
    state: true,
  });

  channels.map((channel) => {
    console.log(channel.data?.name, channel.cid);
  });
  return channels;
};
