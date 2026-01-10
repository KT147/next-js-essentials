import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Loading meals failed")
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  //teeb slugi loetavaks "hamburger with chips === hamburger-chips"
  meal.slug = slugify(meal.title, { lower: true });

  //xss kaitseb dangeroushtml'i eest
  meal.instructions = xss(meal.instructions);

  // võtab failinimest viimase otsa "hamburger.jpg" === "jpg"
  const extension = meal.image.name.split(".").pop();
  // paneb slugi ja pikenduse kokku
  const fileName = `${meal.slug}.${extension}`;

  //fs.createWriteStream teeb FAILI public kausta, stream kirjutab seda järk-järgult
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  //arrayBuffer() tagastab faili binaarsisu , nt pilt on 100KB, binaarsisu 102400
  const bufferedImage = await meal.image.arrayBuffer();

  //stream.write() kirjutab FAILI sisu, Buffer.from() teeb selle binaarseks,
  // ilma binaarsuseta läheks andmebaasi tekst.
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES ( 
   @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug)`
  ).run(meal);
}

// Kui kirjutab AWS-i pildi

// s3.putObject({
//   Bucket: 'maxschwarzmueller-nextjs-demo-users-image',
//   Key: fileName,
//   Body: Buffer.from(bufferedImage),
//   ContentType: meal.image.type,
// });
