INSERT INTO animals (
  perm_id,
  species,
  serial_num,
  cap_date,
  sex,
  age,
  study_id,
  mgmt_area,
  notes,
  attributes
)
VALUES (
  ${perm_id},
  ${species},
  ${serial_num},
  ${cap_date},
  ${sex},
  ${age},
  ${study_id},
  ${mgmt_area},
  ${notes},
  ${attributes:json}
RETURNING *
)
