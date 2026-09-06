import { User } from "../../models/auth/user.model.js";
import { Message } from "../../models/message/message.model.js";
import { uploadChatMedia, hasImageKitConfig } from "../../services/storage/cloud.js"
import { getSocketIdByUserId, io } from "../../services/events/socket.js";


export const getUsersForSidebar = async (req, res) => {

    try {

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('username email profilePicture clerkId');

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getConversationsForSidebar = async (req, res) => {

    try {

        const loggedInUserId = req.user._id;

        const conversations = await Message.aggregate([
            { $match: { $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }] } },

            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$senderId", loggedInUserId] },
                            "$receiverId",
                            "$senderId",
                        ],
                    },
                    lastMessageAt: {
                        $max: "$createdAt",
                    },
                },
            },
            { $sort: { lastMessageAt: -1 } },

            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },

            { $replaceRoot: { newRoot: { $first: "$user" } } },

            { $project: { _id: 1, username: 1, email: 1, profilePicture: 1, clerkId: 1 } }

        ]);

        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error in getConversationsForSidebar:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}

export const getMessages = async (req, res) => {

    try {

        const { id: userToChatId } = req.params;
        const myId = req.user._id;


        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {

    try {

        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;


        let imageUrl;
        let videoUrl;


        if (req.file) {

            if (!hasImageKitConfig()) {
                return res.status(500).json({ message: "Media is not configured" })
            }


            const url = await uploadChatMedia(req.file)

            if (req.file.mimetype.startsWith("video/")) videoUrl = url;
            else { imageUrl = url }

        }

        const newMessage = new Message({

            senderId,
            receiverId,
            text,
            image: imageUrl,
            video: videoUrl
        })


        await newMessage.save();

        const receiverSocketId = getSocketIdByUserId(receiverId.toString());

        if (receiverSocketId) {

            io.to(receiverSocketId).emit("receiveMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}