-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('PENDING', 'STARTED', 'FAILED', 'QEUED');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'STARTED', 'FAILED');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "report_id" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images_url" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "status" "VideoStatus" DEFAULT 'PENDING',
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspectDetails" (
    "id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "timestamps" TIMESTAMP(3)[],

    CONSTRAINT "SuspectDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToTarget" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectToTarget_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProjectToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectToVideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_report_id_key" ON "Project"("report_id");

-- CreateIndex
CREATE INDEX "_ProjectToTarget_B_index" ON "_ProjectToTarget"("B");

-- CreateIndex
CREATE INDEX "_ProjectToVideo_B_index" ON "_ProjectToVideo"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspectDetails" ADD CONSTRAINT "SuspectDetails_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspectDetails" ADD CONSTRAINT "SuspectDetails_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspectDetails" ADD CONSTRAINT "SuspectDetails_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTarget" ADD CONSTRAINT "_ProjectToTarget_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTarget" ADD CONSTRAINT "_ProjectToTarget_B_fkey" FOREIGN KEY ("B") REFERENCES "Target"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToVideo" ADD CONSTRAINT "_ProjectToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToVideo" ADD CONSTRAINT "_ProjectToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
