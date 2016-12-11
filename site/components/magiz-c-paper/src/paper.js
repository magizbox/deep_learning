/**
 * Created by rain on 7/29/2016.
 */
$(".papers").each(function() {
  var gid = $(this).attr("gid");
  var rootDom = this;
  getJSONFromGoogleSpreadsheet(gid, function (papers) {
    _.each(papers, function (paper) {
      //noinspection JSUnresolvedVariable
      var pdf_link = "";
      if (paper.extrapdf){
        pdf_link = '<a href="' + paper.extrapdf + '" target="_blank"><i class="fa fa-file-pdf-o fa-2x" aria-hidden="true"></i></a>';
      }
      var paperDom =
        '<div class="paper">' +
          '<a href="' + paper.link + '">' + paper.title + '</a>' +
          '<div class="authors">' + paper.authors + '</div>' +
          '<span class="time">' + paper.time + '</span><br/>' +
          '<div class="external_links">' +
            pdf_link +
          '</div>' +
        '</div>';
      $(rootDom).append(paperDom);
    });
  });
});
