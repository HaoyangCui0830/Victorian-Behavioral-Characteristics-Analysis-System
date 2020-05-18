function (doc) {
  if(doc.text.toLowerCase().includes("coffee") && doc.suburb!="None" && doc.attitude == "pos"){
     emit(doc.suburb, 1); 
  }
}