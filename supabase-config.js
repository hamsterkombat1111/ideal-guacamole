// Ваши данные из Supabase
const SUPABASE_URL = 'https://ghpcfjbissjxazdepndr.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdocGNmamJpc3NqeGF6ZGVwbmRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMTU0NzgsImV4cCI6MjA3Mjc5MTQ3OH0.7K84ZwQVZ07Ode98druvxnrR9HbjMpotegorn1Ncex8'; // Сервисный ключ для записи

// Инициализация с сервисной ролью
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);