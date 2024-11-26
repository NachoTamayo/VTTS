--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

--DROP DATABASE "VTTS";
--DROP DATABASE mydb;




--
-- Drop roles
--

--DROP ROLE postgres;


--
-- Roles
--

--CREATE ROLE postgres;
-- ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Ng74sVdhF5+IWAbtpqnuaQ==$Uj41Z4HN4/38BFqfyZvWj7XeH8CKDybAGy8/XlzJWUM=:U/q6OxJUQuA11NLRKZhjsjd4ryvm65TLsAU7FZNsZRE=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- --SET transaction_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
-- DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

-- CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


-- ALTER DATABASE template1 OWNER TO postgres;

-- \connect template1

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- --SET transaction_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

-- COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

-- ALTER DATABASE template1 IS_TEMPLATE = true;


-- \connect template1

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- --SET transaction_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

-- REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
-- GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "VTTS" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- --SET transaction_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

--
-- Name: VTTS; Type: DATABASE; Schema: -; Owner: postgres
--

--CREATE DATABASE "VTTS";


-- ALTER DATABASE "VTTS" OWNER TO postgres;

-- \connect "VTTS"

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- --SET transaction_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- SET default_tablespace = '';

-- SET default_table_access_method = heap;

-- --
-- -- Name: ForecastStatus; Type: TABLE; Schema: public; Owner: postgres
-- --

CREATE TABLE public."ForecastStatus" (
    id integer NOT NULL,
    status text NOT NULL,
    description text
);


ALTER TABLE public."ForecastStatus" OWNER TO postgres;

--
-- Name: ForecastStatusRules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ForecastStatusRules" (
    id integer NOT NULL,
    "statusFrom" integer NOT NULL,
    "statusTo" integer NOT NULL
);


ALTER TABLE public."ForecastStatusRules" OWNER TO postgres;

--
-- Name: ForecastStatusRules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ForecastStatusRules_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ForecastStatusRules_id_seq" OWNER TO postgres;

--
-- Name: ForecastStatusRules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ForecastStatusRules_id_seq" OWNED BY public."ForecastStatusRules".id;


--
-- Name: ForecastStatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ForecastStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ForecastStatus_id_seq" OWNER TO postgres;

--
-- Name: ForecastStatus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ForecastStatus_id_seq" OWNED BY public."ForecastStatus".id;


--
-- Name: RelatedSr; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RelatedSr" (
    id integer NOT NULL,
    "srNumber1" integer NOT NULL,
    "srNumber2" integer NOT NULL,
    "linkedBy" integer NOT NULL
);


ALTER TABLE public."RelatedSr" OWNER TO postgres;

--
-- Name: RelatedSr_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RelatedSr_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RelatedSr_id_seq" OWNER TO postgres;

--
-- Name: RelatedSr_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RelatedSr_id_seq" OWNED BY public."RelatedSr".id;


--
-- Name: ReleaseVersion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReleaseVersion" (
    id integer NOT NULL,
    app integer NOT NULL,
    "releaseVersion" integer NOT NULL,
    "testDeadline" timestamp(3) without time zone,
    stage integer NOT NULL
);


ALTER TABLE public."ReleaseVersion" OWNER TO postgres;

--
-- Name: ReleaseVersion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ReleaseVersion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReleaseVersion_id_seq" OWNER TO postgres;

--
-- Name: ReleaseVersion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ReleaseVersion_id_seq" OWNED BY public."ReleaseVersion".id;


--
-- Name: Resolution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Resolution" (
    id integer NOT NULL,
    "srNumber" integer NOT NULL,
    assigned integer NOT NULL,
    "resolutionDate" timestamp(3) without time zone,
    comments text
);


ALTER TABLE public."Resolution" OWNER TO postgres;

--
-- Name: Resolution_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Resolution_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Resolution_id_seq" OWNER TO postgres;

--
-- Name: Resolution_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Resolution_id_seq" OWNED BY public."Resolution".id;


--
-- Name: ServiceRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ServiceRequest" (
    id integer NOT NULL,
    "srType" integer NOT NULL,
    "srNumber" text NOT NULL,
    description text,
    "externalLink" text,
    "dataTestPath" text,
    "trelloLink" text,
    "lastTester" integer,
    "statusSr" text NOT NULL
);


ALTER TABLE public."ServiceRequest" OWNER TO postgres;

--
-- Name: ServiceRequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ServiceRequest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ServiceRequest_id_seq" OWNER TO postgres;

--
-- Name: ServiceRequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ServiceRequest_id_seq" OWNED BY public."ServiceRequest".id;


--
-- Name: SrType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SrType" (
    id integer NOT NULL,
    "srType" text NOT NULL,
    description text
);


ALTER TABLE public."SrType" OWNER TO postgres;

--
-- Name: SrType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SrType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SrType_id_seq" OWNER TO postgres;

--
-- Name: SrType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SrType_id_seq" OWNED BY public."SrType".id;


--
-- Name: StageVersion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StageVersion" (
    id integer NOT NULL,
    stage text NOT NULL
);


ALTER TABLE public."StageVersion" OWNER TO postgres;

--
-- Name: StageVersion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StageVersion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StageVersion_id_seq" OWNER TO postgres;

--
-- Name: StageVersion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StageVersion_id_seq" OWNED BY public."StageVersion".id;


--
-- Name: SystemVersion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SystemVersion" (
    id integer NOT NULL,
    app integer NOT NULL,
    version text NOT NULL,
    "deliveryDate" timestamp(3) without time zone
);


ALTER TABLE public."SystemVersion" OWNER TO postgres;

--
-- Name: SystemVersion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SystemVersion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SystemVersion_id_seq" OWNER TO postgres;

--
-- Name: SystemVersion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SystemVersion_id_seq" OWNED BY public."SystemVersion".id;


--
-- Name: TestAttachedInfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TestAttachedInfo" (
    id integer NOT NULL,
    "idTestPssSystem" integer NOT NULL,
    "fileName" text NOT NULL
);


ALTER TABLE public."TestAttachedInfo" OWNER TO postgres;

--
-- Name: TestAttachedInfo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TestAttachedInfo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TestAttachedInfo_id_seq" OWNER TO postgres;

--
-- Name: TestAttachedInfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TestAttachedInfo_id_seq" OWNED BY public."TestAttachedInfo".id;


--
-- Name: TestPssSystem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TestPssSystem" (
    id integer NOT NULL,
    "srNumber" integer NOT NULL,
    assigned integer,
    status integer,
    "dateTest" timestamp(3) without time zone,
    comments character varying(1024),
    "dateModification" timestamp(3) without time zone,
    "releaseNote" text,
    "windchillComment" text,
    "releaseVersion" integer NOT NULL
);


ALTER TABLE public."TestPssSystem" OWNER TO postgres;

--
-- Name: TestPssSystem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TestPssSystem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TestPssSystem_id_seq" OWNER TO postgres;

--
-- Name: TestPssSystem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TestPssSystem_id_seq" OWNED BY public."TestPssSystem".id;


--
-- Name: TestStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TestStatus" (
    id integer NOT NULL,
    "idStatus" text NOT NULL,
    "descStatus" text,
    "isFailed" text,
    "displayOrder" integer NOT NULL
);


ALTER TABLE public."TestStatus" OWNER TO postgres;

--
-- Name: TestStatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TestStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TestStatus_id_seq" OWNER TO postgres;

--
-- Name: TestStatus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TestStatus_id_seq" OWNED BY public."TestStatus".id;


--
-- Name: VersionForecast; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VersionForecast" (
    id integer NOT NULL,
    version integer NOT NULL,
    "srNumber" integer NOT NULL,
    "dateModification" timestamp(3) without time zone,
    assigned integer,
    status integer NOT NULL
);


ALTER TABLE public."VersionForecast" OWNER TO postgres;

--
-- Name: VersionForecast_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VersionForecast_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VersionForecast_id_seq" OWNER TO postgres;

