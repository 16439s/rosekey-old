-- emoji-moderator
ALTER TABLE "user" DROP COLUMN "emojiModPerm";
DROP TYPE "public"."user_emojimodperm_enum";

-- remove sso
ALTER TABLE "meta" ADD COLUMN "discordClientSecret" character varying(128);
ALTER TABLE "meta" ADD COLUMN "discordClientId" character varying(128);
ALTER TABLE "meta" ADD COLUMN "enableDiscordIntegration" boolean DEFAULT false NOT NULL;
ALTER TABLE "meta" ADD COLUMN "githubClientSecret" character varying(128);
ALTER TABLE "meta" ADD COLUMN "githubClientId" character varying(128);
ALTER TABLE "meta" ADD COLUMN "enableGithubIntegration" boolean DEFAULT false NOT NULL;
ALTER TABLE "meta" ADD COLUMN "twitterConsumerSecret" character varying(128);
ALTER TABLE "meta" ADD COLUMN "twitterConsumerKey" character varying(128);
ALTER TABLE "meta" ADD COLUMN "enableTwitterIntegration" boolean DEFAULT false NOT NULL;
ALTER TABLE "user_profile" ADD "integrations" jsonb NOT NULL DEFAULT '{}';
