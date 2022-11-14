CREATE TABLE IF NOT EXISTS public.politici
(
    id_pl integer NOT NULL DEFAULT nextval('politici_id_pl_seq'::regclass),
    nome_pl character varying COLLATE pg_catalog."default" NOT NULL,
    fanfani_pl integer,
    CONSTRAINT politici_pkey PRIMARY KEY (id_pl)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.politici
    OWNER to app_fantacitorio;

CREATE TABLE public.squadre
(
    id_sq serial,
    nome_sq character varying NOT NULL,
    giocatore_sq character varying NOT NULL,
    PRIMARY KEY (id_sq)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE IF EXISTS public.squadre
    OWNER to app_fantacitorio;

CREATE TABLE IF NOT EXISTS public.squadre_politici
(
    id_squadra_sp integer NOT NULL,
    id_politico_sp integer NOT NULL,
    leader_sp boolean NOT NULL DEFAULT false,
    CONSTRAINT squadre_politici_pkey PRIMARY KEY (id_squadra_sp, id_politico_sp),
    CONSTRAINT fk_squadre_politici_id_politico FOREIGN KEY (id_politico_sp)
        REFERENCES public.politici (id_pl) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_squadre_politici_id_squadra FOREIGN KEY (id_squadra_sp)
        REFERENCES public.squadre (id_sq) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.squadre_politici
    OWNER to app_fantacitorio;
-- Index: fki_fk_squadre_politici_id_politico

-- DROP INDEX IF EXISTS public.fki_fk_squadre_politici_id_politico;

CREATE INDEX IF NOT EXISTS fki_fk_squadre_politici_id_politico
    ON public.squadre_politici USING btree
    (id_politico_sp ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_squadre_politici_id_squadra

-- DROP INDEX IF EXISTS public.fki_fk_squadre_politici_id_squadra;

CREATE INDEX IF NOT EXISTS fki_fk_squadre_politici_id_squadra
    ON public.squadre_politici USING btree
    (id_squadra_sp ASC NULLS LAST)
    TABLESPACE pg_default;