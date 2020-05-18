function (doc) {
  if(doc.suburb!="None"){
    value = doc.sentiment.polarity
    emit(doc.suburb, {"suburb": doc.suburb, "polarity": value})
  }
}