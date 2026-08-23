const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://ktnqomkuuisfafoaxwtc.supabase.co',
  'sb_publishable_23yB5RRepeV_j-bDdg7hKQ_dY1puizt'
);
async function run() {
  const { data, error } = await supabase.auth.signUp({
    email: 'baraldhar@gmail.com',
    password: 'Istuti@98510'
  });
  console.log('Signup result:', JSON.stringify(data), error);
}
run();
