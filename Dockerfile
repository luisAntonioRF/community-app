FROM timbru31/ruby-node:2.7 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

RUN npm install -g bower
RUN npm install -g grunt-cli
COPY . /usr/src/app
RUN bower --allow-root install
RUN npm install

# Actualiza RubyGems a una versión compatible con ffi
RUN gem update --system 3.3.22

# Ahora ejecuta bundle install
RUN bundle install
RUN grunt prod

FROM nginx:1.19.3
COPY --from=builder /usr/src/app/dist/community-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]