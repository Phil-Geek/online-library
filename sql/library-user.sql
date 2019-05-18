CREATE TABLE IF NOT EXISTS `user`(
	`id` varchar(64),
	`role` varchar(64) NOT NULL,
	`name` varchar(64) NOT NULL,
	`password` varchar(64) NOT NULL,
	`create_time` datetime NOT NULL,
	`modification_time` datetime NOT NULL,
	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;