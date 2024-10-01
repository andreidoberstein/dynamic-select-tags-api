create table posts(
	id int not null auto_increment primary key,
    title varchar(120),
    id_user int not null,
    created_at timestamp default current_timestamp
);

create table tags(
	id int not null auto_increment primary key,
    text varchar(12) not null
);

create table post_tags(
	id int not null auto_increment primary key,
    id_post int not null,
    id_tag int not null,
    created_at timestamp default current_timestamp,
    
    foreign key(id_post) references posts(id),
    foreign key(id_tag) references tags(id)
);

insert into posts(title, id_user) values("Teste1", 2),
("Teste2",1),
("Teste3",1),
("Teste4", 1);

insert into tags(text) values("mar"),
("terreno"),
("paraiso"),
("chuva"),
("sol");

insert into post_tags(id_post,id_tag) values(1,1),
(1,2),
(1,3),
(1,5),
(2,1),
(2,3),
(3,2),
(3,3),
(3,5),
(4,5),
(4,4),
(4,2),
(4,1);
