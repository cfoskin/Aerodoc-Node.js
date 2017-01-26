FROM centos:7

EXPOSE 8080

ENV NODE_ENV=production \
    SERVER_PORT=8080

USER root

RUN mkdir -p /usr/src/app && \
	yum -y install epel-release && \
	yum -y install nodejs npm && \
	useradd -ms /bin/bash default

WORKDIR /usr/src/app

COPY . .

RUN npm install --production && \
	chown -R default:root ./

USER 1001

CMD [ "node", "index.js" ]
