UPDATE devices
SET $1^
WHERE serial_num = $2
RETURNING *
