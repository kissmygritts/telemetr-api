SELECT
  animals.perm_id,
  relocations.*
FROM animals
  INNER JOIN relocations ON animals.id = relocations.animal_id
ORDER BY animals.perm_id, relocations.acq_time_lcl;
