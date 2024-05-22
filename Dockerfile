
FROM node:20.11

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Khởi động ứng dụng
CMD ["npm", "start"]
