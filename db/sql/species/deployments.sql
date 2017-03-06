SELECT
  studies.id AS study_id,
  studies.study_name,
  animals.id AS animals_id,
  animals.perm_id,
  species.species_code,
  animals.serial_num,
  animals.sex,
  animals.age,
  animals.cap_date,
  animals.fate_date,
  animals.fate
FROM (studies
  INNER JOIN animals ON studies.id = animals.study_id)
  INNER JOIN species ON animals.species_id = species.id
WHERE species.species_code = ${species}
ORDER BY animals.perm_id, animals.cap_date;
