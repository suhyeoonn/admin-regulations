-- 데이터 삽입
-- 규정 목록
INSERT INTO regulation_tree (branch_cd, name, parent_id, sort_order, depth) 
VALUES ('7000', '인사/복무', NULL, 1, 0);

INSERT INTO regulation_tree (branch_cd, name, parent_id, sort_order, depth) 
VALUES ('7000', '조직', NULL, 2, 0);

INSERT INTO regulation_tree (branch_cd, name, parent_id, sort_order, depth) 
VALUES ('7000', '단체협약', 1, 1, 1);

INSERT INTO regulation_tree (branch_cd, name, parent_id, sort_order, depth) 
VALUES ('7000', '윤리강령', 1, 2, 1);

INSERT INTO regulation_tree (branch_cd, name, parent_id, sort_order, depth) 
VALUES ('7000', '사규관리', 2, 1, 1);

INSERT INTO regulation_tree (branch_cd, name, parent_id, sort_order, depth) 
VALUES ('7000', '취업규칙', 3, 1, 2);

INSERT INTO regulation_tree (branch_cd, name, parent_id, sort_order, depth) 
VALUES ('7000', '인사규정', 6, 1, 3);

-- 규정 항목
INSERT INTO regulation (tree_id, title, content)
VALUES (1, '제 1장 총칙', '본 규정은...');

INSERT INTO regulation (tree_id, title, content)
VALUES (1, '제 1조 목적', '이 규정은 회사의 근무에 관한...');

INSERT INTO regulation (tree_id, title, content)
VALUES (1, '제 2조 적용범위', '이 규정은 모든 직원에게 적용된다.');

INSERT INTO regulation (tree_id, title, content)
VALUES (2, '제 1장 휴가', '휴가 관련 내용...');

INSERT INTO regulation (tree_id, title, content)
VALUES (2, '제 1조 정의', '휴가라 함은...');

INSERT INTO regulation (tree_id, title, content)
VALUES (3, '제 1장 회계원칙', '회계 원칙에 관한...');