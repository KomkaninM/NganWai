// Member Logic Controller
import Member from '../models/member.model.js';
import bcrypt from 'bcryptjs';
const SALT_ROUNDS = 10;

// Login Member
// [POST] /api/members/login
export const login = async (req, res) => {
  const { studentID, password } = req.body;

  if (!studentID || !password) {
    return res
      .status(400)
      .json({ message: 'studentID and password are required' });
  }

  try {
    const member = await Member.findOne({ studentID }).lean();

    if (!member) {
      return res.status(401).json({ message: 'Student ID not found' });
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(password, member.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const { password: pw, ...safeMember } = member;

    return res.status(200).json({
      message: 'Login successful',
      user: safeMember,
    });

  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error during login', error: error.message });
  }
};

// Register Member
// [POST] /api/members/register
export const register = async (req, res) => {
  const { studentID, password, phone, faculty, year } = req.body;

  // Validate input
  if (!studentID || !password || !phone || !faculty || isNaN(year)) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }
  

  try {
    // Check if studentID already exists
    const existing = await Member.findOne({ studentID }).lean();
    if (existing) {
      return res.status(409).json({ message: 'Student ID already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new member
    const newMember = await Member.create({
      studentID,
      password: hashedPassword,
      phone,
      faculty,
      year,
    });

    // Hide password before sending back
    const { password: pw, ...userSafeData } = newMember.toObject();

    return res.status(201).json({
      message: 'Register successful',
      user: userSafeData,
    });

  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error during register', error: error.message });
  }
};
