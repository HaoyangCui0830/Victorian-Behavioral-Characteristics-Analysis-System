function (keys, values, rereduce) {
  return_value = {
      "data": [],
      "sub": []
    };
  if (rereduce) {
    for (value in values){
      for (s in values[value].data){
        if(return_value["sub"].includes(values[value]["data"][s].suburb) == false){
          return_value["data"].push(values[value]["data"][s])
          return_value["sub"].push(values[value]["data"][s].suburb)
        }
        else{
          for (d in return_value["data"]){
            if(return_value["data"][d]['suburb'] == values[value]["data"][s].suburb){
              return_value["data"][d]['s'] += values[value]["data"][s].s
              return_value["data"][d]['n'] += values[value]["data"][s].n
            }
          }
        }
      }
    }
    
    for (d in return_value["data"]){
      return_value["data"][d]["a"] = return_value["data"][d]["s"]/return_value["data"][d]["n"]
    }
    return return_value
  } else {
    for (value in values){
      if(return_value["sub"].includes(values[value].suburb) == false){
        var obj = {}
        obj['s'] = values[value].polarity
        obj['n'] = 1
        obj['suburb'] = values[value].suburb
        return_value["data"].push(obj)
        return_value["sub"].push(values[value].suburb)
      }
      else{
        for (d in return_value["data"]){
          if (return_value["data"][d]['suburb'] == values[value].suburb){
            return_value['data'][d]['s'] +=  values[value].polarity
            return_value['data'][d]['n'] +=  1
          }
        }
      }
    }
    return return_value;
  }
}