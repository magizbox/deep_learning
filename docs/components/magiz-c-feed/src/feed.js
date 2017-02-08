/**
 * Created by rain on 7/29/2016.
 */
$(".feeds").each(function (index, feeds) {
  var gid = $(this).attr("gid");
  var rootDom = this;
  getJSONFromGoogleSpreadsheet(gid, function (feeds) {
    console.log(feeds[0]);
    _.each(feeds, function (feed) {
      var feedDom =
        '<div class="media">' +
        '    <div class="media-body">' +
        '      <h4 class="media-heading"> <a target="_blank" class="feed-title" href="' + feed.url +'">' + feed.title + '</a></h4>' +
        '      <div class="feed-metadata">' +
        '        <span>' + feed.date + '</span> <br/>' +
        '      </div>' +
        '   <div class="feed-content">' + feed.content + '</div>' +
        '   </div>' +
        ' </div>';
      $(rootDom).append(feedDom);
    });
  });
});
