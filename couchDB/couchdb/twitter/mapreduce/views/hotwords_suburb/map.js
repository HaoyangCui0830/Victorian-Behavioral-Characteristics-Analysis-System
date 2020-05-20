function (doc) {
  if(doc.created_at != null){
    var res = doc.created_at.split(" ");
    var date_str = res[0] + " " + res[1] + " " + res[2] + ", " + res[5] + " " + res[3];
    var d = new Date(date_str);
    var n = d.getMonth();
    var m = d.getDate();
    var p = d.getFullYear()
    if(doc.suburb!=null && doc.suburb!="None"){
      doc.entities.hashtags.forEach(function (word) {
        if(p=="2020"){
        emit([word.text, doc.suburb, n, m], 1);
        }
      });
    }
  }
}