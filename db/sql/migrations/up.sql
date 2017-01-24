INSERT INTO devices
  (serial_num, vendor, model)
VALUES
  ('capDevice1', 'collarTest', 'collarTest'),
  ('capDevice2', 'collarTest', 'collarTest'),
  ('collar2', 'collarTest', 'collarTest'),
  ('collar3', 'collarTest', 'collarTest');

INSERT INTO captures
  (perm_id, cap_date, sex, age, species, serial_num)
VALUES
  ('testCapture', '2016-01-01', 'female', 'adult', 'SP01', 'capDevice1'),
  ('testCapture1', '2016-01-01', 'female', 'adult', 'SP01', 'capDevice2');

INSERT INTO gps
  (serial_num, longitude, latitude, acq_time_lcl)
VALUES
  ('capDevice1', 42.70775, 30.05232, '2016-01-01 16:00:00'),
  ('capDevice1', 42.63837, 30.24617, '2016-01-02 16:00:00'),
  ('capDevice1', 42.65222, 31.09746, '2016-01-03 16:00:00'),
  ('capDevice1', 41.39914, 30.59676, '2016-01-04 16:00:00'),
  ('capDevice1', 41.08708, 29.83616, '2016-01-05 16:00:00'),
  ('capDevice1', 40.89198, 31.09731, '2016-01-06 16:00:00'),
  ('capDevice1', 40.75036, 29.97222, '2016-01-07 16:00:00'),
  ('capDevice1', 39.40685, 29.75019, '2016-01-08 16:00:00'),
  ('capDevice1', 37.74160, 30.89702, '2016-01-09 16:00:00'),
  ('capDevice1', 36.27462, 29.72661, '2016-01-10 16:00:00');
