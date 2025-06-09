import axios from "axios";

export const getSidebar = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/get-conversations`,
      { withCredentials: true }
    );

    const formattedItems = res.data.map((e: any) => {
      const lastMessage = e.messages?.[0];

      return {
        id: e.id,
        createdAt: e.createdAt,
        message: lastMessage
          ? {
              text: lastMessage.body,
              time: lastMessage.createdAt,
              sender: lastMessage.senderId,
              pic: lastMessage.pic,
            }
          : {
              text: "No messages yet",
              time: e.createdAt,
              sender: null,
              pic: false,
            },
        participants: e.participants,
      };
    });

    return formattedItems;
  } catch (error) {
    console.error("Error fetching sidebar conversations:", error);
    return [];
  }
};
