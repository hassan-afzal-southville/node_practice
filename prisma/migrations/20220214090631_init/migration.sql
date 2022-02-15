-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT,
ALTER COLUMN "username" DROP NOT NULL;
