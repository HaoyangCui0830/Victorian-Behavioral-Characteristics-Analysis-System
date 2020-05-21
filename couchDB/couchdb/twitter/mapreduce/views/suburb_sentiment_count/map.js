function (doc) {
  if(doc.suburb!="None" && doc.suburb!=null && (doc.attitude == "pos" || doc.attitude == "neg" || doc.attitude == "neu" )){
    value = doc.attitude
    emit(doc.suburb, value)
  }
}