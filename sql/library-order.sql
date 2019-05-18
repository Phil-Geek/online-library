CREATE TABLE IF NOT EXISTS `border`(
	`id` varchar(64),
	`book_id` varchar(64) NOT NULL,
	`book_name` varchar(64) NOT NULL,
	`user_id` varchar(64) NOT NULL,
	`order_state` varchar(64) NOT NULL,
	`borrow_time` datetime,
	`return_time` datetime,
	`create_time` datetime NOT NULL,
	`modification_time` datetime NOT NULL,
	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;