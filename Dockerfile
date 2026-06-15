FROM node:20-slim
WORKDIR /app
# Önce package dosyalarını kopyala (Docker cache optimizasyonu için)
COPY package*.json ./
RUN npm install
# Sonra tüm kaynak kodları kopyala
COPY . .
# Data klasörünü oluştur
RUN mkdir -p /app/data && chown -R node:node /app/data
USER node
EXPOSE 3000
CMD ["node", "server.js"]
