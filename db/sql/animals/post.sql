INSERT INTO animals (
  perm_id,
  species,
  serial_num,
  cap_date,
  sex,
  age,
  study_id,
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
  ${notes},
  ${attributes:json}
RETURNING *
)
