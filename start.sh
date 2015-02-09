
echo "install gulp"
npm install gulp -g

echo "install bower"
npm install bower -g

echo "npm install"
npm install

echo "bower install"
bower install -f --allow-root

export NODE_ENV=prodeuction
node_modules/.bin/gulp dist