CREATE TABLE IF NOT EXISTS sms (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(14) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(255) DEFAULT '',
  messageId VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION set_updated_at_trigger() RETURNS TRIGGER
AS $$
  BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sms_update_updated_at
BEFORE UPDATE ON sms
FOR EACH ROW EXECUTE FUNCTION set_updated_at_trigger();
