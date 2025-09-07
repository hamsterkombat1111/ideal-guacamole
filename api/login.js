// api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, passwordHash } = req.body;

  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', passwordHash);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!users || users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ user: users[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}