# Estágio de build
FROM node:22.21.1 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .

# roda o build (ajuste se seu script for diferente)
RUN npm run build

# Normaliza a saída do build para /app/dist-output
RUN mkdir -p /app/dist-output \
 && if [ -d /app/dist/browser ]; then \
      cp -r /app/dist/browser/* /app/dist-output/; \
    elif ls /app/dist/*/browser >/dev/null 2>&1; then \
      cp -r /app/dist/*/browser/* /app/dist-output/; \
    elif ls /app/dist/* >/dev/null 2>&1; then \
      # copia todo o conteúdo do primeiro subdiretório (ex: dist/MEGA/...)
      cp -r /app/dist/*/* /app/dist-output/ 2>/dev/null || cp -r /app/dist/* /app/dist-output/; \
    else \
      echo "Build output not found in /app/dist" && ls -la /app || exit 1; \
    fi

# Estágio de produção usando nginx
FROM nginx:alpine

# Copia os arquivos compilados do estágio de build para o nginx
COPY --from=builder /app/dist-output /usr/share/nginx/html

# Copia configuração nginx (opcional — se não tiver, nginx servirá em 80 por padrão)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 81
EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]
