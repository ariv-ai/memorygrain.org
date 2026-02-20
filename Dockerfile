# Stage 1: Build static site
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Fetch OMS specification for the /spec page
RUN mkdir -p docs && \
    wget -O docs/oms-specification.md \
    https://raw.githubusercontent.com/openmemoryspec/oms/main/SPECIFICATION.md

COPY . .

ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_SITE_URL=https://memorygrain.org

ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
