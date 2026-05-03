/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be preserved in the new `roles` table.
*/

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- Seed roles
INSERT INTO "roles" ("name") VALUES ('ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO "roles" ("name") VALUES ('EMPLOYEE') ON CONFLICT DO NOTHING;

-- Add nullable roleId before migrating values
ALTER TABLE "users" ADD COLUMN "roleId" INTEGER;

-- Copy user role values into roleId
UPDATE "users"
SET "roleId" = (
  SELECT "id"
  FROM "roles"
  WHERE "roles"."name" = "users"."role"::text
);

-- Default missing values
UPDATE "users"
SET "roleId" = (
  SELECT "id" FROM "roles" WHERE "name" = 'EMPLOYEE'
)
WHERE "roleId" IS NULL;

-- Enforce relationship
ALTER TABLE "users" ALTER COLUMN "roleId" SET NOT NULL;
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Remove old role column and enum type
ALTER TABLE "users" DROP COLUMN "role";
DROP TYPE "Role";
