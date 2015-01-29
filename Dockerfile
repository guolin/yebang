FROM dockerfile/nodejs
WORKDIR /data
ADD . /data
RUN npm install gulp -g
RUN npm install bower -g
RUN npm install
