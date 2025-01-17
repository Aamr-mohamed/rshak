-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `homeAddress` VARCHAR(191) NOT NULL,
    `workAddress` VARCHAR(191) NOT NULL,
    `gymAddress` VARCHAR(191) NOT NULL,
    `gymTime` VARCHAR(191) NOT NULL,
    `job` VARCHAR(191) NOT NULL,
    `bodyType` VARCHAR(191) NOT NULL,
    `foodType` VARCHAR(191) NOT NULL,
    `specialMeals` VARCHAR(191) NOT NULL,
    `monthlyCheckup` VARCHAR(191) NOT NULL,
    `weeklyCheckupTimes` VARCHAR(191) NOT NULL,
    `monthkyMealsCheckup` VARCHAR(191) NOT NULL,
    `userNotes` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `disease1` VARCHAR(191) NOT NULL,
    `disease2` VARCHAR(191) NOT NULL,
    `disease3` VARCHAR(191) NOT NULL,
    `disease4` VARCHAR(191) NOT NULL,
    `medicine1` VARCHAR(191) NOT NULL,
    `medicine2` VARCHAR(191) NOT NULL,
    `medicine3` VARCHAR(191) NOT NULL,
    `medicine4` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Checkup` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `checkupName` VARCHAR(191) NOT NULL,
    `checkupDate` VARCHAR(191) NOT NULL,
    `checkupPercentage` VARCHAR(191) NOT NULL,
    `checkupAverage` VARCHAR(191) NOT NULL,
    `checkupDescription` VARCHAR(191) NOT NULL,
    `checkupImageName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Checkup` ADD CONSTRAINT `Checkup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