--
-- Name: VersionForecast_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VersionForecast_id_seq" OWNED BY public."VersionForecast".id;


--
-- Name: VttsSystem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VttsSystem" (
    id integer NOT NULL,
    app text NOT NULL,
    description text,
    "explorerVersion" text,
    "jreVersion" text
);


ALTER TABLE public."VttsSystem" OWNER TO postgres;

--
-- Name: VttsSystem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VttsSystem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VttsSystem_id_seq" OWNER TO postgres;

--
-- Name: VttsSystem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VttsSystem_id_seq" OWNED BY public."VttsSystem".id;


--
-- Name: VttsUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VttsUser" (
    id integer NOT NULL,
    assigned text NOT NULL,
    "userName" text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    "mailSign" text NOT NULL,
    "dateModification" timestamp(3) without time zone,
    "userModification" text,
    "userMessage" text,
    profile text,
    "srFilter1" character varying(500),
    "srFilter2" character varying(500)
);


ALTER TABLE public."VttsUser" OWNER TO postgres;

--
-- Name: VttsUser_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VttsUser_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VttsUser_id_seq" OWNER TO postgres;

--
-- Name: VttsUser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VttsUser_id_seq" OWNED BY public."VttsUser".id;


--
-- Name: ForecastStatus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ForecastStatus" ALTER COLUMN id SET DEFAULT nextval('public."ForecastStatus_id_seq"'::regclass);


--
-- Name: ForecastStatusRules id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ForecastStatusRules" ALTER COLUMN id SET DEFAULT nextval('public."ForecastStatusRules_id_seq"'::regclass);


--
-- Name: RelatedSr id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelatedSr" ALTER COLUMN id SET DEFAULT nextval('public."RelatedSr_id_seq"'::regclass);


--
-- Name: ReleaseVersion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReleaseVersion" ALTER COLUMN id SET DEFAULT nextval('public."ReleaseVersion_id_seq"'::regclass);


--
-- Name: Resolution id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resolution" ALTER COLUMN id SET DEFAULT nextval('public."Resolution_id_seq"'::regclass);


--
-- Name: ServiceRequest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServiceRequest" ALTER COLUMN id SET DEFAULT nextval('public."ServiceRequest_id_seq"'::regclass);


--
-- Name: SrType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SrType" ALTER COLUMN id SET DEFAULT nextval('public."SrType_id_seq"'::regclass);


--
-- Name: StageVersion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StageVersion" ALTER COLUMN id SET DEFAULT nextval('public."StageVersion_id_seq"'::regclass);


--
-- Name: SystemVersion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SystemVersion" ALTER COLUMN id SET DEFAULT nextval('public."SystemVersion_id_seq"'::regclass);


--
-- Name: TestAttachedInfo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestAttachedInfo" ALTER COLUMN id SET DEFAULT nextval('public."TestAttachedInfo_id_seq"'::regclass);


--
-- Name: TestPssSystem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestPssSystem" ALTER COLUMN id SET DEFAULT nextval('public."TestPssSystem_id_seq"'::regclass);


--
-- Name: TestStatus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestStatus" ALTER COLUMN id SET DEFAULT nextval('public."TestStatus_id_seq"'::regclass);


--
-- Name: VersionForecast id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersionForecast" ALTER COLUMN id SET DEFAULT nextval('public."VersionForecast_id_seq"'::regclass);


--
-- Name: VttsSystem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VttsSystem" ALTER COLUMN id SET DEFAULT nextval('public."VttsSystem_id_seq"'::regclass);


--
-- Name: VttsUser id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VttsUser" ALTER COLUMN id SET DEFAULT nextval('public."VttsUser_id_seq"'::regclass);


--
-- Data for Name: ForecastStatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ForecastStatus" (id, status, description) FROM stdin;
1	READY	READY FOR TEST
2	OK	RESOLVED OK
3	FAILED	FAILED RETEST
4	PLANNED	PLANNED ON VERSION
5	INPROGRESS	RESOLUTION IN PROGRESS
\.


--
-- Data for Name: ForecastStatusRules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ForecastStatusRules" (id, "statusFrom", "statusTo") FROM stdin;
\.


--
-- Data for Name: RelatedSr; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RelatedSr" (id, "srNumber1", "srNumber2", "linkedBy") FROM stdin;
1	3	8	3
2	8	3	3
\.


--
-- Data for Name: ReleaseVersion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ReleaseVersion" (id, app, "releaseVersion", "testDeadline", stage) FROM stdin;
1	1	1	2024-09-25 00:00:00	1
2	1	1	2024-09-25 00:00:00	2
3	1	1	2024-09-25 00:00:00	3
4	1	1	2024-09-25 00:00:00	4
5	1	1	2024-09-25 00:00:00	5
6	1	2	2024-09-25 00:00:00	2
7	1	2	2024-09-25 00:00:00	3
8	1	2	2024-09-25 00:00:00	1
9	1	2	2024-09-25 00:00:00	4
10	1	2	2024-09-25 00:00:00	5
11	1	3	2024-09-25 00:00:00	2
12	1	3	2024-09-25 00:00:00	3
13	1	3	2024-09-25 00:00:00	1
14	1	3	2024-09-25 00:00:00	4
15	1	3	2024-09-25 00:00:00	5
16	1	4	2024-09-25 00:00:00	2
17	1	4	2024-09-25 00:00:00	3
18	1	4	2024-09-25 00:00:00	1
19	1	4	2024-09-25 00:00:00	4
20	1	4	2024-09-25 00:00:00	5
21	2	5	2024-09-25 00:00:00	1
22	2	5	2024-09-25 00:00:00	2
23	2	5	2024-09-25 00:00:00	3
24	2	5	2024-09-25 00:00:00	4
25	2	5	2024-09-25 00:00:00	5
26	2	6	2024-09-25 00:00:00	2
27	2	6	2024-09-25 00:00:00	3
28	2	6	2024-09-25 00:00:00	1
29	2	6	2024-09-25 00:00:00	4
30	2	6	2024-09-25 00:00:00	5
31	2	7	2024-09-25 00:00:00	2
32	2	7	2024-09-25 00:00:00	3
33	2	7	2024-09-25 00:00:00	1
34	2	7	2024-09-25 00:00:00	4
35	2	7	2024-09-25 00:00:00	5
36	2	8	2024-09-25 00:00:00	2
37	2	8	2024-09-25 00:00:00	3
38	2	8	2024-09-25 00:00:00	1
39	2	8	2024-09-25 00:00:00	4
40	2	8	2024-09-25 00:00:00	5
41	3	9	2024-09-25 00:00:00	1
42	3	9	2024-09-25 00:00:00	2
43	3	9	2024-09-25 00:00:00	3
44	3	9	2024-09-25 00:00:00	4
45	3	9	2024-09-25 00:00:00	5
46	3	10	2024-09-25 00:00:00	2
47	3	10	2024-09-25 00:00:00	3
48	3	10	2024-09-25 00:00:00	1
49	3	10	2024-09-25 00:00:00	4
50	3	10	2024-09-25 00:00:00	5
51	3	11	2024-09-25 00:00:00	2
52	3	11	2024-09-25 00:00:00	3
53	3	11	2024-09-25 00:00:00	1
54	3	11	2024-09-25 00:00:00	4
55	3	11	2024-09-25 00:00:00	5
56	3	12	2024-09-25 00:00:00	2
57	3	12	2024-09-25 00:00:00	3
58	3	12	2024-09-25 00:00:00	1
59	3	12	2024-09-25 00:00:00	4
60	3	12	2024-09-26 00:00:00	5
\.


--
-- Data for Name: Resolution; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Resolution" (id, "srNumber", assigned, "resolutionDate", comments) FROM stdin;
\.


