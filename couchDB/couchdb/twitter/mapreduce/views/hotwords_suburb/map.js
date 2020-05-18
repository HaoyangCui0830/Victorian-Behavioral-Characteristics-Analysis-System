function (doc) {
  if(doc.created_at != null){
    var res = doc.created_at.split(" ");
    var date_str = res[0] + " " + res[1] + " " + res[2] + ", " + "2020 " + res[3];
    var d = new Date(date_str);
    var n = d.getMonth();
    var m = d.getDate();
    if(doc.suburb!=null && doc.suburb!="None"){
      doc.entities.hashtags.forEach(function (word) {
        emit([word.text, n, m, doc.suburb], 1);
      });
    }
  }
}