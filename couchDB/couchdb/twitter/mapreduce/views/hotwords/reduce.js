function (keys, values, rereduce) {
  return_value = {
      "positive": 0,
      "negative": 0,
      "neutral": 0,
      "total": 0,
      "sentiment": 0,
      "average": 0
    };
  if (rereduce) {
    for (value in values){
      return_value.positive += values[value].positive
      return_value.negative += values[value].negative
      return_value.neutral += values[value].neutral
      return_value.total += values[value].total
      return_value.sentiment += values[value].sentiment
      return_value.average = values[value].sentiment / values[value].total
    }
    return return_value

  } else {
    for (value in values){
      if (values[value].attitude == "pos"){
        return_value.positive += 1
      }
      if (values[value].attitude == "neg"){
        return_value.negative += 1;
      }
      if (values[value].attitude == "neu"){
        return_value.neutral += 1;
      }
      return_value.total += 1;
      return_value.sentiment += values[value].sentiment
    }
    return return_value;
  }
}