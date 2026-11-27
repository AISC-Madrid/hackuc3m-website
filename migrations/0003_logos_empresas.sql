-- Logos reales de cada empresa (isotipo, logotipo, isologo) en /logos/empresas/. Happy Robot entra confirmada.
UPDATE companies SET isotipo = '/logos/empresas/kapia-isotipo.svg', logotipo = '/logos/empresas/kapia-logotipo.svg', isologo = '/logos/empresas/kapia-isologo.svg' WHERE id = 1;
UPDATE companies SET isotipo = '/logos/empresas/bending-spoons-isotipo.svg', logotipo = '/logos/empresas/bending-spoons-logotipo.svg', isologo = '/logos/empresas/bending-spoons-isologo.svg' WHERE id = 2;
INSERT INTO companies (name, url, isotipo, logotipo, isologo, etapa) VALUES
  ('Happy Robot', 'https://www.happyrobot.ai', '/logos/empresas/happyrobot-isotipo.svg', '/logos/empresas/happyrobot-logotipo.svg', '/logos/empresas/happyrobot-isologo.svg', 'confirmada');
