function (doc) {
  var words = ['melbourne', 'victraffic', 'australia', 'isolation', 'covid', 'food', 'reading', 'photography', 'love','socialdistancing', 'sunset', 'art', 'instafood', 'streetartmelbourne', 'foodporn', 'starwars', 'stayhome', 'staysafe', 'communitinnies', 'maythe4thbewithyou', 'nature', 'yummy', 'walking', 'coffee']
  for (i = 0; i < words.length; i++){
    if (doc.text.indexOf(words[i]) >= 0 && doc.suburb!=null && doc.suburb!= "None"){
      emit([words[i], doc.suburb], {"count":1, "attitude":doc.attitude,"sentiment":doc.sentiment.polarity});
    }
  }
}