-- Happy Robot sale ya en la web: en la cinta y con el primer track libre (sin título todavía,
-- se muestra «Track por anunciar»). No pisa nada si ya tiene track asignado desde el panel.
UPDATE companies SET en_cinta = 1 WHERE name = 'Happy Robot';
UPDATE tracks
SET company_id = (SELECT id FROM companies WHERE name = 'Happy Robot')
WHERE id = (SELECT MIN(id) FROM tracks WHERE company_id IS NULL)
  AND NOT EXISTS (
    SELECT 1 FROM tracks WHERE company_id = (SELECT id FROM companies WHERE name = 'Happy Robot')
  );
