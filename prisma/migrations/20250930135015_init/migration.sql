-- CreateTable
CREATE TABLE `Division` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `parentId` INTEGER NULL,
    `collaborators` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `ambassadorName` VARCHAR(100) NULL,

    UNIQUE INDEX `Division_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Division` ADD CONSTRAINT `Division_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Division`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
