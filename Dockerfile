FROM node:12

COPY . /srv/angular/
WORKDIR /srv/angular
RUN ls -lh
RUN ls -lh ./src/
RUN mkdir -p /srv/angular
RUN echo "Asia/Vladivostok" > /etc/timezone
RUN npm install -g @angular/cli
RUN ls -lh
RUN ls -lh ./src/

RUN npm install
EXPOSE 4200


CMD ng serve --disable-host-check --host 0.0.0.0
