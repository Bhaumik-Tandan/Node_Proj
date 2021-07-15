From node
WORKDIR .
RUN npm install
COPY . .
EXPOSE 5000
CMD "node" "op.js"