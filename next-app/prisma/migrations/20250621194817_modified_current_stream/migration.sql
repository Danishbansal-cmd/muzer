/*
  Warnings:

  - The primary key for the `CurrentStream` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `CurrentStream` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "CurrentStream" DROP CONSTRAINT "CurrentStream_streamId_fkey";

-- AlterTable
ALTER TABLE "CurrentStream" DROP CONSTRAINT "CurrentStream_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "streamId" DROP NOT NULL,
ADD CONSTRAINT "CurrentStream_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "CurrentStream" ADD CONSTRAINT "CurrentStream_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE SET NULL ON UPDATE CASCADE;
