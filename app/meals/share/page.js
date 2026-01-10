"use client"

import ImagePicker from "@/components/meals/ImagePicker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/MealsFormSubmit";
import { useFormState } from "react-dom";

export default function ShareMealPage() {

  //useFormState käitub vahemehena, võtab sisse funktsooni, mida ta täitma peab
  // ja algse teabe, kui veel funktsioonilt vastust tulnud pole.
  // kandiliste sulgude sees on 1. see state, mida kuvab, nt state. message näol.
  // 2. on action, mis läheb nüüd formi funktsiooniks.

  const [state, formAction] = useFormState(shareMeal, {message: null})

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
              <MealsFormSubmit/>
          </p>
        </form>
      </main>
    </>
  );
}
