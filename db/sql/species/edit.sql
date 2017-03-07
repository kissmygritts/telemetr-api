UPDATE species
SET
  common_name = ${common_name},
  species_code = ${species_code},
  genus = ${genus},
  species = ${species},
  sub_species = ${sub_species},
  attributes = ${attributes:json}
where species_code = ${id}
RETURNING *;
