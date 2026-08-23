const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti%4098510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres' });
client.connect().then(async () => {
  console.log('Connected via pg!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
