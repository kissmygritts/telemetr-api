SELECT
  perm_id,
  ST_AsGeoJSON(
    ST_MakeLine(geom)::geometry(LineString, 4326)
  ) AS geom
FROM (
  SELECT
    animals.perm_id,
    relocations.geom,
    relocations.acq_time_lcl
  FROM animals
    INNER JOIN relocations ON animals.id = relocations.animal_id
  WHERE
    relocations.geom IS NOT NULL
    -- AND animals.perm_id = 'F09'
  ORDER BY animals.perm_id, relocations.acq_time_lcl
  -- LIMIT 25
) as s
GROUP BY perm_id;
