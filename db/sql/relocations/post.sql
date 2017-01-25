INSERT INTO gps (
  serial_num,
  acq_time_lcl,
  latitude,
  longitude,
  altitude,
  activity,
  temperature
)
VALUES (
  ${serial_num},
  ${acq_time_lcl},
  ${latitude},
  ${longitude},
  ${altitude},
  ${activity},
  ${temperature}
)
