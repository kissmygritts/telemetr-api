DELETE
FROM species
WHERE species_code = ${species}
RETURNING *;
