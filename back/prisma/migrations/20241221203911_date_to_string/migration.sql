-- AlterTable
ALTER TABLE `checkup` MODIFY `checkupImageName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `mealsSchedule` MODIFY `userNotes` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `monthlyFoodDispensing` MODIFY `date` VARCHAR(191) NOT NULL;
