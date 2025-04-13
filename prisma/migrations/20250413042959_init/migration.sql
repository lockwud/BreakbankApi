/*
  Warnings:

  - The values [Midsem,Final,Quiz,Other,Assignment,PracticeQuestions,National,Entrance] on the enum `examType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "examType_new" AS ENUM ('midsem', 'final', 'quiz', 'other', 'assignment', 'practicequestions', 'national', 'entrance');
ALTER TABLE "fileUpload" ALTER COLUMN "examType" TYPE "examType_new" USING ("examType"::text::"examType_new");
ALTER TYPE "examType" RENAME TO "examType_old";
ALTER TYPE "examType_new" RENAME TO "examType";
DROP TYPE "examType_old";
COMMIT;
