// backend/src/controllers/memberController.js
import * as memberModel from '../models/memberModel.js';

// [POST] /api/members/login
export const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const member = memberModel.authenticateMember(username, password);

        if (member) {
            // ในชีวิตจริง ควรสร้าง JWT Token และส่งกลับไป
            res.status(200).json({ message: "Login successful", user: member });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error during login.", error });
    }
};