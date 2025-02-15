CREATE TABLE _users
(
    id             UUID         NOT NULL,
    firstname      VARCHAR(255),
    lastname       VARCHAR(255),
    email          VARCHAR(255),
    password       VARCHAR(255),
    role           VARCHAR(255),
    birthday       date,
    last_session   TIMESTAMP WITHOUT TIME ZONE,
    status         VARCHAR(255),
    account_status VARCHAR(255) NOT NULL,
    CONSTRAINT pk__users PRIMARY KEY (id)
);

CREATE TABLE activation_token
(
    id          UUID         NOT NULL,
    user_id     UUID         NOT NULL,
    token       VARCHAR(255) NOT NULL,
    expiry_date TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_activationtoken PRIMARY KEY (id)
);

CREATE TABLE clocking_events
(
    id        UUID NOT NULL,
    timestamp TIMESTAMP WITHOUT TIME ZONE,
    user_id   UUID NOT NULL,
    status    VARCHAR(255),
    CONSTRAINT pk_clocking_events PRIMARY KEY (id)
);

CREATE TABLE tokens
(
    id         UUID    NOT NULL,
    token      VARCHAR(255),
    token_type VARCHAR(255),
    revoked    BOOLEAN NOT NULL,
    expired    BOOLEAN NOT NULL,
    user_id    UUID,
    CONSTRAINT pk_tokens PRIMARY KEY (id)
);

ALTER TABLE _users
    ADD CONSTRAINT uc__users_email UNIQUE (email);

ALTER TABLE activation_token
    ADD CONSTRAINT uc_activationtoken_token UNIQUE (token);

ALTER TABLE activation_token
    ADD CONSTRAINT uc_activationtoken_user UNIQUE (user_id);

ALTER TABLE tokens
    ADD CONSTRAINT uc_tokens_token UNIQUE (token);

CREATE INDEX idx_user_timestamp ON clocking_events (user_id, timestamp);

ALTER TABLE activation_token
    ADD CONSTRAINT FK_ACTIVATIONTOKEN_ON_USER FOREIGN KEY (user_id) REFERENCES _users (id);

ALTER TABLE clocking_events
    ADD CONSTRAINT FK_CLOCKING_EVENTS_ON_USER FOREIGN KEY (user_id) REFERENCES _users (id) ON DELETE CASCADE;

ALTER TABLE tokens
    ADD CONSTRAINT FK_TOKENS_ON_USER FOREIGN KEY (user_id) REFERENCES _users (id);