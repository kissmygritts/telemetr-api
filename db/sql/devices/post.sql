INSERT INTO devices (
  serial_num, -- required
  frequency, -- required
  vendor,
  device_type, -- required
  mfg_date,
  model
)
VALUES (
  ${serial_num},
  ${frequency},
  ${vendor},
  ${device_type},
  ${mfg_date},
  ${model}
)
RETURNING *;
