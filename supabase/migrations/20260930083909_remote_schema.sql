SET local check_function_bodies = off;

CREATE TABLE "public"."banks" (
  "id"              uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"            text                     NOT NULL,
  "slug"            text                     NOT NULL,
  "deferment_phone" text,
  "deferment_hours" text,
  "deferment_url"   text,
  "logo_url"        text,
  "hq"              text,
  "assets_bn"       numeric,
  "rank"            smallint,
  "is_active"       boolean                  NOT NULL DEFAULT true,
  "created_at"      timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"      timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "banks_pkey" PRIMARY KEY (id),
  CONSTRAINT "banks_slug_key" UNIQUE (slug)
);

ALTER TABLE "public"."banks"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."call_records" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"             uuid                     NOT NULL,
  "lead_id"             text                     NOT NULL,
  "pearl_id"            text                     NOT NULL,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "bank_name"           text                     NOT NULL,
  "bank_phone"          text                     NOT NULL,
  "acct_type"           text                     NOT NULL,
  "acct_num_last_4"     character(4)             NOT NULL,
  "conversation_status" smallint,
  "call_status"         smallint,
  "post_call_summary"   text,
  "documents_required"  text,
  "next_steps"          text,
  "bank_id"             uuid                     NOT NULL,
  CONSTRAINT "call_records_acct_num_last_4_check" CHECK ((acct_num_last_4 ~ '^\d{4}$'::text)),
  CONSTRAINT "call_records_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."call_records"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."counterparties" (
  "id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"      uuid                     NOT NULL,
  "bank_id"      uuid,
  "display_name" text                     NOT NULL,
  "account_type" text                     NOT NULL,
  "last4"        text,
  "source"       text                     NOT NULL DEFAULT 'manual'::text,
  "created_at"   timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "counterparties_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."counterparties"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."oauth_state" (
  "nonce"      text                     NOT NULL,
  "to_email"   text[]                   NOT NULL,
  "subject"    text                     NOT NULL,
  "body"       text                     NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "oauth_state_pkey" PRIMARY KEY (nonce)
);

ALTER TABLE "public"."oauth_state"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."situations" (
  "user_id"                      uuid                     NOT NULL,
  "situation"                    text                     NOT NULL,
  "situation_details"            text,
  "situation_start_date"         date,
  "expected_resolution_date"     date,
  "monthly_income_before"        numeric(12,2),
  "monthly_income_current"       numeric(12,2),
  "desired_outcome"              text                     NOT NULL,
  "preferred_communication_tone" text                     NOT NULL,
  "updated_at"                   timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "situations_pkey" PRIMARY KEY (user_id),
  CONSTRAINT "situations_situation_details_check" CHECK ((char_length(situation_details) <= 1000))
);

ALTER TABLE "public"."situations"
  ENABLE ROW LEVEL SECURITY;

CREATE TYPE "public"."call_outcome_t" AS ENUM (
  'options_gathered',
  'user_must_call',
  'no_programs',
  'wrong_department'
);

ALTER TABLE "public"."call_records"
  ADD COLUMN "call_outcome" public.call_outcome_t;

CREATE TYPE "public"."internal_status_t" AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'failed',
  'cancelled'
);

ALTER TABLE "public"."call_records"
  ADD COLUMN "status" public.internal_status_t NOT NULL DEFAULT 'pending'::public.internal_status_t;

CREATE OR REPLACE FUNCTION public.set_updated_at()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

ALTER TABLE "public"."call_records"
  ADD CONSTRAINT "call_records_bank_id_fkey" FOREIGN KEY (bank_id) REFERENCES public.banks(id);

ALTER TABLE "public"."call_records"
  ADD CONSTRAINT "call_records_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."counterparties"
  ADD CONSTRAINT "counterparties_bank_id_fkey" FOREIGN KEY (bank_id) REFERENCES public.banks(id) ON DELETE SET NULL;

ALTER TABLE "public"."counterparties"
  ADD CONSTRAINT "counterparties_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."situations"
  ADD CONSTRAINT "situations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX banks_is_active_idx ON public.banks USING btree (is_active);

CREATE INDEX banks_name_idx ON public.banks USING gin (to_tsvector('english'::regconfig, name));

CREATE INDEX banks_rank_idx ON public.banks USING btree (rank);

CREATE INDEX banks_slug_idx ON public.banks USING btree (slug);

CREATE INDEX call_records_created_at_idx ON public.call_records USING btree (created_at DESC);

CREATE UNIQUE INDEX call_records_lead_pearl_uniq ON public.call_records USING btree (lead_id, pearl_id);

CREATE INDEX call_records_status_idx ON public.call_records USING btree (status);

CREATE INDEX call_records_user_id_idx ON public.call_records USING btree (user_id);

CREATE INDEX call_records_user_status_idx ON public.call_records USING btree (user_id, status);

CREATE INDEX counterparties_user_id_idx ON public.counterparties USING btree (user_id);

CREATE TRIGGER trg_call_records_updated_at
  BEFORE UPDATE ON public.call_records
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Banks are publicly readable" ON "public"."banks"
  FOR SELECT
  TO PUBLIC
  USING ((is_active = true));

CREATE POLICY "Users can insert their own call records" ON "public"."call_records"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can view their own call records" ON "public"."call_records"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can delete their own counterparties" ON "public"."counterparties"
  FOR DELETE
  TO PUBLIC
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can insert their own counterparties" ON "public"."counterparties"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can update their own counterparties" ON "public"."counterparties"
  FOR UPDATE
  TO PUBLIC
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can view their own counterparties" ON "public"."counterparties"
  FOR SELECT
  TO PUBLIC
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can delete their own situation" ON "public"."situations"
  FOR DELETE
  TO PUBLIC
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can insert their own situation" ON "public"."situations"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can update their own situation" ON "public"."situations"
  FOR UPDATE
  TO PUBLIC
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can view their own situation" ON "public"."situations"
  FOR SELECT
  TO PUBLIC
  USING ((auth.uid() = user_id));

ALTER PUBLICATION "supabase_realtime" ADD TABLE "public"."call_records";

COMMENT ON TABLE "public"."call_records" IS 'Records of third-party call results per user, tracked through status for frontend realtime updates.';

GRANT EXECUTE ON FUNCTION "public"."set_updated_at"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."banks" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."call_records" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."counterparties" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."oauth_state" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."situations" TO "anon", "authenticated", "postgres", "service_role";

GRANT USAGE ON TYPE "public"."call_outcome_t" TO "postgres";

GRANT USAGE ON TYPE "public"."internal_status_t" TO "postgres";

