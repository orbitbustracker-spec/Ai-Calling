const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://ktnqomkuuisfafoaxwtc.supabase.co',
  'sb_publishable_23yB5RRepeV_j-bDdg7hKQ_dY1puizt'
);
async function run() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'baraldhar@gmail.com',
    password: 'Istuti@98510'
  });
  
  if (error) {
    console.error('Login error:', error);
    process.exit(1);
  }
  
  console.log('Got session token:', data.session.access_token.substring(0, 20) + '...');
  
  // Now try to fetch /admin with the cookie!
  const cookie = 'sb-ktnqomkuuisfafoaxwtc-auth-token=' + encodeURIComponent(JSON.stringify([data.session.access_token, data.session.refresh_token, null, null, null])) + ';';
  
  const res = await fetch('https://ai-calling-nine.vercel.app/admin', {
    headers: {
      cookie
    },
    redirect: 'manual'
  });
  
  console.log('Status:', res.status);
  console.log('Headers:', res.headers);
  const text = await res.text();
  console.log('Body start:', text.substring(0, 200));
}
run();
