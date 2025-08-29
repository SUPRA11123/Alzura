FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_API_BASE=http://api:3000
RUN npm run build
EXPOSE 5173
CMD ["npm","run","preview"]
