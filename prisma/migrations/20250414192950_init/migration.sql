-- CreateEnum
CREATE TYPE "course" AS ENUM ('IT', 'ELECTRICALS', 'MATHEMATICS', 'PHYSICS');

-- CreateEnum
CREATE TYPE "examType" AS ENUM ('midsem', 'final', 'quiz', 'other', 'assignment', 'practicequestions', 'national', 'entrance');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "tokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fileUpload" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "course" "course" NOT NULL,
    "file" TEXT[],
    "examType" "examType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_studentId_key" ON "user"("studentId");
