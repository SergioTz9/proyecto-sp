ALTER TABLE sp_process_step ALTER COLUMN form_structure TYPE VARCHAR(100000);
ALTER TABLE sp_process_step ADD COLUMN fields_properties JSON;