-- SQL-spørringen CREATE TABLE:


-- Table: public.Note_table
-- DROP TABLE IF EXISTS public."Note_table";

CREATE TABLE IF NOT EXISTS public."Note_table"
(
    id integer NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    note text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Note_table_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Note_table"
    OWNER to notes_db_bm14_user;



-- SQL-spørringen INSERT

INSERT INTO public."Note_table"(title, note) VALUES ($2, $3) RETURNING id, title, note;


-- SQL-spørringen UPDATE

UPDATE public."Note_table" SET id=?, title=?, note=? WHERE <condition>;


-- SQL-spørringen SELECT

SELECT id, title, note FROM public."Note_table";


-- SQL-spørringen DELETE

DELETE FROM public."Note_table" WHERE <condition>;