/*
  Warnings:

  - Added the required column `examType` to the `fileUpload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fileUpload" ADD COLUMN     "examType" "examType" NOT NULL;
