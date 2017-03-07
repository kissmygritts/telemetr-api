DELETE
FROM devices
WHERE serial_num = ${serial_num}
RETURNING *
