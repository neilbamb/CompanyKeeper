
# Build stage
FROM node:18-alpine as build
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY ./package*.json ./
RUN npm install

# Then copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
