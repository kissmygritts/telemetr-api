INSERT INTO studies (
  study_name,
  attributes
)
VALUES (
  ${study_name},
  ${attributes}
)
RETURNING *
