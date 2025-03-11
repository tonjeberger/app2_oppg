

-- SQL-spørringen INSERT

INSERT INTO public."Note_table"(title, note) VALUES ($2, $3) RETURNING id, title, note;


-- SQL-spørringen UPDATE

UPDATE public."Note_table" SET title=$2, note=$3 WHERE id=$1 RETURNING id, title, note;
-- WHERE skal være en id og, men den refererer til hvilken rad det er som som skal oppdateres (rad 1, rad 2, rad 3, tenkt på det som indexer)
-- SET id er id-en som ligger som en verdi i id-feltet i tabellen
-- hvis begge er den samme kan begge id-er være id=$1, ellers blir WHERE id=$4



-- SQL-spørringen SELECT

SELECT id, title, note FROM public."Note_table" WHERE id=$1; 
-- add [] outside the ``


-- SQL-spørringen DELETE

DELETE FROM public."Note_table" WHERE id=$1;

-- fra copilot: The id=$1 part means "find the rows where the id column matches the given value." For instance, if $1 is 10, the query will delete the row where id equals 10.







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