// backend/src/models/memberModel.js
import { members } from '../config/db.js';

// ตรวจสอบการ Login
export function authenticateMember(username, password) {
    const member = members.find(m => m.username === username && m.password === password);
    if (member) {
        // คืนค่าข้อมูลผู้ใช้ที่ไม่มี password
        const { password, ...safeMember } = member;
        return safeMember; 
    }
    return null;
}

// (เพิ่มฟังก์ชันสมัครสมาชิกในอนาคต: createMember)