--
-- Data for Name: ServiceRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ServiceRequest" (id, "srType", "srNumber", description, "externalLink", "dataTestPath", "trelloLink", "lastTester", "statusSr") FROM stdin;
1	3	ISR.1116	Routine check of the landing gear showed minimal wear.	\N	\N	https://trello.com/b/8BQ4slKy/vtts-v2	3	CLOSED
2	3	ISR.1797	Inspection of hydraulic systems showed optimal performance.	\N	\N	\N	1	CLOSED
3	3	ISR.2673	Aircraft engine temperature analysis completed.	\N	\N	\N	2	CLOSED
4	3	ISR.2947	Cabin pressure control system passed all tests.	\N	\N	\N	7	CLOSED
5	3	ISR.2948	Fuel system diagnostics completed with no issues.	\N	\N	\N	6	CLOSED
6	3	ISR.3474	Review of avionics software shows compliance with standards.	\N	\N	\N	4	CLOSED
7	3	ISR.3771	Navigation system performance exceeds expectations.	\N	\N	\N	5	CLOSED
8	3	ISR.5345	Autopilot calibration tests completed successfully.	\N	\N	\N	3	CLOSED
9	3	ISR.8437	Testing of communication systems showed no issues.	\N	\N	\N	1	CLOSED
10	12	JAVA11.1330	Electrical fault detected in the main control panel.	\N	\N	\N	2	CLOSED
11	12	JAVA11.1661	Review of engine diagnostics system shows minor issues.	\N	\N	\N	7	CLOSED
12	12	JAVA11.3075	Wing structural integrity tests show no damage.	\N	\N	\N	6	CLOSED
13	12	JAVA11.3091	Brake system test performed, no issues found.	\N	\N	\N	4	CLOSED
14	12	JAVA11.3409	Flight performance tests completed successfully.	\N	\N	\N	5	CLOSED
15	12	JAVA11.4264	Hydraulic system pressure levels remained stable.	\N	\N	\N	3	CLOSED
16	12	JAVA11.4290	Engine ignition performance test shows no delay.	\N	\N	\N	1	CLOSED
17	12	JAVA11.4793	Aircraft air conditioning system reviewed with no faults.	\N	\N	\N	2	CLOSED
18	12	JAVA11.5009	Inspection of landing gear lubrication completed.	\N	\N	\N	7	CLOSED
19	12	JAVA11.679	Exhaust system check completed, no damage found.	\N	\N	\N	6	CLOSED
20	12	JAVA11.8432	Pre-flight checks showed optimal fuel system performance.	\N	\N	\N	4	CLOSED
21	12	JAVA11.9965	Air pressure control system showed minor discrepancies.	\N	\N	\N	5	CLOSED
22	11	RSP.1649	Routine fuel system inspection showed no issues.	\N	\N	\N	3	CLOSED
23	11	RSP.1676	Review of flight control system showed some deviations.	\N	\N	\N	1	CLOSED
24	11	RSP.2101	Navigation system passed all performance tests.	\N	\N	\N	2	CLOSED
25	11	RSP.2389	Hydraulic pump pressure remained stable during testing.	\N	\N	\N	7	CLOSED
26	11	RSP.2452	Electrical fault detected in the avionics system.	\N	\N	\N	6	CLOSED
27	11	RSP.285	Brake system test passed with no issues.	\N	\N	\N	4	CLOSED
28	11	RSP.3019	Routine maintenance of wing flaps completed.	\N	\N	\N	5	CLOSED
29	11	RSP.3069	Engine fuel consumption reviewed with optimal results.	\N	\N	\N	3	CLOSED
30	11	RSP.3878	Hydraulic actuator showed signs of wear during inspection.	\N	\N	\N	1	CLOSED
31	11	RSP.4540	Flight performance tests showed minor adjustments needed.	\N	\N	\N	2	CLOSED
32	11	RSP.4600	Landing gear retraction system reviewed with no faults.	\N	\N	\N	7	CLOSED
33	11	RSP.4785	Control surface tests completed successfully.	\N	\N	\N	6	CLOSED
34	11	RSP.5363	Routine checks on the rudder system revealed no anomalies.	\N	\N	\N	4	CLOSED
35	11	RSP.5448	Review of cabin pressure system completed successfully.	\N	\N	\N	5	CLOSED
36	11	RSP.5963	Engine oil pressure remained stable during testing.	\N	\N	\N	3	CLOSED
37	11	RSP.7822	Fuel gauge showed accurate readings during tests.	\N	\N	\N	1	CLOSED
38	11	RSP.8015	Inspection of avionics wiring revealed no issues.	\N	\N	\N	2	CLOSED
39	11	RSP.8243	Brake hydraulics performance was optimal under stress.	\N	\N	\N	7	CLOSED
40	11	RSP.8865	Flap control system operated within normal parameters.	\N	\N	\N	6	CLOSED
41	3	ISR.1234	Revisión del sistema de navegación.	\N	\N	\N	1	OPEN
42	3	ISR.5678	Ajuste de la presión hidráulica.	\N	\N	\N	2	CLOSED
43	3	ISR.9101	Actualización del software de control.	\N	\N	\N	3	PENDING
44	11	RSP.1121	Mantenimiento preventivo de los motores.	\N	\N	\N	4	IN_PROGRESS
45	12	JAVA.3141	Inspección de seguridad del tren de aterrizaje.	\N	\N	\N	5	OPEN
46	3	ISR.5161	Revisión del sistema de navegación.	\N	\N	\N	2	CLOSED
47	3	ISR.7181	Ajuste de la presión hidráulica.	\N	\N	\N	3	PENDING
48	3	ISR.9202	Actualización del software de control.	\N	\N	\N	4	IN_PROGRESS
49	11	RSP.2232	Mantenimiento preventivo de los motores.	\N	\N	\N	1	OPEN
50	12	JAVA.4252	Inspección de seguridad del tren de aterrizaje.	\N	\N	\N	2	CLOSED
51	3	ISR.6272	Revisión del sistema de navegación.	\N	\N	\N	3	PENDING
52	3	ISR.8292	Ajuste de la presión hidráulica.	\N	\N	\N	4	IN_PROGRESS
53	3	ISR.0313	Actualización del software de control.	\N	\N	\N	1	OPEN
54	11	RSP.2333	Mantenimiento preventivo de los motores.	\N	\N	\N	2	CLOSED
55	12	JAVA.4353	Inspección de seguridad del tren de aterrizaje.	\N	\N	\N	3	PENDING
56	3	ISR.6373	Revisión del sistema de navegación.	\N	\N	\N	4	IN_PROGRESS
57	3	ISR.8393	Ajuste de la presión hidráulica.	\N	\N	\N	1	OPEN
58	3	ISR.0414	Actualización del software de control.	\N	\N	\N	2	CLOSED
59	11	RSP.2434	Mantenimiento preventivo de los motores.	\N	\N	\N	3	PENDING
60	12	JAVA.4454	Inspección de seguridad del tren de aterrizaje.	\N	\N	\N	4	IN_PROGRESS
\.


--
-- Data for Name: SrType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SrType" (id, "srType", description) FROM stdin;
1	IE11	INTERNET EXPLORER MIGRATION
2	APPLET	REMOVE APPLET
3	ISR	INTERNAL SERVICE REQUEST - RAISED BY ITP TEAM
4	PSSN	SERVICE REQUEST REQUEST RAISED ON PSSN BY MTU
5	PSSNUK	SERVICE REQUEST REQUEST RAISED ON PSSNUK BY ROLLS
6	PSSE	SERVICE REQUEST REQUEST RAISED ON PSSE BY PC
7	REG_TEST	REGRESSION TESTING ASSOCIATED TO ANY FUNCIONALITY
8	SRV	PSSERVER SERVICE REQUEST
9	SPRT	SPRINT SERVICE REQUEST
10	GC	GOOGLE CHROME MIGRATION
11	RSP	IFRAMES RESPONSIVE
12	JAVA11	JAVA11 MIGRATION
\.


