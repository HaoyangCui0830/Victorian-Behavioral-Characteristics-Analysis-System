function (keys, values, rereduce) {
  return_value = {
      "total": 0,
      "sentiment": 0,
      "average": 0
    };
  if (rereduce) {
    for (value in values){
      return_value.total += values[value].total
      return_value.sentiment += values[value].sentiment
      return_value.average = values[value].sentiment / values[value].total
    }
    return return_value

  } else {
    for (value in values){
      return_value.total += 1;
      return_value.sentiment += values[value].polarity
    }
    return return_value;
  }
}