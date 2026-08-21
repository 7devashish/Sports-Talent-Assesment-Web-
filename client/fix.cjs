const fs = require('fs');
const file = 'c:/Users/chand/Desktop/Sports-Talent-Assesment-Web-/client/src/pages/AlphaQ.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\\`/g, '\`');
content = content.replace(/\\\$/g, '$');
fs.writeFileSync(file, content);