--
-- Data for Name: StageVersion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StageVersion" (id, stage) FROM stdin;
1	F01
2	F02
3	F03
4	F04
5	F05
\.


--
-- Data for Name: SystemVersion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SystemVersion" (id, app, version, "deliveryDate") FROM stdin;
1	1	08.00.00	2024-09-26 21:01:07
2	1	08.01.00	2024-09-26 21:01:07
3	1	09.00.00	2024-09-26 21:01:07
4	1	09.01.00	2024-09-26 21:01:07
5	2	08.00.00	2024-09-26 21:01:07
6	2	08.01.00	2024-09-26 21:01:07
7	2	09.00.00	2024-09-26 21:01:07
8	2	09.01.00	2024-09-26 21:01:07
9	3	08.00.00	2024-09-26 21:01:07
10	3	08.01.00	2024-09-26 21:01:07
11	3	09.00.00	2024-09-26 21:01:07
12	3	09.01.00	2024-09-26 21:01:07
\.


--
-- Data for Name: TestAttachedInfo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TestAttachedInfo" (id, "idTestPssSystem", "fileName") FROM stdin;
1	1	ISR.1116/PEC3_igtamlor.pdf
2	2	ISR.1797/JustificanteCita.pdf
3	3	document_234.doc
4	4	document_831.pdf
5	5	document_99.jpg
6	6	document_573.doc
7	7	document_682.pdf
8	8	document_543.jpg
9	9	document_231.doc
10	10	document_399.pdf
11	11	document_802.jpg
12	12	document_199.doc
13	13	document_652.pdf
14	14	document_574.jpg
15	15	document_323.doc
17	31	RSP.4540/
16	48	Captura de pantalla 2024-09-06 a las 11.27.33.png
\.


