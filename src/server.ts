import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient({
	log: ["query"],
});

app.post("/events", async (request, reply) => {
	const createEventsSchema = z.object({
		title: z.string().min(4),
		details: z.string().nullable(),
		maximunAttendees: z.number().int().positive().nullable(),
	});

	const data = createEventsSchema.parse(request.body);

	const  event = await prisma.event.create({
		data: {
			title: data.title,
			details: data.details,
			maximunAttendees: data.maximunAttendees,
			slug: new Date().toISOString(),
		},
	});
	return reply.status(201).send({eventId:event.id})
});
app.listen({ port: 3000 }).then(() => {
	console.log("app running");
});
