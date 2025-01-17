/*
  Warnings:

  - You are about to drop the column `monthkyMealsCheckup` on the `user` table. All the data in the column will be lost.
  - Added the required column `monthlyMealsCheckup` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `monthkyMealsCheckup`,
    ADD COLUMN `monthlyMealsCheckup` VARCHAR(191) NOT NULL;