--
-- Data for Name: TestPssSystem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TestPssSystem" (id, "srNumber", assigned, status, "dateTest", comments, "dateModification", "releaseNote", "windchillComment", "releaseVersion") FROM stdin;
1	1	3	11	2024-10-09 00:00:00	<p>Bar ever garden boy behavior thing.</p><p>Help commercial ten give.</p><p>Test1</p><p>Test2</p><p>Test3</p><p>Test4</p><p>Test5</p>	2024-10-10 09:16:31.495	no	no	9
2	2	3	\N	2024-09-05 00:00:00	<p>Make indicate buy hold pay throw.</p><p>Trouble today billion. Real page which military onto open million very.</p>	2024-10-11 07:29:00.309	no	no	9
3	3	\N	\N	2024-07-07 00:00:00	<p>Tax step simple attention stuff its let.</p><p>Sport choice set story.</p>	2024-08-26 00:00:00	no	no	9
4	4	2	11	2024-06-25 00:00:00	<p>Most someone sure so still sit may.</p><p>Such question crime stay year this. Themselves one rise heavy sister beyond speak. Name best audience.</p>	2024-07-14 00:00:00	no	no	8
5	5	5	4	2024-08-18 00:00:00	<p>Rest night food though he its brother before.</p><p>Imagine research away establish wear billion right fast. Lose meeting staff right.</p>	2024-07-04 00:00:00	yes	no	10
6	6	4	4	2024-08-28 00:00:00	<p>Against weight financial public meeting real.</p><p>Dark simple seek good. Side travel poor machine scene. Myself actually some find. Stuff respond inside provide.</p>	2024-09-01 00:00:00	no	no	8
7	7	5	11	2024-08-06 00:00:00	<p>Project many investment performance civil enjoy risk for power.</p><p>Watch have material environment group art mention. With difficult almost. Order others point likely.</p>	2024-07-11 00:00:00	no	no	8
8	8	\N	\N	2024-08-01 00:00:00	<p>Race worker dinner around trip current whose stand rest fly for strategy glass.</p><p>Together civil foot leg. Detail five teach religious cup quality stuff ball. News especially help pretty air hospital century.</p>	2024-08-17 00:00:00	no	no	8
9	9	6	4	2024-09-16 00:00:00	<p>Your yet service half break billion data check identify rise carry attack ball.</p><p>Happen eat boy shake. However place interest. Present need rich prevent enter account.</p>	2024-07-24 00:00:00	no	no	8
10	10	3	11	2024-06-22 00:00:00	<p>Ask increase at service smile answer why situation affect commercial ever he.</p><p>Event before attorney performance course personal. Challenge mean all close item garden. Care pressure executive here.</p>	2024-08-13 00:00:00	no	no	9
11	11	\N	\N	2024-07-17 00:00:00	<p>Peace any baby enter why main front both society candidate listen black.</p><p>Other local task range add. Address skill head hit decide sure safe. Religious hard stay.</p>	2024-07-09 00:00:00	no	no	9
12	12	\N	\N	2024-08-29 00:00:00	<p>Question anything your decade final lot.</p><p>House nearly remember sea. White mouth word kind something own. Recognize choice foot your. Not tell add plant.</p>	2024-06-26 00:00:00	no	no	9
13	13	2	11	2024-07-09 00:00:00	<p>World yet inside sure leg must very happy these thought theory.</p><p>Remain particularly which best include though player. Upon through risk but small look not. Various white nice newspaper lawyer majority song.</p>	2024-08-06 00:00:00	no	no	9
14	14	\N	\N	2024-09-09 00:00:00	<p>Seem change condition right receive fall.</p><p>Offer reflect green. Clear such reason hot. Number man late single everybody.</p>	2024-07-27 00:00:00	no	no	10
15	15	\N	\N	2024-07-27 00:00:00	<p>Trial edge ability about approach send.</p><p>Newspaper outside nearly event million. Represent address four investment daughter reflect. President physical issue again together economy eye.</p>	2024-08-06 00:00:00	no	no	8
16	16	\N	\N	2024-07-16 00:00:00	<p>Sport herself pay include your half poor crime have.</p><p>Eat success staff fly cup reflect as. Phone perform first environment couple.</p>	2024-08-19 00:00:00	no	no	8
17	17	\N	\N	2024-08-31 00:00:00	<p>Need social audience letter artist mind party enter test minute sport.</p><p>Theory majority read city enter again whole. Stage outside gas rock. Light stop history majority.</p>	2024-09-04 00:00:00	no	no	8
18	18	\N	\N	2024-07-03 00:00:00	<p>Since alone need suddenly authority part much early especially type.</p><p>Instead court help long young. Democratic parent condition huge. Whole analysis college name military than professional.</p>	2024-08-24 00:00:00	no	no	10
19	19	\N	\N	2024-07-03 00:00:00	<p>Hair send response seven future never feeling land age.</p><p>Improve admit man Republican suddenly analysis. It anything pretty recognize medical decision. Majority may son serve win player could.</p>	2024-07-17 00:00:00	no	no	9
20	20	\N	\N	2024-07-17 00:00:00	<p>Behind as fly economy piece close.</p><p>Doctor even turn inside scientist. Seat many today prepare former. Into us cover deep.</p>	2024-07-19 00:00:00	yes	no	10
21	21	6	11	2024-09-16 00:00:00	<p>Clear too movie hand mean not president get trade.</p><p>Season rather above remember fish quickly community send. Hear until language thus. Remember read growth customer early gas Mr.</p>	2024-09-11 00:00:00	no	no	8
22	22	2	11	2024-07-20 00:00:00	<p>Spend commercial son trial memory result energy.</p><p>Company outside show form cut way. Indicate name message note list behavior.</p>	2024-07-29 00:00:00	yes	no	8
23	23	\N	\N	2024-07-23 00:00:00	<p>Record outside cost serious west onto artist stock.</p><p>Back feel contain day well. Maintain several week nothing think character.</p>	2024-07-02 00:00:00	no	no	10
24	24	4	11	2024-08-30 00:00:00	<p>Color month hold change evening front station number.</p><p>For hot score boy summer itself Democrat. See mission know. Pass appear so structure. Hold society take citizen current during.</p>	2024-07-19 00:00:00	no	no	9
25	25	6	11	2024-08-29 00:00:00	<p>Organization position accept measure energy job important month present.</p><p>Energy step particularly.</p>	2024-07-17 00:00:00	no	no	8
26	26	\N	\N	2024-08-29 00:00:00	<p>Gun head ask member watch treat style social once.</p><p>Spring cost final individual. Section usually trade into however smile include message.</p>	2024-08-05 00:00:00	no	no	8
27	27	\N	\N	2024-07-01 00:00:00	<p>Political program interview including moment easy before forward.</p><p>Control evening matter mother out. Character painting time letter else ability. Commercial effect call section last wide indicate new.</p>	2024-08-14 00:00:00	no	no	10
28	28	\N	\N	2024-06-30 00:00:00	<p>Writer of walk gas range play writer discussion nothing sit.</p><p>Great all ever court beautiful ten. Open require Republican any couple case. Make pull quality.</p>	2024-07-05 00:00:00	no	no	8
29	29	\N	\N	2024-09-08 00:00:00	<p>Stock least day hand state moment true owner.</p><p>Evidence image here.</p>	2024-09-09 00:00:00	no	no	8
30	30	\N	\N	2024-07-22 00:00:00	<p>Certainly at list economic expert scientist mission visit campaign front other despite responsibility.</p><p>Operation appear most case turn. Talk scene once for decide degree campaign take. Us work this low could.</p>	2024-07-25 00:00:00	no	no	8
31	31	3	4	2024-08-04 00:00:00	<p>Many after sort agree life who teach special especially carry course visit environment.</p><p>Learn outside challenge level. Which tax result man whatever.</p><p>Test</p>	2024-10-11 07:19:37.974	no	no	10
32	32	5	11	2024-07-22 00:00:00	<p>Property must pass determine describe apply itself account wait.</p><p>Agreement though safe challenge drug yeah arrive should. Production pattern standard loss star forward. Charge home order always conference difficult.</p>	2024-07-11 00:00:00	no	no	9
92	12	2	14	2023-12-21 00:00:00	Error en el sistema de navegación.	2023-12-26 00:00:00	no	Comment C	42
33	33	6	11	2024-08-17 00:00:00	<p>War base pay whose bar long case.</p><p>Thousand so Democrat might wonder people. Single ability Congress power article ground newspaper. Quality add garden.</p>	2024-07-19 00:00:00	no	no	9
34	34	\N	\N	2024-08-13 00:00:00	<p>Pass no head life since physical tonight analysis at responsibility kitchen despite.</p><p>Poor capital pass another accept. They bag course successful drug building culture.</p>	2024-08-31 00:00:00	yes	no	8
35	35	\N	\N	2024-07-24 00:00:00	<p>Process attention so course smile I under job might.</p><p>Wall heavy itself social perhaps despite worker responsibility. Week door education mind social.</p>	2024-08-11 00:00:00	no	no	8
36	36	1	11	2024-08-26 00:00:00	<p>Another author charge son air chance perhaps high hour development.</p><p>Attention deep value add individual forward.</p>	2024-08-09 00:00:00	no	no	8
37	37	5	4	2024-08-04 00:00:00	<p>Capital throw whatever concern truth ball phone financial toward message theory able.</p><p>Field child red. Cold detail too find buy.</p>	2024-07-19 00:00:00	no	no	9
38	38	2	11	2024-08-04 00:00:00	<p>Woman discuss thousand foreign determine production this boy.</p><p>Score reflect set store medical study. Against various image land reduce. Professor drive mention discover. Stay him company anyone term purpose.</p>	2024-09-18 00:00:00	no	no	10
39	39	2	11	2024-09-14 00:00:00	<p>Break teach class artist energy defense later until military.</p><p>Rather water fall marriage happy off because. Treat foot house lead.</p>	2024-08-09 00:00:00	no	no	8
40	40	1	4	2024-09-17 00:00:00	<p>Exist house project describe prepare someone message success through open beat.</p><p>Little but design during thank without. Everybody response soon.</p>	2024-09-06 00:00:00	no	no	9
41	41	1	14	2023-01-15 00:00:00	Revisión completada.	2023-01-20 00:00:00	no	Comment A	1
42	42	2	4	2023-02-10 00:00:00	Error en el sistema de navegación.	2023-02-15 00:00:00	no	Comment B	2
43	43	3	11	2023-03-05 00:00:00	Requiere actualización de firmware.	2023-03-10 00:00:00	no	Comment C	3
44	44	\N	\N	2023-04-01 00:00:00	Chequeo de seguridad satisfactorio.	2023-04-05 00:00:00	no	Comment A	4
45	45	5	14	2023-05-20 00:00:00	Análisis pendiente de resultados.	2023-05-25 00:00:00	no	Comment B	5
46	46	1	4	2023-06-15 00:00:00	Revisión completada.	2023-06-20 00:00:00	no	Comment C	6
47	47	2	14	2023-07-10 00:00:00	Error en el sistema de navegación.	2023-07-15 00:00:00	no	Comment A	7
48	48	3	11	2023-08-05 00:00:00	<p>Requiere actualizaci&oacute;n de firmware.</p>	2024-10-09 12:40:14.777	no	Comment B	8
49	49	\N	\N	2023-09-01 00:00:00	Chequeo de seguridad satisfactorio.	2023-09-05 00:00:00	no	Comment C	9
50	50	5	14	2023-10-20 00:00:00	Análisis pendiente de resultados.	2023-10-25 00:00:00	no	Comment A	10
51	51	1	4	2023-11-15 00:00:00	Revisión completada.	2023-11-20 00:00:00	no	Comment B	11
52	52	2	14	2023-12-10 00:00:00	Error en el sistema de navegación.	2023-12-15 00:00:00	no	Comment C	12
53	53	3	11	2024-01-05 00:00:00	Requiere actualización de firmware.	2024-01-10 00:00:00	no	Comment A	13
54	54	\N	\N	2024-02-01 00:00:00	Chequeo de seguridad satisfactorio.	2024-02-05 00:00:00	no	Comment B	14
55	55	5	14	2024-03-20 00:00:00	Análisis pendiente de resultados.	2024-03-25 00:00:00	no	Comment C	15
56	56	1	4	2024-04-15 00:00:00	Revisión completada.	2024-04-20 00:00:00	no	Comment A	16
57	57	2	14	2024-05-10 00:00:00	Error en el sistema de navegación.	2024-05-15 00:00:00	no	Comment B	17
58	58	3	11	2024-06-05 00:00:00	Requiere actualización de firmware.	2024-06-10 00:00:00	no	Comment C	18
59	59	\N	\N	2024-07-01 00:00:00	Chequeo de seguridad satisfactorio.	2024-07-05 00:00:00	no	Comment A	19
60	60	5	14	2024-08-20 00:00:00	Análisis pendiente de resultados.	2024-08-25 00:00:00	no	Comment B	20
61	41	6	14	2023-01-15 00:00:00	Revisión completada.	2023-01-20 00:00:00	no	Comment A	21
62	42	\N	4	2023-02-10 00:00:00	Error en el sistema de navegación.	2023-02-15 00:00:00	no	Comment B	22
63	43	7	11	2023-03-05 00:00:00	Requiere actualización de firmware.	2023-03-10 00:00:00	no	Comment C	23
64	44	6	\N	2023-04-01 00:00:00	Chequeo de seguridad satisfactorio.	2023-04-05 00:00:00	no	Comment A	24
65	45	7	14	2023-05-20 00:00:00	Análisis pendiente de resultados.	2023-05-25 00:00:00	no	Comment B	25
66	46	6	4	2023-06-15 00:00:00	Revisión completada.	2023-06-20 00:00:00	no	Comment C	26
67	47	7	14	2023-07-10 00:00:00	Error en el sistema de navegación.	2023-07-15 00:00:00	no	Comment A	27
68	48	6	11	2023-08-05 00:00:00	Requiere actualización de firmware.	2023-08-10 00:00:00	no	Comment B	28
69	49	\N	\N	2023-09-01 00:00:00	Chequeo de seguridad satisfactorio.	2023-09-05 00:00:00	no	Comment C	29
70	50	7	14	2023-10-20 00:00:00	Análisis pendiente de resultados.	2023-10-25 00:00:00	no	Comment A	30
71	51	6	4	2023-11-15 00:00:00	Revisión completada.	2023-11-20 00:00:00	no	Comment B	31
72	52	7	14	2023-12-10 00:00:00	Error en el sistema de navegación.	2023-12-15 00:00:00	no	Comment C	32
73	53	6	11	2024-01-05 00:00:00	Requiere actualización de firmware.	2024-01-10 00:00:00	no	Comment A	33
74	54	\N	\N	2024-02-01 00:00:00	Chequeo de seguridad satisfactorio.	2024-02-05 00:00:00	no	Comment B	34
75	55	7	14	2024-03-20 00:00:00	Análisis pendiente de resultados.	2024-03-25 00:00:00	no	Comment C	35
76	56	6	4	2024-04-15 00:00:00	Revisión completada.	2024-04-20 00:00:00	no	Comment A	36
77	57	7	14	2024-05-10 00:00:00	Error en el sistema de navegación.	2024-05-15 00:00:00	no	Comment B	37
78	58	6	11	2024-06-05 00:00:00	Requiere actualización de firmware.	2024-06-10 00:00:00	no	Comment C	38
79	59	\N	\N	2024-07-01 00:00:00	Chequeo de seguridad satisfactorio.	2024-07-05 00:00:00	no	Comment A	39
80	60	7	14	2024-08-20 00:00:00	Análisis pendiente de resultados.	2024-08-25 00:00:00	no	Comment B	40
81	1	1	6	2023-01-10 00:00:00	Revisión completada.	2023-01-15 00:00:00	yes	Comment A	12
82	2	3	7	2023-02-11 00:00:00	Error en el sistema de navegación.	2023-02-16 00:00:00	no	Comment B	23
83	3	5	8	2023-03-12 00:00:00	Requiere actualización de firmware.	2023-03-17 00:00:00	yes	Comment C	34
84	4	7	14	2023-04-13 00:00:00	Chequeo de seguridad satisfactorio.	2023-04-18 00:00:00	no	Comment A	45
85	5	2	6	2023-05-14 00:00:00	Análisis pendiente de resultados.	2023-05-19 00:00:00	yes	Comment B	8
86	6	4	7	2023-06-15 00:00:00	Revisión completada.	2023-06-20 00:00:00	no	Comment C	19
87	7	6	8	2023-07-16 00:00:00	Error en el sistema de navegación.	2023-07-21 00:00:00	yes	Comment A	30
88	8	1	14	2023-08-17 00:00:00	Requiere actualización de firmware.	2023-08-22 00:00:00	no	Comment B	41
89	9	3	6	2023-09-18 00:00:00	Chequeo de seguridad satisfactorio.	2023-09-23 00:00:00	yes	Comment C	9
90	10	5	7	2023-10-19 00:00:00	Análisis pendiente de resultados.	2023-10-24 00:00:00	no	Comment A	20
91	11	7	8	2023-11-20 00:00:00	Revisión completada.	2023-11-25 00:00:00	yes	Comment B	31
93	13	4	6	2024-01-22 00:00:00	Requiere actualización de firmware.	2024-01-27 00:00:00	yes	Comment A	10
94	14	6	7	2024-02-23 00:00:00	Chequeo de seguridad satisfactorio.	2024-02-28 00:00:00	no	Comment B	21
95	15	1	8	2024-03-24 00:00:00	Análisis pendiente de resultados.	2024-03-29 00:00:00	yes	Comment C	32
96	16	3	14	2024-04-25 00:00:00	Revisión completada.	2024-04-30 00:00:00	no	Comment A	43
97	17	5	6	2024-05-26 00:00:00	Error en el sistema de navegación.	2024-05-31 00:00:00	yes	Comment B	11
98	18	7	7	2024-06-27 00:00:00	Requiere actualización de firmware.	2024-07-02 00:00:00	no	Comment C	22
99	19	2	8	2024-07-28 00:00:00	Chequeo de seguridad satisfactorio.	2024-08-02 00:00:00	yes	Comment A	33
100	20	4	14	2024-08-29 00:00:00	Análisis pendiente de resultados.	2024-09-03 00:00:00	no	Comment B	44
101	21	6	6	2023-01-01 00:00:00	Revisión completada.	2023-01-06 00:00:00	yes	Comment C	12
102	22	1	7	2023-02-02 00:00:00	Error en el sistema de navegación.	2023-02-07 00:00:00	no	Comment A	23
103	23	3	8	2023-03-03 00:00:00	Requiere actualización de firmware.	2023-03-08 00:00:00	yes	Comment B	34
104	24	5	14	2023-04-04 00:00:00	Chequeo de seguridad satisfactorio.	2023-04-09 00:00:00	no	Comment C	45
105	26	2	7	2023-06-06 00:00:00	Revisión completada.	2023-06-11 00:00:00	no	Comment B	19
106	27	4	8	2023-07-07 00:00:00	Error en el sistema de navegación.	2023-07-12 00:00:00	yes	Comment C	30
107	28	6	14	2023-08-08 00:00:00	Requiere actualización de firmware.	2023-08-13 00:00:00	no	Comment A	41
108	29	1	6	2023-09-09 00:00:00	Chequeo de seguridad satisfactorio.	2023-09-14 00:00:00	yes	Comment B	9
109	30	3	7	2023-10-10 00:00:00	Análisis pendiente de resultados.	2023-10-15 00:00:00	no	Comment C	20
110	31	5	8	2023-11-11 00:00:00	Revisión completada.	2023-11-16 00:00:00	yes	Comment A	31
111	32	7	14	2023-12-12 00:00:00	Error en el sistema de navegación.	2023-12-17 00:00:00	no	Comment B	42
112	33	2	6	2024-01-13 00:00:00	Requiere actualización de firmware.	2024-01-18 00:00:00	yes	Comment C	10
113	34	4	7	2024-02-14 00:00:00	Chequeo de seguridad satisfactorio.	2024-02-19 00:00:00	no	Comment A	21
114	35	6	8	2024-03-15 00:00:00	Análisis pendiente de resultados.	2024-03-20 00:00:00	yes	Comment B	32
115	36	1	14	2024-04-16 00:00:00	Revisión completada.	2024-04-21 00:00:00	no	Comment C	43
116	37	3	6	2024-05-17 00:00:00	Error en el sistema de navegación.	2024-05-22 00:00:00	yes	Comment A	11
117	38	5	7	2024-06-18 00:00:00	Requiere actualización de firmware.	2024-06-23 00:00:00	no	Comment B	22
118	39	7	8	2024-07-19 00:00:00	Chequeo de seguridad satisfactorio.	2024-07-24 00:00:00	yes	Comment C	33
119	40	2	14	2024-08-20 00:00:00	Análisis pendiente de resultados.	2024-08-25 00:00:00	no	Comment A	44
120	41	1	14	2023-01-15 00:00:00	Revisión completada.	2023-01-20 00:00:00	no	Comment A	60
\.


