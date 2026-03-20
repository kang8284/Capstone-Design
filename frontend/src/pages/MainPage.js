import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage({ userId, setUserId }) {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log('새로운 세션 생성 userId:', userId);

    // 여기서 백엔드 호출 가능
    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    })
      .then(res => res.json())
      .then(data => {
        console.log('세션 생성 완료:', data);
        setUserId(prev => prev + 1); // 다음 시작 시 +1
        navigate('/loading');
      })
      .catch(err => {
        console.error('세션 생성 실패:', err);
        alert('세션 생성 실패');
      });
  };

  return (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <h1>Welcome to Our App</h1>
      <button onClick={handleStart} style={{ fontSize: 20, padding: '10px 30px' }}>
        시작하기
      </button>
    </div>
  );
}

export default MainPage;