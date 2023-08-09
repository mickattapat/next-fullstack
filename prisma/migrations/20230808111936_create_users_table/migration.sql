/*
  Warnings:

  - You are about to drop the column `fillname` on the `users` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `fillname`,
    ADD COLUMN `fullname` VARCHAR(255) NOT NULL;
