# Etapa 1: Construcción
FROM timbru31/ruby-node:2.7 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copia y instala dependencias de Node
COPY package.json /usr/src/app/package.json
RUN npm install -g bower
RUN npm install -g grunt-cli
RUN npm install --legacy-peer-deps

# Copia los archivos de la aplicación y realiza la instalación de dependencias
COPY . /usr/src/app
RUN bower --allow-root install

# Actualiza RubyGems y Bundler
RUN gem update --system 3.3.22
RUN gem install bundler:2.4.22
RUN bundle _2.4.22_ install

# Ejecuta la compilación con Grunt
RUN grunt dev

# Etapa 2: Producción
FROM nginx:1.19.3

# Copia los archivos construidos de la etapa anterior
COPY --from=builder /usr/src/app/dist/community-app /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para recibir tráfico
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
