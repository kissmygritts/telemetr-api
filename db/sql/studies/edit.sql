UPDATE studies
SET
  study_name = ${study_name},
  attributes = ${attributes:json}
WHERE id = ${id}
RETURNING *;
