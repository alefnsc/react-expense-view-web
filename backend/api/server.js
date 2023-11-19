import jsonServer from "json-server";
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom routes for "despesas" only
const despesasRouter = jsonServer.router("db.json", {
  foreignKeySuffix: "_id",
});
server.use("/despesas", despesasRouter);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Assign the server object to a global variable
window.server = server;
