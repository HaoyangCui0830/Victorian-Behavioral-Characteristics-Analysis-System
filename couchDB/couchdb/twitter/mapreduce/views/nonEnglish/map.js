function (doc) {
  if (doc.suburb != "None" && doc.suburb != null && doc.lang != "en"){
    emit([doc.suburb, doc.lang], 1);
  }
}