# Build stage
FROM oven/bun:latest as build

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN bun install

# คัดลอก source code
COPY . .

# Build application
RUN bun run build

# คัดลอกไฟล์ assets ไปยัง dist
RUN mkdir -p dist/assets && \
    cp -r public/assets/* dist/assets/ || true && \
    cp -r src/assets/* dist/assets/ || true

# Production stage
FROM nginx:alpine

# คัดลอก nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# คัดลอก build files จาก build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 