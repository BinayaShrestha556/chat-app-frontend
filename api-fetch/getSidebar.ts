import axios from "axios";

export const getSidebar = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/get-conversations`,
      { withCredentials: true }
    );
    console.log(res.data);
    const formattedItems = res.data.map((e: any) => ({
      id: e.id,

      createdAt: e.createdAt,
      message: {
        text: e.messages[0].body,
        time: e.messages[0].createdAt,
        sender: e.messages[0].senderId,
        pic: e.messages[0].pic,
      },
      participants: e.participants,
    }));

    return formattedItems;
  } catch (error) {
    console.log(error);
  }
};
