/*
  Warnings:

  - You are about to drop the `Division` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Division` DROP FOREIGN KEY `Division_parentId_fkey`;

-- DropTable
DROP TABLE `Division`;

-- CreateTable
CREATE TABLE `divisions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `parentId` INTEGER NULL,
    `collaborators` INTEGER UNSIGNED NOT NULL,
    `level` INTEGER UNSIGNED NOT NULL,
    `ambassadorName` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `divisions_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `divisions` ADD CONSTRAINT `divisions_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `divisions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
