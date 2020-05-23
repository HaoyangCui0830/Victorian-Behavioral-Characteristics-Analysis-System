function (doc) {
  if(doc.text.toLowerCase().indexOf("coffee") >= 0 && doc.suburb!="None" && doc.suburb != null && doc.attitude == "pos"){
     emit(doc.suburb, 1); 
  }
}