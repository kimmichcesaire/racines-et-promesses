// Usage : npm run hash-password -- "mon-mot-de-passe"
// Copie ensuite le résultat dans ADMIN_PASSWORD_HASH (apps/api/.env).
const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.error('Usage : npm run hash-password -- "mon-mot-de-passe"');
  process.exit(1);
}

console.log(bcrypt.hashSync(password, 12));
