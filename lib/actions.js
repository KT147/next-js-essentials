"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input."
    }
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}

// !!! revalidatePath("/meals");
// sellega renderdatakse uuesti see leht, mille sulgudesse paned,
// vastasel juhul next.js ei tea, et leht uuenes ja kliendile kuvatakse
// endiselt vana valmis renderdatud leht ilma uuendusteta.

// !!! revalidatePath("/", "layout");
// layout valideeritakse ka uuesti (default on "page")
// sellega rerenderdatakse ka child-componentid.
