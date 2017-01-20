SELECT
  animals.perm_id,
  devices.serial_num,
  relocations.id,
  relocations.gps_id,
  relocations.acq_time_utc,
  relocations.acq_time_lcl,
  relocations.latitude,
  relocations.longitude,
  relocations.altitude,
  relocations.validity_code,
  relocations.activity,
  relocations.temperature
FROM (animals
  INNER JOIN relocations ON animals.id = relocations.animal_id)
  INNER JOIN devices ON relocations.device_id = devices.id
WHERE animals.perm_id = ${perm_id}
ORDER BY relocations.acq_time_lcl;
