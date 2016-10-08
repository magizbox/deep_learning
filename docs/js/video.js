/**
 * Created by rain on 7/29/2016.
 */
$(".videos").each(function(index, videos) {
  var gid = $(this).attr("gid");
  var rootDom = this;
  getJSONFromGoogleSpreadsheet(gid, function (videos) {
    console.log(videos[0]);
    _.each(videos, function (video) {
      if(video.name.length > 80){
        video.name = video.name.substring(0, 78) + "...";
      }
      //noinspection JSUnresolvedVariable
      var videoDom =
        '<div class="video col-lg-4 col-sm-6">' +
        '  <a class="thumb-block target="_blank" href="' + video.url + '">' +
        '  <img class="thumb" src="' + video.image + '"/>' +
        '  <div class="caption">' +
        '  <span class="date">' + video.date + '</span>' +
        '</div>' +
        '</a>' +
        '<br/>' +
        '<a target="_blank" href="' + video.url + '" class="link">' +
        '  <strong>' + video.name + '</strong><br/>' +
        '</a>' +
        '<a class="author_thumb" target="_blank" href="' + video.authorurl + '">' +
        '  <img src="' + video.authorimageurl + '"/>' +
        '  </a>' +
        '  <a class="author" href="' + video.authorurl + '">' + video.author + '</a>' +
        '</div>'
      $(rootDom).append(videoDom);
    });
  });
});
