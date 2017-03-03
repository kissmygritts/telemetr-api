SELECT
  animals.perm_id,
  animals.species,
  animals.sex,
  animals.age,
  relocations.acq_time_lcl,
  relocations.longitude,
  relocations.latitude,
  relocations.validity_code
FROM (animals
  INNER JOIN relocations ON animals.id = relocations.animal_id)
  INNER JOIN lkp_study ON animals.study_id = lkp_study.id
WHERE relocations.validity_code IN (1, 3)
  AND lkp_study.id = ${id}
ORDER BY animals.perm_id, relocations.acq_time_lcl;
