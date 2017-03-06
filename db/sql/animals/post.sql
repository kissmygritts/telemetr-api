INSERT INTO animals (
  perm_id,
  species_id,
  serial_num,
  cap_date,
  sex,
  age,
  study_id,
  fate,
  fate_date,
  notes,
  attributes
)
VALUES (
  ${perm_id},
  ${species_id},
  ${serial_num},
  ${cap_date},
  ${sex},
  ${age},
  ${study_id},
  ${fate},
  ${fate_date},
  ${notes},
  ${attributes:json}
)
RETURNING *
