-- more-urls
ALTER TABLE "meta" DROP COLUMN "moreUrls";

-- pgroonga
DROP INDEX "public"."IDX_f27f5d88941e57442be75ba9c8";
DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c";
DROP INDEX "public"."IDX_fcb770976ff8240af5799e3ffc";
DROP EXTENSION pgroonga CASCADE;

-- emoji-moderator
ALTER TABLE "user" DROP COLUMN "emojiModPerm";
DROP TYPE "public"."user_emojimodperm_enum";
