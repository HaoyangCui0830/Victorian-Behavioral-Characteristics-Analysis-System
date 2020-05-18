function (doc) {
  if(doc.created_at != null){
    var res = doc.created_at.split(" ");
    var date_str = res[0] + " " + res[1] + " " + res[2] + ", " + res[5] + " "+ res[3];
    var d = new Date(date_str);
    var n = d.getMonth();
    var m = d.getDate();
    var p = d.getFullYear()
    const words = ['victraffic', 'melbourne', 'Melbourne', 'isolation', 'australia', 'food', 'Australia', 'covid19', 'cartoon', 'reading', 'amreading', 'currentlyreading', 'photography', 'read', 'Repost', 'socialdistancing', 'art', 'autumn', 'byst', 'sunset', 'instafood', 'streetartmelbourne', 'architecture', 'covid_19', 'foodporn', 'iso', 'throwback', 'boby', 'cleanplaster', 'fitness', 'homemade', 'staysafe', 'succulents', 'togetherasone', 'artist', 'artwork', 'BluRay', 'Communitinnies', 'dog', 'instagood', 'latergram', 'lockdown', 'maythe4thbewithyou', 'nature', 'stayhome', 'tbt', 'yummy', 'bobyfrenchbull', 'cacti', 'clouds', 'colourful', 'fazilshares', 'fazilwrites', 'frenchbulldog', 'home', 'love', 'MARTAN', 'selfie', 'starwars', 'tie', 'togetherathome', 'trainspotting', 'travel', 'vintage', '烨鸢Guxito', 'beard', 'blackandwhite', 'brunswick', 'catsofinstagram', 'foodwaste', 'graffitiart', 'i4sdigital', 'illustration', 'lockdownmenu', 'lovegoodbreakfast', 'memademay2020', 'michaelblameyphotography', 'monchemin', 'nofilter', 'plants', 'pots', 'puppy', 'puppylove', 'selfisolation', 'silk', 'travnash', 'walking', '24daychallenge', 'adventuresinresin', 'Beer', 'covid', 'cycling', 'dinner', 'dinnerathome', 'doodle', 'drawing', 'dressinisolation', 'family', 'free', 'gardening']
    doc.entities.hashtags.forEach(function (word) {
        if(words.includes(word.text) && p=="2020"){
        emit([word.text, n, m, doc.suburb], {"count":1, "attitude":doc.attitude,"sentiment":doc.sentiment.polarity});
        }
    });
  }
}