--
-- Data for Name: TestStatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TestStatus" (id, "idStatus", "descStatus", "isFailed", "displayOrder") FROM stdin;
1	analisisIncor	(F) Analisis Incorrecto	S	61
2	different	(F) Test Diferente	S	40
3	document	(F) Ayuda	S	55
4	failed	(F) Failed Retest	S	20
5	integration	(F) Integración	S	50
6	na	N/A	N	80
7	nuevaCausa	(F) Nueva Causa	S	69
8	nuevaISR	(F) ISR nueva para FR	S	21
9	nuevaMayor	(F) Nueva Func. Mayor	S	65
10	nuevaMenor	(F) Nueva Func. Menor	S	66
11	ok	Test OK	N	2
12	Otros	Otros	N	70
13	regresion	(F) Regresión	S	30
14	testing	In Test	N	1
\.


--
-- Data for Name: VersionForecast; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VersionForecast" (id, version, "srNumber", "dateModification", assigned, status) FROM stdin;
\.


--
-- Data for Name: VttsSystem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VttsSystem" (id, app, description, "explorerVersion", "jreVersion") FROM stdin;
1	PSSN	PSSN	18	129
2	PSSNUK	PSSN	18	129
3	PSSE	PSSE	18	129
4	PSSServer	Server	18	129
\.


