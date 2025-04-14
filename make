#!/usr/bin/bash

npm install
npx tsc
cat <(echo "#!/usr/bin/env node") poligonos.js > poligonos
chmod +x poligonos
# npm run purge