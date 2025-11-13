// backend/src/models/memberModel.js
import { Member } from '../config/db.js';

// ตรวจสอบการ Login
export async function authenticateMember(username, password) {
    const member = await Member.findOne({ username, password }).lean();

    if (member) {
        const { password, ...safeMember } = member;
        return safeMember; 
    }
    return null;
}