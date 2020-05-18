function (doc) {
  if(doc.suburb!="None" && (doc.attitude == "pos" || doc.attitude == "neg" || doc.attitude == "neu" )){
    value = doc.attitude
    emit(doc.suburb, value)
  }
}