-- CreateTable
CREATE TABLE "nfts" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nfts_pkey" PRIMARY KEY ("id")
);
