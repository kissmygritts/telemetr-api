INSERT INTO devices
  (serial_num, vendor, model)
VALUES
  ('collar1', 'collarTest', 'collarTest'),
  ('collar2', 'collarTest', 'collarTest'),
  ('collar3', 'collarTest', 'collarTest');

INSERT INTO captures
  (perm_id, cap_date, sex, age, species, serial_num)
VALUES
  ('testCapture', '2016-01-01', 'female', 'adult', 'SP01', 'collar1');
