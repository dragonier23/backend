FROM node:alpine

ARG user="node"
ARG appdir="/home/node/app"

RUN mkdir -p ${appdir} && chown -R ${user} ${appdir}
WORKDIR ${appdir}
USER ${user}

COPY --chown=${user} package.json package-lock.json ./
RUN npm install

COPY --chown=${user} . .

EXPOSE 3000
ENV PORT 3000

CMD [ "npm", "run", "dist" ]