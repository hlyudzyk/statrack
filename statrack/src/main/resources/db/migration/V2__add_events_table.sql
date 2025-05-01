CREATE TABLE events
(
    id         UUID                        NOT NULL,
    header     VARCHAR(255)                NOT NULL,
    content    TEXT                        NOT NULL,
    created_by UUID                        NOT NULL,
    image_url  VARCHAR(255),
    created_at TIMESTAMP WITHOUT TIME ZONE,
    event_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_events PRIMARY KEY (id)
);

CREATE INDEX idx_event_created ON events (created_at);

CREATE INDEX idx_event_date ON events (event_date);

ALTER TABLE events
    ADD CONSTRAINT FK_EVENTS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES _users (id);