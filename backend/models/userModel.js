// backend/models/userModel.js
const poolPromise = require('../config/db');

// 전체 세션 조회
exports.getAllSessions = async () => {
  try {
    const pool = await poolPromise;
    const [results] = await pool.query('SELECT * FROM user_session');
    return results;
  } catch (err) {
    console.error('DB select 에러:', err);
    throw err;
  }
};

// 세션 생성
exports.createSession = async (user_id) => {
  try {
    const pool = await poolPromise;
    const sql = 'INSERT INTO user_session (user_id) VALUES (?)';
    const [result] = await pool.query(sql, [user_id]);
    return result;
  } catch (err) {
    console.error('DB insert 에러:', err);
    throw err;
  }
};

// 세션 삭제
exports.deleteSession = async (session_id) => {
  try {
    const pool = await poolPromise;
    const [result] = await pool.query('DELETE FROM user_session WHERE session_id = ?', [session_id]);
    return result;
  } catch (err) {
    console.error('DB delete 에러:', err);
    throw err;
  }
};