-- Create users table in Supabase
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  device_fingerprint TEXT,
  device_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  is_admin BOOLEAN DEFAULT false
);

-- Insert default admin user
INSERT INTO users (username, password, is_admin, is_active) 
VALUES ('khoa123456', '123456', true, true)
ON CONFLICT (username) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since we're handling auth in the app)
CREATE POLICY "Allow all operations on users" ON users
FOR ALL USING (true);
