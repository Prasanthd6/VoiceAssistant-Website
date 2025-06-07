// import createError from "../utils/createError.js";
// import Message from "../models/messageModel.js";
// import Conversation from "../models/conversationModel.js";

// export const createMessage = async (req, res, next) => {
//   const newMessage = new Message({
//     conversationId: req.body.conversationId,
//     userId: req.userId,
//     desc: req.body.desc,
//   });
//   try {
//     const savedMessage = await newMessage.save();
//     await Conversation.findOneAndUpdate(
//       { id: req.body.conversationId },
//       {
//         $set: {
//           readBySeller: req.isSeller,
//           readByBuyer: !req.isSeller,
//           lastMessage: req.body.desc,
//         },
//       },
//       { new: true }
//     );

//     res.status(201).send(savedMessage);
//   } catch (err) {
//     next(err);
//   }
// };
// export const getMessages = async (req, res, next) => {
//   try {
//     const messages = await Message.find({ conversationId: req.params.id });
//     res.status(200).send(messages);
//   } catch (err) {
//     next(err);
//   }
// };




import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

// Add a new message
export const addMessage = async (req, res, next) => {
  try {
    const { conversationId, sender, text } = req.body;

    // Validate conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json("Conversation not found");
    }

    // Check if sender is part of conversation
    if (!conversation.members.includes(sender)) {
      return res.status(403).json("You are not part of this conversation");
    }
        console.log("Received message:", req.body); // Add this log
    const newMessage = new Message({
      conversationId,
      sender,
      text
    });

    const savedMessage = await newMessage.save();

    // Update conversation's last updated time
    await Conversation.findByIdAndUpdate(conversationId, {
      updatedAt: Date.now()
    });

    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

// Get all messages for a conversation
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    })
    .sort({ createdAt: 1 }) // Sort by oldest first
    .populate({
      path: 'sender',
      select: 'username img' // Only get these fields
    });

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

// Mark message as read
export const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json("Message not found");
    }

    // Check if user is part of conversation
    const conversation = await Conversation.findById(message.conversationId);
    if (!conversation.members.includes(req.userId)) {
      return res.status(403).json("You are not part of this conversation");
    }

    // Add user to readBy array if not already there
    if (!message.readBy.includes(req.userId)) {
      message.readBy.push(req.userId);
      await message.save();
    }

    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};