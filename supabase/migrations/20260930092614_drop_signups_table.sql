-- The marketing waitlist (see 20260306142838_create_signups_table.sql) was an
-- experiment and has been removed from the app. Dropping the table also drops
-- its index and RLS policies. This permanently deletes the collected sign-ups,
-- so export them first if they are still wanted.
drop table if exists public.signups;
