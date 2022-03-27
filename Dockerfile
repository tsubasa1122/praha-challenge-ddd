# NOTE: 軽量のalpineを使いたいが、M1のDockerDesktop経由だとopenssl周りでエラーが出るため参照のissueが解消されたらalpineに切り替える
# https://github.com/prisma/prisma/issues/12417
FROM node:15.5.0

RUN apt-get update && apt-get install -y \
      bash \
      vim

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

# RUN chmod -R +x ./docker-scripts/

EXPOSE 8000

CMD yarn dev
