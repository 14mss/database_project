-- CreateTable
CREATE TABLE `PROJECT_OWNER` (
    `user_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(16) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `verify_email_status` VARCHAR(20) NOT NULL,
    `house_no` VARCHAR(10) NOT NULL,
    `province` VARCHAR(45) NOT NULL,
    `district` VARCHAR(45) NOT NULL,
    `subdistrict` VARCHAR(45) NOT NULL,
    `postcode` VARCHAR(5) NOT NULL,

    UNIQUE INDEX `PROJECT_OWNER_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VERIFICATION_INFO` (
    `citizen_id` VARCHAR(13) NOT NULL,
    `laser_id` VARCHAR(12) NOT NULL,
    `bank_name` VARCHAR(45) NOT NULL,
    `account_number` VARCHAR(20) NOT NULL,
    `acc_firstname` VARCHAR(45) NOT NULL,
    `acc_lastname` VARCHAR(45) NOT NULL,
    `book_bank_image_url` VARCHAR(2048) NOT NULL,
    `id_card_image_url` VARCHAR(2048) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `VERIFICATION_INFO_user_id_key`(`user_id`),
    PRIMARY KEY (`citizen_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CATEGORY` (
    `category_id` INTEGER NOT NULL,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PROJECT` (
    `project_id` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `project_title` VARCHAR(200) NOT NULL,
    `objective` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `video_url` VARCHAR(2048) NOT NULL,
    `image_url` VARCHAR(2048) NOT NULL,
    `start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `due_date` DATETIME(3) NOT NULL,
    `crowd_funding_type` VARCHAR(10) NOT NULL,
    `funding_goal` DOUBLE NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `donation_amount` DOUBLE NOT NULL DEFAULT 0.00,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VERIFICATION_INFO` ADD CONSTRAINT `VERIFICATION_INFO_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `PROJECT_OWNER`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PROJECT` ADD CONSTRAINT `PROJECT_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `CATEGORY`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PROJECT` ADD CONSTRAINT `PROJECT_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `PROJECT_OWNER`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
