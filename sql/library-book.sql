CREATE TABLE IF NOT EXISTS `book`(
	`id` varchar(64),
	`location` varchar(64) NOT NULL,
	`name` varchar(64) NOT NULL,
	`book_class` varchar(64) NOT NULL,
	`press_name` varchar(64) NOT NULL,
	`author_name` varchar(64) NOT NULL,
	`img_local_url` varchar(64) NOT NULL,
	`img_web_url` varchar(64) NOT NULL,
	`description` varchar(1024) NOT NULL,
	`sum_number` int NOT NULL,
	`rest_number` int NOT NULL,
	`create_time` datetime NOT NULL,
	`modification_time` datetime NOT NULL,
	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;