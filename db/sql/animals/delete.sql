DELETE
FROM animals
WHERE id = ${id}
RETURNING *;
