db.ingredients.update(
  {
    name: "White Pepper"
  },
  {
    $set: {unit: "tbsp"}
  }
)
