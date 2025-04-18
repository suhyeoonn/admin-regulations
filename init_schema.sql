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

CREATE TABLE regulation (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tree_id NUMBER NOT NULL,               -- regulation_tree.id를 참조
    title VARCHAR2(255) NOT NULL,
    content VARCHAR2(4000) NOT NULL,
    CONSTRAINT fk_regulation_tree
      FOREIGN KEY (tree_id) REFERENCES regulation_tree(id)
);