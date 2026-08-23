const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:Istuti98510@db.ktnqomkuuisfafoaxwtc.supabase.co:5432/postgres' });
client.connect().then(async () => {
  await client.query("DELETE FROM auth.users WHERE email = 'baraldhar@gmail.com'");
  await client.query("DELETE FROM auth.users WHERE email = 'orbitbustracker@gmail.com'");
  await client.query("DELETE FROM auth.users WHERE email = 'orbibustracker@gmail.com'");
  console.log('Deleted all users successfully!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
