INSERT INTO species (
  common_name,
  species_code,
  genus,
  species,
  sub_species,
  attributes
)
VALUES (
  ${common_name},
  ${species_code},
  ${genus},
  ${species},
  ${sub_species},
  ${attributes:json}
)
RETURNING *
