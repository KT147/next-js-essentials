import MealItem from "./MealItem";
import classes from "./MealsGrid.module.css";

function MealsGrid(props) {
  return (
    <ul className={classes.meals}>
      {props.meals.map((meal) => (
        <li key={meal.id}><MealItem {...meal}/></li>
      ))}
    </ul>
  );
}

export default MealsGrid;
