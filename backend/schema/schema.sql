--backend/schema/schema.sql

-- 1. 사용자 세션
CREATE TABLE IF NOT EXISTS user_session (
    session_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 이미지 체크 (user_session 외래키)
CREATE TABLE IF NOT EXISTS image_check (
    image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT,
    image_url VARCHAR(255),
    check_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES user_session(session_id)
);

-- 3. 체형 분석 결과 (image_check 외래키)
CREATE TABLE IF NOT EXISTS body_analysis_result (
    analysis_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    image_id BIGINT,
    body_type VARCHAR(50),
    height FLOAT,
    weight FLOAT,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (image_id) REFERENCES image_check(image_id)
);

-- 4. 추천 결과 (body_analysis_result 외래키)
CREATE TABLE IF NOT EXISTS recommendation (
    recommendation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    analysis_id BIGINT,
    style_type VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (analysis_id) REFERENCES body_analysis_result(analysis_id)
);

-- 5. 의상(outfit) (recommendation 외래키)
CREATE TABLE IF NOT EXISTS outfit (
    outfit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    recommendation_id BIGINT,
    name VARCHAR(100),
    image_url VARCHAR(255),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recommendation_id) REFERENCES recommendation(recommendation_id)
);

-- 6. outfit 태그 매핑 (outfit 외래키)
CREATE TABLE IF NOT EXISTS outfit_tag_map (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    outfit_id BIGINT,
    tag VARCHAR(50),
    FOREIGN KEY (outfit_id) REFERENCES outfit(outfit_id)
);

-- 7. 피팅 결과 (user_session, outfit 외래키)
CREATE TABLE IF NOT EXISTS fitting_result (
    fitting_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT,
    outfit_id BIGINT,
    result_image VARCHAR(255),
    score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES user_session(session_id),
    FOREIGN KEY (outfit_id) REFERENCES outfit(outfit_id)
);