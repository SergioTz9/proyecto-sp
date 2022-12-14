-- Tabla para guardar los datos de la relación de pasos de un proceso
CREATE TABLE sp_process_step_relation (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    id_steps_relation JSON,
    id_process INT NOT NULL,
    CONSTRAINT fk_id_idprocess FOREIGN KEY (id_process)
    REFERENCES sp_process (id)
    ON DELETE CASCADE
);

-- Procedimiento para crear o actualizar la relación de pasos de un proceso
CREATE OR REPLACE PROCEDURE create_update_steps_relation(idstepsrelation JSON, idprocess INT)
LANGUAGE plpgsql
AS $$
    BEGIN
        IF EXISTS(SELECT * FROM sp_process_step_relation WHERE id_process = idprocess) THEN
            UPDATE sp_process_step_relation SET id_steps_relation = idstepsrelation WHERE id_process = idprocess;
        ELSE
            INSERT INTO sp_process_step_relation (id_steps_relation, id_process) VALUES (idstepsrelation, idprocess);
        END IF;
    END
$$;