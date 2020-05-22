function (doc) {
  if (doc.suburb != "None" && doc.suburb != null){
    emit(doc.suburb, doc.user.followers_count);
  }
}