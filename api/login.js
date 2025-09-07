// api/login.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем OPTIONS запрос для CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, passwordHash } = req.body;

    if (!email || !passwordHash) {
      return res.status(400).json({ error: 'Email and passwordHash are required' });
    }

    // Используем environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Ищем пользователя
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', passwordHash);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!users || users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Обновляем время входа
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', users[0].id);

    res.status(200).json({ 
      success: true, 
      user: users[0] 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