--
-- Data for Name: VttsUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VttsUser" (id, assigned, "userName", password, email, "mailSign", "dateModification", "userModification", "userMessage", profile, "srFilter1", "srFilter2") FROM stdin;
1	AVZ	U5003005	oZgj7W6B0DQ=	AVZ@itpaero.com	Aarón Vázquez	2021-09-08 00:00:00	MST	\N	ADMIN	prueba	0;PSSNUK|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;11|10;1.7.0_45|11;|12;|13;09.00.00.F01|14;|15;|16;|17;|18;|19;|20;03/11/2023|21;#01DF01|22;|
2	FCA	U5003002	oZgj7W6B0DQ=	FCA@itpaero.com	Fernando Innombrable	2021-09-08 00:00:00	MST	\N	ADMIN	0;|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;|10;|11;|12;|13;|14;|15;|16;|17;|18;|19;|20;|21;|22;	0;PSSNUK|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;11|10;1.7.0_45|11;|12;|13;09.00.00.F01|14;|15;|16;|17;|18;|19;|20;03/11/2023|21;#01DF01|22;|
3	ITL	U5003006	$2a$12$qO0mBQ6UYjiL/qAAScwMyeTnn5ItFkfBhiLATJJFsh0HGdP.zH5Xm	ignacio.tamayo1@itpaero.com	Ignacio Tamayo	2021-09-08 00:00:00	MST	\N	ADMIN	{\\"srType\\":\\"0\\",\\"srTypeEqual\\":true,\\"system\\":\\"0\\",\\"systemVersion\\":\\"all\\",\\"stageVersion\\":\\"0\\",\\"equalStage\\":true,\\"serviceRequest\\":\\"all\\",\\"user\\":\\"3\\",\\"equalUser\\":true,\\"systemStatus\\":\\"0\\",\\"equalSystemStatus\\":true,\\"releaseNote\\":\\"all\\"}	{\\"srType\\":\\"3\\",\\"srTypeEqual\\":false,\\"system\\":\\"1\\",\\"systemVersion\\":\\"08.00.00\\",\\"stageVersion\\":\\"2\\",\\"equalStage\\":false,\\"serviceRequest\\":\\"ISR.0414\\",\\"user\\":\\"999\\",\\"equalUser\\":true,\\"systemStatus\\":\\"11\\",\\"equalSystemStatus\\":false,\\"releaseNote\\":\\"yes\\"}
4	JVZ	U5003001	oZgj7W6B0DQ=	jvz@itpaero.com	Javier Verlázquez	2021-09-08 00:00:00	MST	\N	ADMIN	0;|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;|10;|11;|12;|13;|14;|15;|16;|17;|18;|19;|20;|21;|22;	0;PSSNUK|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;11|10;1.7.0_45|11;|12;|13;09.00.00.F01|14;|15;|16;|17;|18;|19;|20;03/11/2023|21;#01DF01|22;|
5	LCA	U5003003	oZgj7W6B0DQ=	LCA@itpaero.com	Luis Cavanillas	2021-09-08 00:00:00	MST	\N	ADMIN	0;|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;|10;|11;|12;|13;|14;|15;|16;|17;|18;|19;|20;|21;|22;	0;PSSNUK|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;11|10;1.7.0_45|11;|12;|13;09.00.00.F01|14;|15;|16;|17;|18;|19;|20;03/11/2023|21;#01DF01|22;|
6	RRG	U5003007	oZgj7W6B0DQ=	rrg@itpaero.com	Rubén Romero	2021-09-08 00:00:00	MST	\N	ADMIN	0;|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;|10;|11;|12;|13;|14;|15;|16;|17;|18;|19;|20;|21;|22;	0;PSSNUK|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;11|10;1.7.0_45|11;|12;|13;09.00.00.F01|14;|15;|16;|17;|18;|19;|20;03/11/2023|21;#01DF01|22;|
7	RSP	U5003004	oZgj7W6B0DQ=	RSP@itpaero.com	Roberto Sanz	2021-09-08 00:00:00	MST	\N	ADMIN	0;|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;|10;|11;|12;|13;|14;|15;|16;|17;|18;|19;|20;|21;|22;	0;PSSNUK|1;ITL|2;|3;|4;|5;|6;|7;|8;|9;11|10;1.7.0_45|11;|12;|13;09.00.00.F01|14;|15;|16;|17;|18;|19;|20;03/11/2023|21;#01DF01|22;|
\.


--
-- Name: ForecastStatusRules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ForecastStatusRules_id_seq"', 1, false);


--
-- Name: ForecastStatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ForecastStatus_id_seq"', 1, false);


--
-- Name: RelatedSr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RelatedSr_id_seq"', 1, false);


--
-- Name: ReleaseVersion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ReleaseVersion_id_seq"', 1, false);


--
-- Name: Resolution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Resolution_id_seq"', 1, false);


--
-- Name: ServiceRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ServiceRequest_id_seq"', 1, false);


--
-- Name: SrType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SrType_id_seq"', 1, false);


--
-- Name: StageVersion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StageVersion_id_seq"', 1, false);


--
-- Name: SystemVersion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SystemVersion_id_seq"', 1, false);


--
-- Name: TestAttachedInfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TestAttachedInfo_id_seq"', 1, false);


--
-- Name: TestPssSystem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TestPssSystem_id_seq"', 1, false);


--
-- Name: TestStatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TestStatus_id_seq"', 1, false);


--
-- Name: VersionForecast_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VersionForecast_id_seq"', 1, false);


--
-- Name: VttsSystem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VttsSystem_id_seq"', 1, false);


--
-- Name: VttsUser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VttsUser_id_seq"', 1, false);


--
-- Name: ForecastStatusRules ForecastStatusRules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ForecastStatusRules"
    ADD CONSTRAINT "ForecastStatusRules_pkey" PRIMARY KEY (id);


--
-- Name: ForecastStatus ForecastStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ForecastStatus"
    ADD CONSTRAINT "ForecastStatus_pkey" PRIMARY KEY (id);


--
-- Name: RelatedSr RelatedSr_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelatedSr"
    ADD CONSTRAINT "RelatedSr_pkey" PRIMARY KEY (id);


--
-- Name: ReleaseVersion ReleaseVersion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReleaseVersion"
    ADD CONSTRAINT "ReleaseVersion_pkey" PRIMARY KEY (id);


--
-- Name: Resolution Resolution_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resolution"
    ADD CONSTRAINT "Resolution_pkey" PRIMARY KEY (id);


--
-- Name: ServiceRequest ServiceRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServiceRequest"
    ADD CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY (id);


--
-- Name: SrType SrType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SrType"
    ADD CONSTRAINT "SrType_pkey" PRIMARY KEY (id);


--
-- Name: StageVersion StageVersion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StageVersion"
    ADD CONSTRAINT "StageVersion_pkey" PRIMARY KEY (id);


--
-- Name: SystemVersion SystemVersion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SystemVersion"
    ADD CONSTRAINT "SystemVersion_pkey" PRIMARY KEY (id);


--
-- Name: TestAttachedInfo TestAttachedInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestAttachedInfo"
    ADD CONSTRAINT "TestAttachedInfo_pkey" PRIMARY KEY (id);


