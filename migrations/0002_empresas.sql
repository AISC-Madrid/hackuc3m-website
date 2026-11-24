-- Empresas, sus papeles y los tracks (docs/modelo-datos.md). La empresa tiene el track, no al revés.
-- Sin columna de orden: la web baraja tracks y cinta en cada visita, porque todas pagan lo mismo.
-- Los logos guardan su ruta pública: /media/<clave> (subido a R2) o /logos/empresas/<fichero>.
CREATE TABLE companies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT,
  short_desc TEXT NOT NULL DEFAULT '',
  long_desc TEXT NOT NULL DEFAULT '',
  isotipo TEXT,
  logotipo TEXT,
  isologo TEXT,
  en_cinta INTEGER NOT NULL DEFAULT 0,
  -- Etapa de captación. La lleva la herramienta de partnerships; aquí solo hace falta para saber
  -- si la empresa está confirmada (solo las confirmadas pueden tener track).
  etapa TEXT NOT NULL DEFAULT 'confirmada',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Papeles además del track: infra, jurado, patrocinio, difusion (lista en lib/empresas.ts).
CREATE TABLE company_roles (
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  PRIMARY KEY (company_id, role)
);

CREATE TABLE tracks (
  id INTEGER PRIMARY KEY,
  -- UNIQUE: por ahora una empresa tiene como mucho un track (pregunta abierta 8 del plan).
  company_id INTEGER UNIQUE REFERENCES companies(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT '',
  challenge TEXT NOT NULL DEFAULT '',
  prize TEXT NOT NULL DEFAULT ''
);

-- Lo que ya estaba confirmado en la landing (app/(landing)/datos.ts y lib/event.ts).
INSERT INTO companies (id, name, isotipo, logotipo, en_cinta) VALUES
  (1, 'Kapia', '/logos/empresas/kapia.svg', '/logos/empresas/kapia.svg', 1);
INSERT INTO companies (id, name, short_desc, isotipo, logotipo, en_cinta) VALUES
  (2, 'Bending Spoons', 'Apps para millones', '/logos/empresas/bending-spoons.svg', '/logos/empresas/bending-spoons.svg', 1);
INSERT INTO tracks (company_id) VALUES (1), (2), (NULL), (NULL), (NULL), (NULL);
