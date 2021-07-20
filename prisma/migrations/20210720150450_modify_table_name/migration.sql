/*
  Warnings:

  - You are about to drop the `AssignTaskToParticipants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BelongToPairs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BelongToTeams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssignTaskToParticipants" DROP CONSTRAINT "AssignTaskToParticipants_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "AssignTaskToParticipants" DROP CONSTRAINT "AssignTaskToParticipants_task_id_fkey";

-- DropForeignKey
ALTER TABLE "AssignTaskToParticipants" DROP CONSTRAINT "AssignTaskToParticipants_task_status_id_fkey";

-- DropForeignKey
ALTER TABLE "BelongToPairs" DROP CONSTRAINT "BelongToPairs_pair_id_fkey";

-- DropForeignKey
ALTER TABLE "BelongToPairs" DROP CONSTRAINT "BelongToPairs_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "BelongToTeams" DROP CONSTRAINT "BelongToTeams_pair_id_fkey";

-- DropForeignKey
ALTER TABLE "BelongToTeams" DROP CONSTRAINT "BelongToTeams_team_id_fkey";

-- DropTable
DROP TABLE "AssignTaskToParticipants";

-- DropTable
DROP TABLE "BelongToPairs";

-- DropTable
DROP TABLE "BelongToTeams";

-- CreateTable
CREATE TABLE "belong_to_teams" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "pair_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "belong_to_pairs" (
    "id" SERIAL NOT NULL,
    "pair_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assign_task_to_participants" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "task_status_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "belong_to_teams" ADD FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "belong_to_teams" ADD FOREIGN KEY ("pair_id") REFERENCES "pairs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "belong_to_pairs" ADD FOREIGN KEY ("pair_id") REFERENCES "pairs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "belong_to_pairs" ADD FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_task_to_participants" ADD FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_task_to_participants" ADD FOREIGN KEY ("task_status_id") REFERENCES "task_statuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_task_to_participants" ADD FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
