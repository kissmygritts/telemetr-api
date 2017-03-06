DELETE
FROM studies
WHERE id = ${id}
RETURNING *
