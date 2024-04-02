import fastify from "fastify";

const app = fastify();

app.get("/", (Request, Reply) => {
	return "hello world";
});
app.listen({ port: 3000 | 8080 }).then(() => {
	console.log("app running");
});
