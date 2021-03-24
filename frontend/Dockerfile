# Genera y compila proyecto react
FROM node:latest as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build --prod

# Levanta servidor web con archivos estáticos react

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]