// Model สำหรับ Member
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    studentID: { type: String, required: true, unique: true },
    password: { type: String, required: true },    
    phone: { type: String, required: true },
    faculty: { type: String, required: true  },   
    year: { type: Number, required: true },       
  },
  {
    timestamps: true,
  }
);      

const Member = mongoose.model('Member', memberSchema);

export default Member;
