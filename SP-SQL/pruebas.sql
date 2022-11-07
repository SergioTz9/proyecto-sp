DO
$do$
BEGIN
	IF EXISTS(SELECT * FROM sp_process_step_relation WHERE id_process = 1) THEN
	UPDATE sp_process_step_relation SET id_steps_relation = '[{"idStep": "2"}]' WHERE id_process = 1;
	ELSE
	INSERT INTO sp_process_step_relation (id_steps_relation, id_process) VALUES ('[]', 1);
	END IF;
END
$do$