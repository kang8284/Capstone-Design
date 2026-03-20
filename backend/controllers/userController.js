// backend/controllers/userController.js
const userModel = require('../models/userModel');

// 전체 세션 조회
exports.getUsers = async (req, res) => {
  try {
    const sessions = await userModel.getAllSessions();
    res.json(sessions);
  } catch (err) {
    console.error('DB 조회 실패:', err);
    res.status(500).json({ message: 'DB 조회 실패', error: err });
  }
};

// 세션 생성
exports.createUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ message: 'user_id 필요' });

    const result = await userModel.createSession(user_id);
    res.json({ message: '세션 생성 완료', session_id: result.insertId });
  } catch (err) {
    console.error('DB insert 실패:', err);
    res.status(500).json({ message: 'DB insert 실패', error: err });
  }
};

// 세션 삭제
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.deleteSession(id);
    res.json({ message: '세션 삭제 완료' });
  } catch (err) {
    console.error('DB 삭제 실패:', err);
    res.status(500).json({ message: 'DB 삭제 실패', error: err });
  }
};