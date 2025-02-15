create table public._users
(
    id           uuid not null
        primary key,
    birthday     date,
    email        varchar(255)
        constraint ukhchfjvwnaa27i27bfwv0y6n1x
            unique,
    firstname    varchar(255),
    last_session timestamp(6),
    lastname     varchar(255),
    password     varchar(255),
    role         varchar(255)
        constraint _users_role_check
            check ((role)::text = ANY ((ARRAY ['TEACHER'::character varying, 'ADMIN'::character varying])::text[])),
    status       varchar(255)
        constraint _users_status_check
            check ((status)::text = ANY
                ((ARRAY ['ONLINE'::character varying, 'OFFLINE'::character varying, 'ON_BREAK'::character varying])::text[]))
);

alter table public._users
    owner to statrack;

create table public.clocking_events
(
    id        uuid not null
        primary key,
    status    varchar(255)
        constraint clocking_events_status_check
            check ((status)::text = ANY
                ((ARRAY ['ONLINE'::character varying, 'OFFLINE'::character varying, 'ON_BREAK'::character varying])::text[])),
    timestamp timestamp(6),
    user_id   uuid not null
        constraint fkarx5krcilsc27gwgiql3xjiie
            references public._users
            on delete cascade
);

alter table public.clocking_events
    owner to statrack;

create index idx_user_timestamp
    on public.clocking_events (user_id, timestamp);

create table public.tokens
(
    id         uuid    not null
        primary key,
    expired    boolean not null,
    revoked    boolean not null,
    token      varchar(255)
        constraint ukna3v9f8s7ucnj16tylrs822qj
            unique,
    token_type varchar(255)
        constraint tokens_token_type_check
            check ((token_type)::text = 'BEARER'::text),
    user_id    uuid
        constraint fke36hkxwo4n77fwpo66q2s3vk7
            references public._users
);

alter table public.tokens
    owner to statrack;

