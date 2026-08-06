// import createError from "../utils/createError.js";
// import Conversation from "../models/conversationModel.js";

// // export const createConversation = async (req, res, next) => {
// //   console.log("req.userId:", req.userId);
// // console.log("req.body.to:", req.body.to);
// //   const  newConversation = new Conversation({
// //     id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
// //     sellerId: req.isSeller ? req.userId : req.body.to,
// //     buyerId: req.isSeller ? req.body.to : req.userId,
// //     readBySeller: req.isSeller,
// //     readByBuyer: !req.isSeller,
// //   });

// //   try{
// //     const savedConversation = await newConversation.save();
// //     res.status(201).send(savedConversation);
// //   }catch(err){
// //     next(err);
// //   }
// // };
// export const createConversation = async (req, res, next) => {
//   console.log("req.userId:", req.userId);
//   console.log("req.body.to:", req.body.to);

//   const conversationId = req.isSeller ? req.userId + req.body.to : req.body.to + req.userId;

//   try {
//     const existing = await Conversation.findOne({ id: conversationId });
//     if (existing) return res.status(200).send(existing);

//     const newConversation = new Conversation({
//       id: conversationId,
//       sellerId: req.isSeller ? req.userId : req.body.to,
//       buyerId: req.isSeller ? req.body.to : req.userId,
//       readBySeller: req.isSeller,
//       readByBuyer: !req.isSeller,
//     });

//     const savedConversation = await newConversation.save();
//     res.status(201).send(savedConversation);
//   } catch (err) {
//     console.error("Conversation creation error:", err);
//     next(err);
//   }
// };




// export const createOrGetConversation = async (req, res, next) => {
//   const { sellerId, buyerId } = req.body;

//   try {
//     const conversationId = sellerId + buyerId;

//     let convo = await Conversation.findOne({ id: conversationId });

//     if (!convo) {
//       convo = await Conversation.create({
//         id: conversationId,
//         sellerId,
//         buyerId,
//         readBySeller: false,
//         readByBuyer: true,
//         lastMessage: "",
//       });
//     }

//     res.status(200).send(convo);
//   } catch (err) {
//     next(err);
//   }
// };



// export const updateConversation = async (req, res, next) => {
//   try {
//     const updatedConversation = await Conversation.findOneAndUpdate(
//       { id: req.params.id },
//       {
//         $set: {
//           // readBySeller: true,
//           // readByBuyer: true,
//           ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
//         },
//       },
//       { new: true }
//     );

//     res.status(200).send(updatedConversation);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getSingleConversation = async (req, res, next) => {
//   try {
//     const conversation = await Conversation.findOne({ id: req.params.id });
//     if (!conversation) return next(createError(404, "Not found!"));
//     res.status(200).send(conversation);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getConversations = async (req, res, next) => {
//   try {
//     const conversations = await Conversation.find(
//       req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
//     ).sort({ updatedAt: -1 });
//     res.status(200).send(conversations);
//   } catch (err) {
//     next(err);
//   }
// };



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

// // Get all conversations for a user
// export const getConversations = async (req, res, next) => {
//   try {
//     const conversations = await Conversation.find({
//       members: { $in: [req.params.userId] }
//     })
//     .sort({ updatedAt: -1 }) // Sort by most recent
//     .populate({
//       path: 'members',
//       select: 'username img email' // Only get these fields
//     });

//     // Get last message for each conversation
//     const conversationsWithLastMessage = await Promise.all(
//       conversations.map(async (conversation) => {
//         const lastMessage = await Message.findOne({
//           conversationId: conversation._id
//         })
//         .sort({ createdAt: -1 })
//         .limit(1);

//         return {
//           ...conversation._doc,
//           lastMessage: lastMessage || null
//         };
//       })
//     );

//     res.status(200).json(conversationsWithLastMessage);
//   } catch (err) {
//     next(err);
//   }
// };
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
