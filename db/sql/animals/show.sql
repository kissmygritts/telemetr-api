SELECT
  animals.id AS animal_id,
  animals.perm_id,
  species.id AS species_id,
  species.species_code,
  animals.serial_num,
  animals.cap_date,
  animals.sex,
  animals.age,
  studies.id AS study_id,
  studies.study_name,
  animals.fate,
  animals.fate_date,
  animals.notes,
  animals.attributes,
  animals.created_at,
  animals.updated_at
FROM (animals
  INNER JOIN species on animals.species_id = species.id)
  INNER JOIN studies on animals.study_id = studies.id
WHERE perm_id = ${perm_id}
