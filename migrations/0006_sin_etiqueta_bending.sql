-- Fuera la etiqueta «Apps para millones» de Bending Spoons (la sembró 0002): era la única empresa
-- con descripción corta y desentonaba en la fila de tracks. Solo la borra si nadie la ha cambiado
-- desde el panel; el campo sigue editable allí.
UPDATE companies SET short_desc = ''
WHERE name = 'Bending Spoons' AND short_desc = 'Apps para millones';
