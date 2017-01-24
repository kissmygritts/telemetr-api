INSERT INTO captures (
  cap_date,
  sex,
  age,
  species,
  notes
)
VALUES (
  ${cap_date},
  ${sex},
  ${age},
  ${species},
  ${notes}
)
RETURNING *;
