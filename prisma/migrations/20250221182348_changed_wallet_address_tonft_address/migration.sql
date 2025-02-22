/*
  Warnings:

  - You are about to drop the column `walletAddress` on the `nfts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "nfts" DROP COLUMN "walletAddress",
ADD COLUMN     "nftAddress" TEXT;
