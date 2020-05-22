function (doc) {
  if(doc.suburb!="None" && doc.suburb!=null){
    emit(doc.user.id_str, {"suburb": doc.suburb})
  }
}