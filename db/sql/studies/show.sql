SELECT
  animals.perm_id,
  animals.species,
  animals.serial_num,
  animals.cap_date,
  animals.sex,
  animals.age,
  animals.fate_date,
  lkp_study.study_name,
  lkp_study.id AS study_id
FROM animals
  LEFT JOIN lkp_study ON animals.study_id = lkp_study.id
WHERE lkp_study.id = ${id}
ORDER BY animals.perm_id, animals.cap_date;
