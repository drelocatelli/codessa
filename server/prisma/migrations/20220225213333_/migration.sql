/*
  Warnings:

  - You are about to drop the column `postId` on the `categorie` table. All the data in the column will be lost.
  - Added the required column `categorieId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categorie` DROP FOREIGN KEY `Categorie_postId_fkey`;

-- AlterTable
ALTER TABLE `categorie` DROP COLUMN `postId`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `categorieId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
