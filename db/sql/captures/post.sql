INSERT INTO captures (
  perm_id,
  cap_date,
  sex,
  age,
  species,
  notes,
  serial_num
)
VALUES (
  ${perm_id},
  ${cap_date},
  ${sex},
  ${age},
  ${species},
  ${notes}
  ${serial_num}
)
RETURNIGN *;
