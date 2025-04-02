-- 테이블 생성
CREATE TABLE regulation_tree (
    id NUMBER GENERATED ALWAYS AS IDENTITY,
    branch_cd VARCHAR2(20) NOT NULL,
    name VARCHAR2(255) NOT NULL,
    parent_id NUMBER,
    sort_order NUMBER DEFAULT 0,
    depth NUMBER DEFAULT 0,
    CONSTRAINT pk_regulation_tree PRIMARY KEY (id)
);

-- 데이터 삽입
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