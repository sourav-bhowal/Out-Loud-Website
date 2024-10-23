"use server";
import { DBConnect } from "@/lib/db";
import { EventModel } from "@/models/Event.model";
import { createEventSchema, CreateEventSchemaType } from "@/validations/article.schema";
import { currentUser } from "@clerk/nextjs/server";

// CREATE EVENT ACTION FUNCTION
export async function createEvent(inputValues: CreateEventSchemaType) {
  // CHECK IF USER IS LOGGED IN
  const user = await currentUser();

  // IF NO USER
  if (!user) throw Error("Unauthorized");

  // CONNECT TO DATABASE
  await DBConnect();

  // VALIDATE INPUT VALUES
  const { title, description, category, time, date, attachmentIds } =
    createEventSchema.parse(inputValues);

  // CREATE EVENT
  const event = new EventModel({
    title,
    description,
    userId: user.id,
    category,
    time,
    date,
    attachments: attachmentIds?.map((id) => id) ?? [],
  });

  // SAVE EVENT
  const savedEvent = await event.save();

  // POPULATE EVENT
  const newEvent = await EventModel.findById (savedEvent._id).populate("attachments");

  // console.log("Article created", newEvent);

  // RETURN EVENT
  return JSON.parse(JSON.stringify(newEvent));
}
