create table if not exists users (
    id         int          not null auto_increment primary key,
    email      varchar(255) not null unique,
    pass_hash  binary (64)  not null,
    username   varchar(255) not null unique,
    first_name varchar(255) null,
    last_name  varchar(255) null,
    photo_url  varchar(255) not null unique
);

create table if not exists usersSignInLog (
    id       int         not null auto_increment primary key,
    user_id  int         not null references users(id),
    start_at time        not null,
    ip_addr  varchar(15) not null
);

alter user root identified with mysql_native_password by 'password';
flush privileges;