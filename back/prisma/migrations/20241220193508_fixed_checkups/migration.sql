/*
  Warnings:

  - You are about to drop the column `bodyCheckupId` on the `checkup` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `checkup_bodyCheckupId_fkey` ON `checkup`;

-- AlterTable
ALTER TABLE `checkup` DROP COLUMN `bodyCheckupId`;
