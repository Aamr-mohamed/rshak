/*
  Warnings:

  - You are about to alter the column `height` on the `bodyInfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `weight` on the `bodyInfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `bodyInfo` MODIFY `height` INTEGER NOT NULL,
    MODIFY `weight` INTEGER NOT NULL;
