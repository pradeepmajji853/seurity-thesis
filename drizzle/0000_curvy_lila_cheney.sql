CREATE TABLE `interests` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	`organization` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `interests_email_unique` ON `interests` (`email`);