const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = 5000;

// JSON 파싱 + CORS 설정
app.use(express.json());
app.use(cors());

// 라우터 연결
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// 서버 시작
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));