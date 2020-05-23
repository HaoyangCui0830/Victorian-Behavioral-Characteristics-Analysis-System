function (doc) {
  if(doc.suburb!="None" && doc.suburb!=null){
    value = doc.sentiment.polarity
    emit(doc.suburb, {"suburb": doc.suburb, "polarity": value})
  }
}