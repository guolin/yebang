
echo "install gulp"
npm install gulp -g

echo "install bower"
npm install bower -g

echo "npm install && bower install"
npm install --production
bower install -f --allow-root

export NODE_ENV=prodeuction
node_modules/.bin/gulp dist