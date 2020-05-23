function (keys, values, rereduce) {
  var suburbs = [];
  if (!rereduce) {
    values.forEach(function (value) {
      var suburb = value.suburb;
      if (suburbs.indexOf(suburb) < 0) {
        suburbs.push(suburb);
      }
    });
    return {subs: suburbs};
  } else {
    values.forEach(function (value) {
      value.subs.forEach(function (suburb) {
        if (suburbs.indexOf(suburb) < 0) {
          suburbs.push(suburb);
        }
      });
    });
     return {subs: suburbs};
    // var return_subs = []
    // if(suburbs.length > 1){
    // suburbs.forEach(function (suburb){
    //   return_subs.push(suburb)
    // })
    // }
    // return return_subs
  }
}