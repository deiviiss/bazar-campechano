ALTER TABLE "categories"
ALTER COLUMN "name" TYPE VARCHAR(255)
USING "name"::TEXT;

--  Make sure the `name` column is unique (optional, if there are duplicates, resolve them before)
ALTER TABLE "categories"
ADD CONSTRAINT "categories_name_unique" UNIQUE ("name");

-- Drop the enum type if it's no longer needed
DROP TYPE IF EXISTS "CategoryName";