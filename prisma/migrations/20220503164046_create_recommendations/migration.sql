-- CreateTable
CREATE TABLE "recommendations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "youtubeLink" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recommendations_name_key" ON "recommendations"("name");

INSERT INTO "recommendations" ("name","youtubeLink") VALUES ('Nightmara','https://www.youtube.com/watch?v=94bGzWyHbu0');