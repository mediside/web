FROM node:24-alpine3.22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.29.1-alpine3.22 AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY htpasswd /etc/nginx/htpasswd
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]