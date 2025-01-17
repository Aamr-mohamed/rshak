/*
  Warnings:

  - You are about to drop the `Checkup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Checkup` DROP FOREIGN KEY `Checkup_bodyCheckupId_fkey`;

-- DropForeignKey
ALTER TABLE `Checkup` DROP FOREIGN KEY `Checkup_userId_fkey`;

-- DropTable
DROP TABLE `Checkup`;

-- CreateTable
CREATE TABLE `checkup` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `bodyCheckupId` VARCHAR(191) NOT NULL,
    `checkupName` VARCHAR(191) NOT NULL,
    `checkupDate` VARCHAR(191) NOT NULL,
    `checkupPercentage` VARCHAR(191) NOT NULL,
    `checkupAverage` VARCHAR(191) NOT NULL,
    `checkupDescription` VARCHAR(191) NOT NULL,
    `checkupImageName` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checkup` ADD CONSTRAINT `checkup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkup` ADD CONSTRAINT `checkup_bodyCheckupId_fkey` FOREIGN KEY (`bodyCheckupId`) REFERENCES `bodyCheckup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
