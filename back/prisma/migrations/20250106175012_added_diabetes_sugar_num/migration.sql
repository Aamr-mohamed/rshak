/*
  Warnings:

  - Added the required column `diabetesNum` to the `bodyInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bodyInfo` ADD COLUMN `diabetesNum` INTEGER NOT NULL;
