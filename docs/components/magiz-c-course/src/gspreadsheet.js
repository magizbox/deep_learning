// GoogleSpreadsheet 1.0
// (c) 2015 Brother Rain
// dependencies: jquery
// dependencies: underscore

// get json from Google Spreadsheet
function getJSONFromGoogleSpreadsheet(spreadsheetID, callback){
  function convertItem(item){
      var result = {};
      var keys = _.keys(item);
      _.each(keys, function(key){
        if(_.contains(key, "$")){
           var realKey = key.split("$")[1];
           result[realKey] = item[key]["$t"];
        }
      });
    return result;
  }
  var spreadsheetURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
  $.getJSON(spreadsheetURL, function(data){
      var items = data.feed.entry;
      var items = _.map(items, convertItem);
      callback(items);
  });
};