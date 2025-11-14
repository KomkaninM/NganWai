import Member from "../models/memberModel.js";
import Item from "../models/userModel.js";
// TODO4: you may need to import something here

/** @type {import("express").RequestHandler} */
export const getMembers = async (req, res) => {
  // TODO4: implement this function
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** @type {import("express").RequestHandler} */
export const createMember = async (req, res) => {
  // TODO4: implement this function
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** @type {import("express").RequestHandler} */
export const deleteMember = async (req, res) => {
  // TODO4: implement this function
  try {
    const { id } = req.params;
    
    // First, find the member to get their name
    const member = await Member.findById(id);
    
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    
    // Delete all items associated with this member
    await Item.deleteMany({ name: member.name });
    
    // Delete the member
    await Member.findByIdAndDelete(id);
    
    res.status(200).json({ 
      message: "Member and associated items deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