--
-- Name: TestPssSystem TestPssSystem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestPssSystem"
    ADD CONSTRAINT "TestPssSystem_pkey" PRIMARY KEY (id);


--
-- Name: TestStatus TestStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestStatus"
    ADD CONSTRAINT "TestStatus_pkey" PRIMARY KEY (id);


--
-- Name: VersionForecast VersionForecast_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersionForecast"
    ADD CONSTRAINT "VersionForecast_pkey" PRIMARY KEY (id);


--
-- Name: VttsSystem VttsSystem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VttsSystem"
    ADD CONSTRAINT "VttsSystem_pkey" PRIMARY KEY (id);


--
-- Name: VttsUser VttsUser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VttsUser"
    ADD CONSTRAINT "VttsUser_pkey" PRIMARY KEY (id);


--
-- Name: ForecastStatusRules_statusFrom_statusTo_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ForecastStatusRules_statusFrom_statusTo_key" ON public."ForecastStatusRules" USING btree ("statusFrom", "statusTo");


--
-- Name: ForecastStatus_status_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ForecastStatus_status_key" ON public."ForecastStatus" USING btree (status);


--
-- Name: RelatedSr_srNumber1_srNumber2_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RelatedSr_srNumber1_srNumber2_key" ON public."RelatedSr" USING btree ("srNumber1", "srNumber2");


--
-- Name: ReleaseVersion_app_releaseVersion_stage_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ReleaseVersion_app_releaseVersion_stage_key" ON public."ReleaseVersion" USING btree (app, "releaseVersion", stage);


--
-- Name: ServiceRequest_srNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ServiceRequest_srNumber_key" ON public."ServiceRequest" USING btree ("srNumber");


--
-- Name: SrType_srType_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SrType_srType_key" ON public."SrType" USING btree ("srType");


--
-- Name: StageVersion_stage_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "StageVersion_stage_key" ON public."StageVersion" USING btree (stage);


--
-- Name: TestAttachedInfo_idTestPssSystem_fileName_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TestAttachedInfo_idTestPssSystem_fileName_key" ON public."TestAttachedInfo" USING btree ("idTestPssSystem", "fileName");


--
-- Name: TestPssSystem_releaseVersion_srNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TestPssSystem_releaseVersion_srNumber_key" ON public."TestPssSystem" USING btree ("releaseVersion", "srNumber");


--
-- Name: TestStatus_displayOrder_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TestStatus_displayOrder_key" ON public."TestStatus" USING btree ("displayOrder");


--
-- Name: TestStatus_idStatus_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TestStatus_idStatus_key" ON public."TestStatus" USING btree ("idStatus");


--
-- Name: VersionForecast_version_srNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VersionForecast_version_srNumber_key" ON public."VersionForecast" USING btree (version, "srNumber");


--
-- Name: VttsSystem_app_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VttsSystem_app_key" ON public."VttsSystem" USING btree (app);


--
-- Name: VttsUser_assigned_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VttsUser_assigned_key" ON public."VttsUser" USING btree (assigned);


--
-- Name: ForecastStatusRules ForecastStatusRules_statusFrom_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ForecastStatusRules"
    ADD CONSTRAINT "ForecastStatusRules_statusFrom_fkey" FOREIGN KEY ("statusFrom") REFERENCES public."ForecastStatus"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ForecastStatusRules ForecastStatusRules_statusTo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ForecastStatusRules"
    ADD CONSTRAINT "ForecastStatusRules_statusTo_fkey" FOREIGN KEY ("statusTo") REFERENCES public."ForecastStatus"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelatedSr RelatedSr_linkedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelatedSr"
    ADD CONSTRAINT "RelatedSr_linkedBy_fkey" FOREIGN KEY ("linkedBy") REFERENCES public."VttsUser"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelatedSr RelatedSr_srNumber1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelatedSr"
    ADD CONSTRAINT "RelatedSr_srNumber1_fkey" FOREIGN KEY ("srNumber1") REFERENCES public."ServiceRequest"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelatedSr RelatedSr_srNumber2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelatedSr"
    ADD CONSTRAINT "RelatedSr_srNumber2_fkey" FOREIGN KEY ("srNumber2") REFERENCES public."ServiceRequest"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReleaseVersion ReleaseVersion_app_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReleaseVersion"
    ADD CONSTRAINT "ReleaseVersion_app_fkey" FOREIGN KEY (app) REFERENCES public."VttsSystem"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReleaseVersion ReleaseVersion_releaseVersion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReleaseVersion"
    ADD CONSTRAINT "ReleaseVersion_releaseVersion_fkey" FOREIGN KEY ("releaseVersion") REFERENCES public."SystemVersion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReleaseVersion ReleaseVersion_stage_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReleaseVersion"
    ADD CONSTRAINT "ReleaseVersion_stage_fkey" FOREIGN KEY (stage) REFERENCES public."StageVersion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Resolution Resolution_assigned_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resolution"
    ADD CONSTRAINT "Resolution_assigned_fkey" FOREIGN KEY (assigned) REFERENCES public."VttsUser"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Resolution Resolution_srNumber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resolution"
    ADD CONSTRAINT "Resolution_srNumber_fkey" FOREIGN KEY ("srNumber") REFERENCES public."ServiceRequest"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ServiceRequest ServiceRequest_lastTester_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServiceRequest"
    ADD CONSTRAINT "ServiceRequest_lastTester_fkey" FOREIGN KEY ("lastTester") REFERENCES public."VttsUser"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ServiceRequest ServiceRequest_srType_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServiceRequest"
    ADD CONSTRAINT "ServiceRequest_srType_fkey" FOREIGN KEY ("srType") REFERENCES public."SrType"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SystemVersion SystemVersion_app_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SystemVersion"
    ADD CONSTRAINT "SystemVersion_app_fkey" FOREIGN KEY (app) REFERENCES public."VttsSystem"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TestAttachedInfo TestAttachedInfo_idTestPssSystem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestAttachedInfo"
    ADD CONSTRAINT "TestAttachedInfo_idTestPssSystem_fkey" FOREIGN KEY ("idTestPssSystem") REFERENCES public."TestPssSystem"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TestPssSystem TestPssSystem_assigned_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestPssSystem"
    ADD CONSTRAINT "TestPssSystem_assigned_fkey" FOREIGN KEY (assigned) REFERENCES public."VttsUser"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TestPssSystem TestPssSystem_releaseVersion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestPssSystem"
    ADD CONSTRAINT "TestPssSystem_releaseVersion_fkey" FOREIGN KEY ("releaseVersion") REFERENCES public."ReleaseVersion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TestPssSystem TestPssSystem_srNumber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestPssSystem"
    ADD CONSTRAINT "TestPssSystem_srNumber_fkey" FOREIGN KEY ("srNumber") REFERENCES public."ServiceRequest"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TestPssSystem TestPssSystem_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestPssSystem"
    ADD CONSTRAINT "TestPssSystem_status_fkey" FOREIGN KEY (status) REFERENCES public."TestStatus"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: VersionForecast VersionForecast_assigned_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersionForecast"
    ADD CONSTRAINT "VersionForecast_assigned_fkey" FOREIGN KEY (assigned) REFERENCES public."VttsUser"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: VersionForecast VersionForecast_srNumber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersionForecast"
    ADD CONSTRAINT "VersionForecast_srNumber_fkey" FOREIGN KEY ("srNumber") REFERENCES public."ServiceRequest"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VersionForecast VersionForecast_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersionForecast"
    ADD CONSTRAINT "VersionForecast_status_fkey" FOREIGN KEY (status) REFERENCES public."ForecastStatus"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VersionForecast VersionForecast_version_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersionForecast"
    ADD CONSTRAINT "VersionForecast_version_fkey" FOREIGN KEY (version) REFERENCES public."SystemVersion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- Database "mydb" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
--SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: mydb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE mydb OWNER TO postgres;

\connect mydb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
--SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
--SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
--SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

