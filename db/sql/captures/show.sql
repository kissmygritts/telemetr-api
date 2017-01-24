SELECT
  animals.perm_id,
  captures.species,
  captures.age,
  captures.sex,
  devices.serial_num,
  captures.notes,
  animals.id AS animal_id,
  devices.id AS device_id,
  deployments.id AS deployment_id
FROM ((animals
  INNER JOIN captures ON animals.perm_id = captures.perm_id)
  INNER JOIN deployments ON animals.id = deployments.animal_id)
  INNER JOIN devices ON deployments.device_id = devices.id
WHERE animals.perm_id = ${perm_id};
