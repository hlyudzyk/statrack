CREATE TABLE queue_entry
(
    id             UUID                        NOT NULL,
    queue_id       UUID                        NOT NULL,
    student_email  VARCHAR(255),
    student_name   VARCHAR(255),
    scheduled_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    status         VARCHAR(255)                NOT NULL,
    created_at     TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_queueentry PRIMARY KEY (id)
);

CREATE TABLE users_queue
(
    id                UUID    NOT NULL,
    user_id           UUID    NOT NULL,
    max_students      INTEGER NOT NULL,
    comment           VARCHAR(255),
    availability_json TEXT,
    created_at        TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_usersqueue PRIMARY KEY (id)
);

ALTER TABLE users_queue
    ADD CONSTRAINT uc_usersqueue_user UNIQUE (user_id);

ALTER TABLE queue_entry
    ADD CONSTRAINT FK_QUEUEENTRY_ON_QUEUE FOREIGN KEY (queue_id) REFERENCES users_queue (id);

ALTER TABLE users_queue
    ADD CONSTRAINT FK_USERSQUEUE_ON_USER FOREIGN KEY (user_id) REFERENCES _users (id);