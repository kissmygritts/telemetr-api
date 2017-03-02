-- TODO: need to be careful with this query, if there are two entries for one animal they will both be deleted.
-- TODO: this can be deleted

DELETE
FROM deployments
WHERE id = (
  SELECT deployments.id
  FROM animals
    INNER JOIN deployments ON animals.id = deployments.animal_id
  WHERE animals.perm_id = ${perm_id}
);
