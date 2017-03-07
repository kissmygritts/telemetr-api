UPDATE animals
SET
  perm_id = ${perm_id},
  species_id = ${species_id},
  -- serial_num = ${serial_num}, can't do this without changing deployments
  -- cap_date = ${cap_date}, can't do this without changing deployments
  sex = ${sex},
  age = ${age},
  study_id = ${study_id},
  fate = ${fate},
  fate_date = ${fate_date},
  notes = ${notes},
  attributes = ${attributes:json}
WHERE id = ${id}
RETURNING *

-- FIXME: this needs to be dynamic rather than requiring all fields, same for all put edit methods
