import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

// Create a new conversation (1-to-1)
export const newConversation = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;

    // Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
      isGroup: false
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const newConversation = new Conversation({
      members: [senderId, receiverId],
      isGroup: false
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    next(err);
  }
};

// Create a new group conversation
export const newGroupConversation = async (req, res, next) => {
  try {
    const { members, groupName, adminId } = req.body;

    if (!members || members.length < 2 || !groupName || !adminId) {
      return res.status(400).json("Please provide all required fields");
    }

    const newConversation = new Conversation({
      members,
      isGroup: true,
      groupName,
      groupAdmin: adminId
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    next(err);
  }
};

// Get all conversations for a user
export const getConversations = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const conversations = await Conversation.find({
      members: { $in: [userId] },
    })
      .sort({ updatedAt: -1 })
      .populate({path:"members", select:"username img"});

    const enriched = await Promise.all(
      conversations.map(async (conv) => {
        const lastMessage = await Message.findOne({ conversationId: conv._id })
          .sort({ createdAt: -1 });

        return {
          ...conv._doc,
          lastMessage: lastMessage || null,
        };
      })
    );

    res.status(200).json(enriched);
  } catch (err) {
    next(err);
  }
};
