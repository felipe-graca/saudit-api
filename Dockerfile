FROM node:19-slim

WORKDIR /home/node/app

CMD ["tails", "-f", "/dev/null"]