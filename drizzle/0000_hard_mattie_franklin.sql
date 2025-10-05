CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'todo' NOT NULL,
	`schedule` integer NOT NULL,
	`priority` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL
);
