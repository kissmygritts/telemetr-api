DELETE
FROM deployments
WHERE id = (
  SELECT deployments.id
  FROM animals
    INNER JOIN deployments ON animals.id = deployments.animal_id
  WHERE animals.perm_id = ${perm_id}
);
