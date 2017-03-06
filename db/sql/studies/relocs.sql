SELECT
  animals.perm_id,
  species.species_code,
  animals.sex,
  animals.age,
  relocations.acq_time_lcl,
  relocations.longitude,
  relocations.latitude,
  relocations.validity_code
FROM ((animals
  INNER JOIN species ON animals.species_id = species.id)
  INNER JOIN relocations ON animals.id = relocations.animal_id)
  INNER JOIN studies ON animals.study_id = studies.id
WHERE relocations.validity_code IN (1, 3)
  AND studies.id = ${id}
ORDER BY animals.perm_id, relocations.acq_time_lcl;
