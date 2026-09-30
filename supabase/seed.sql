SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict miJgP9nSYWamwFyIXRm4zg0WTSl7qTLKmEYRTMGIJLeAcC6DmiEXZqaiu9mKU90

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: banks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."banks" ("id", "name", "slug", "deferment_phone", "deferment_hours", "deferment_url", "logo_url", "hq", "assets_bn", "rank", "is_active", "created_at", "updated_at") VALUES
	('a65842d4-ad69-47a1-98cb-95ef43924cad', 'JPMorgan Chase', 'jpmorgan-chase', '1-800-935-9935', NULL, NULL, NULL, 'New York, NY', 3868.24, 1, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('00a9e86c-008a-475a-8557-21c47363a4ec', 'Bank of America', 'bank-of-america', '1-800-432-1000', NULL, NULL, NULL, 'Charlotte, NC', 3123.20, 2, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('d1a02f2b-464a-493a-96d8-89ec02ce6342', 'Citigroup', 'citigroup', '1-800-374-9700', NULL, NULL, NULL, 'New York, NY', 2423.68, 3, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('da52ce8e-c8c2-41a4-a383-41892d6495b8', 'Wells Fargo', 'wells-fargo', '1-800-869-3557', NULL, NULL, NULL, 'San Francisco, CA', 1876.32, 4, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('76bf1785-ee4a-45f1-97fe-8e4815313a61', 'Goldman Sachs', 'goldman-sachs', '1-800-323-5678', NULL, NULL, NULL, 'New York, NY', 1571.39, 5, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('6f1ae62b-a48f-4c85-9386-a0a2475cac99', 'Morgan Stanley', 'morgan-stanley', '1-800-688-6896', NULL, NULL, NULL, 'New York, NY', 1164.91, 6, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('bda2ca31-94b8-4501-b0ce-8609728c004d', 'U.S. Bancorp', 'us-bancorp', '1-800-872-2657', NULL, NULL, NULL, 'Minneapolis, MN', 680.83, 7, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('64f7af08-f2a0-40c5-af73-8144b7fabfe4', 'PNC Financial Services', 'pnc-financial-services', '1-888-762-2265', NULL, NULL, NULL, 'Pittsburgh, PA', 558.22, 8, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('4dd7b26f-4e2d-4f1c-ac4d-ab5a6806c343', 'Truist Financial', 'truist-financial', '1-844-487-8478', NULL, NULL, NULL, 'Charlotte, NC', 554.55, 9, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('fa195a44-35d1-43b9-b6a0-359247405191', 'TD Group US Holding', 'td-group-us-holding', '1-888-751-9000', NULL, NULL, NULL, 'Wilmington, DE', 516.13, 10, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('047b0720-2c89-4ff7-8aad-c45cf28273bc', 'Charles Schwab', 'charles-schwab', '1-800-435-4000', NULL, NULL, NULL, 'San Francisco, CA', 511.51, 11, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('c8f1a3ca-4107-41ae-9e7e-fa3b4cd98958', 'Capital One', 'capital-one', '1-877-383-4802', NULL, NULL, NULL, 'McLean, VA', 467.80, 12, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('a5a43b01-5350-4933-8571-52e52616fb05', 'Bank of New York Mellon', 'bank-of-new-york-mellon', '1-212-495-1784', NULL, NULL, NULL, 'New York, NY', 430.38, 13, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('0ac136ac-d6e9-4a78-97f5-9baa7d75649e', 'State Street Corporation', 'state-street-corporation', '1-617-786-3000', NULL, NULL, NULL, 'Boston, MA', 294.56, 14, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('96313663-8c83-44e4-a044-20f1afe64570', 'BMO Financial Corp', 'bmo-financial-corp', '1-877-225-5266', NULL, NULL, NULL, 'Wilmington, DE', 293.09, 15, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('59f0b91e-d583-44d0-ba37-cdfa8e38f559', 'American Express', 'american-express', '1-800-528-4800', NULL, NULL, NULL, 'New York, NY', 244.90, 16, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('587111dd-61d2-4d79-905e-8328894c7b71', 'HSBC North America', 'hsbc-north-america', '1-800-975-4722', NULL, NULL, NULL, 'New York, NY', 223.66, 17, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('6b664e11-6849-4412-bf68-9f6cc409b0f3', 'Citizens Financial Group', 'citizens-financial-group', '1-800-922-9999', NULL, NULL, NULL, 'Providence, RI', 223.47, 18, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('67d5970b-9ee0-47d3-8306-9866752be723', 'First Citizens Bancshares', 'first-citizens-bancshares', '1-888-323-4732', NULL, NULL, NULL, 'Raleigh, NC', 209.50, 19, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('a033fde2-dc78-4976-8a6a-6e74fad01c7f', 'M&T Bank', 'mt-bank', '1-800-724-2440', NULL, NULL, NULL, 'Buffalo, NY', 207.67, 20, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('b28bae45-0484-4bd2-9530-c80015a133c7', 'Fifth Third Bancorp', 'fifth-third-bancorp', '1-800-972-3030', NULL, NULL, NULL, 'Cincinnati, OH', 207.28, 21, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('c521170b-ca37-4c86-8fff-cab67e6566df', 'USAA', 'usaa', '1-800-531-8722', NULL, NULL, NULL, 'San Antonio, TX', 206.56, 22, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('77a96d56-1c3b-40bc-9166-ccdb7811b64e', 'Ally Financial', 'ally-financial', '1-877-247-2559', NULL, NULL, NULL, 'Detroit, MI', 197.24, 23, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('e964fe2b-2264-40d6-bc9e-252004c1e352', 'UBS Americas Holding', 'ubs-americas-holding', '1-800-354-9103', NULL, NULL, NULL, 'New York, NY', 195.83, 24, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('c68cc6a9-fb64-4e93-ad8c-4af9cd26cd9d', 'KeyCorp', 'keycorp', '1-800-539-2968', NULL, NULL, NULL, 'Cleveland, OH', 195.21, 25, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('34663252-afb5-4a44-b89a-e468e97db19a', 'Barclays US LLC', 'barclays-us-llc', '1-888-710-8756', NULL, NULL, NULL, 'New York, NY', 190.71, 26, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('a7acd85a-6e3d-4e79-91e5-a9aa752c56fa', 'Huntington Bancshares', 'huntington-bancshares', '1-800-480-2265', NULL, NULL, NULL, 'Columbus, OH', 188.51, 27, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('d6234281-f6a8-4976-a717-6ba7c1d20cfc', 'Santander Holdings USA', 'santander-holdings-usa', '1-877-768-2265', NULL, NULL, NULL, 'Boston, MA', 170.82, 28, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('aeaa50ed-e44c-4c72-904a-fe2e7081a825', 'Ameriprise Financial', 'ameriprise-financial', '1-800-862-7919', NULL, NULL, NULL, 'Minneapolis, MN', 169.79, 29, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('878083ea-27fd-4197-95ab-725647018e3f', 'RBC US Group Holdings', 'rbc-us-group-holdings', '1-800-769-2511', NULL, NULL, NULL, 'New York, NY', 165.94, 30, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('41ced27f-841d-4120-8227-65240f6924bf', 'Northern Trust', 'northern-trust', '1-888-289-6542', NULL, NULL, NULL, 'Chicago, IL', 156.75, 31, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('1e15463f-90cc-4cb9-bb93-14fed177eed8', 'Regions Financial', 'regions-financial', '1-800-734-4667', NULL, NULL, NULL, 'Birmingham, AL', 155.88, 32, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('292b135b-18ed-4b73-8f43-32901256b467', 'Discover Financial', 'discover-financial', '1-800-347-2683', NULL, NULL, NULL, 'Riverwoods, IL', 138.08, 33, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('a7617532-f199-4dbc-a388-1b01e48fa353', 'New York Community Bancorp', 'new-york-community-bancorp', '1-877-786-6560', NULL, NULL, NULL, 'Westbury, NY', 118.80, 34, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('6d38ec9a-078e-44ab-aca3-4eb5ed761220', 'Synchrony Financial', 'synchrony-financial', '1-866-226-5638', NULL, NULL, NULL, 'Stamford, CT', 108.70, 35, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('5f48d42d-e818-409b-8522-5a37d1843d39', 'DB USA Corporation', 'db-usa-corporation', '1-800-548-7878', NULL, NULL, NULL, 'New York, NY', 108.50, 36, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('f14130d6-bab0-423a-bad9-66f59c0d05e2', 'Comerica', 'comerica', '1-800-266-3742', NULL, NULL, NULL, 'Dallas, TX', 90.99, 37, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('6068d7c1-f606-42be-aed1-43855cff2e57', 'Zions Bancorporation', 'zions-bancorporation', '1-800-974-8660', NULL, NULL, NULL, 'Salt Lake City, UT', 87.23, 38, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('4fa4893e-8859-418b-ba3f-9b3d3e0526dd', 'First Horizon', 'first-horizon', '1-800-382-5465', NULL, NULL, NULL, 'Memphis, TN', 85.07, 39, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('5a5ee082-4ccc-42c0-8ce0-eb3d20c26289', 'Mizuho Americas', 'mizuho-americas', '1-212-282-3000', NULL, NULL, NULL, 'New York, NY', 82.31, 40, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('9829fe08-f9e4-453a-90ff-eb676618386b', 'Raymond James Financial', 'raymond-james-financial', '1-800-248-8863', NULL, NULL, NULL, 'St. Petersburg, FL', 77.63, 41, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('5f1b20be-0649-47de-a12a-fb6bcf4637da', 'Webster Financial', 'webster-financial', '1-800-325-2424', NULL, NULL, NULL, 'Stamford, CT', 74.04, 42, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('ae9b89c0-0ddc-4785-ae10-9e1915a23f82', 'Popular, Inc.', 'popular-inc', '1-800-981-7011', NULL, NULL, NULL, 'San Juan, PR', 70.84, 43, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('e46bd62e-3ebe-4f8c-aa30-8c4a09e34543', 'East West Bancorp', 'east-west-bancorp', '1-888-895-5650', NULL, NULL, NULL, 'Pasadena, CA', 68.53, 44, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('1b5686ca-09dc-4e86-82ce-2cd52aca9d8a', 'CIBC Bancorp USA', 'cibc-bancorp-usa', '1-800-990-2422', NULL, NULL, NULL, 'Chicago, IL', 68.19, 45, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('debd2896-7288-40da-a352-11bfa9eeb81f', 'Western Alliance Bancorp', 'western-alliance-bancorp', '1-602-389-3500', NULL, NULL, NULL, 'Phoenix, AZ', 68.16, 46, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('a42f04bb-4ce5-4900-bf28-4c26f9f00b71', 'Valley National Bancorp', 'valley-national-bancorp', '1-800-522-4100', NULL, NULL, NULL, 'New York, NY', 61.70, 47, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('d6680565-c332-4f62-a9f0-f2da5febea3e', 'Synovus Financial', 'synovus-financial', '1-888-796-6887', NULL, NULL, NULL, 'Columbus, GA', 60.66, 48, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('57d09654-614b-459d-a7da-a9993ac54a64', 'John Deere Capital', 'john-deere-capital', '1-800-275-5322', NULL, NULL, NULL, 'Middleton, WI', 56.95, 49, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00'),
	('22a56772-29f7-4d0a-8263-fb5e2050df53', 'Wintrust Financial', 'wintrust-financial', '1-847-939-9000', NULL, NULL, NULL, 'Rosemont, IL', 54.29, 50, true, '2026-04-24 05:06:13.45322+00', '2026-04-24 05:06:13.45322+00');


--
-- PostgreSQL database dump complete
--

-- \unrestrict miJgP9nSYWamwFyIXRm4zg0WTSl7qTLKmEYRTMGIJLeAcC6DmiEXZqaiu9mKU90

RESET ALL;
