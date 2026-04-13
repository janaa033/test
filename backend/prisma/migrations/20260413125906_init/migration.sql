-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "store" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "price" DOUBLE PRECISION,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_phone_key" ON "Driver"("phone");
