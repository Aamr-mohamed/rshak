/*
  Warnings:

  - You are about to drop the column `bodyType` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `disease1` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `disease2` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `disease3` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `disease4` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `foodType` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `gymAddress` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `gymTime` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `medicine1` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `medicine2` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `medicine3` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `medicine4` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyCheckup` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyMealsCheckup` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `specialMeals` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userNotes` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `weeklyCheckupTimes` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `user` table. All the data in the column will be lost.
  - Added the required column `bodyCheckupId` to the `Checkup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Checkup` ADD COLUMN `bodyCheckupId` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `bodyType`,
    DROP COLUMN `disease1`,
    DROP COLUMN `disease2`,
    DROP COLUMN `disease3`,
    DROP COLUMN `disease4`,
    DROP COLUMN `foodType`,
    DROP COLUMN `gymAddress`,
    DROP COLUMN `gymTime`,
    DROP COLUMN `height`,
    DROP COLUMN `medicine1`,
    DROP COLUMN `medicine2`,
    DROP COLUMN `medicine3`,
    DROP COLUMN `medicine4`,
    DROP COLUMN `monthlyCheckup`,
    DROP COLUMN `monthlyMealsCheckup`,
    DROP COLUMN `specialMeals`,
    DROP COLUMN `userNotes`,
    DROP COLUMN `weeklyCheckupTimes`,
    DROP COLUMN `weight`;

-- CreateTable
CREATE TABLE `bodyInfo` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `foodType` VARCHAR(191) NOT NULL,
    `gymAddress` VARCHAR(191) NOT NULL,
    `gymTime` VARCHAR(191) NOT NULL,
    `bodyType` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bodyCheckup` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `disease1` VARCHAR(191) NOT NULL,
    `disease2` VARCHAR(191) NOT NULL,
    `disease3` VARCHAR(191) NOT NULL,
    `disease4` VARCHAR(191) NOT NULL,
    `medicine1` VARCHAR(191) NOT NULL,
    `medicine2` VARCHAR(191) NOT NULL,
    `medicine3` VARCHAR(191) NOT NULL,
    `medicine4` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monthlyAttendance` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `attendance` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monthlyFoodDispensing` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `foodDispensing` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mealsSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `specialMeals` VARCHAR(191) NOT NULL,
    `monthlyCheckup` VARCHAR(191) NOT NULL,
    `userNotes` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bodyInfo` ADD CONSTRAINT `bodyInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bodyCheckup` ADD CONSTRAINT `bodyCheckup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Checkup` ADD CONSTRAINT `Checkup_bodyCheckupId_fkey` FOREIGN KEY (`bodyCheckupId`) REFERENCES `bodyCheckup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyAttendance` ADD CONSTRAINT `monthlyAttendance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyFoodDispensing` ADD CONSTRAINT `monthlyFoodDispensing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mealsSchedule` ADD CONSTRAINT `mealsSchedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
