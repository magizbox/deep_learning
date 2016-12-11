/**
 * Created by rain on 10/11/2016.
 */
// $(".benchmark").popover({"delay": {"show": 100, "hide": 800}});

$(".benchmarks").each(function () {
  var gid = $(this).attr("gid");
  var rootDom = this;
  var content = '';
  var preContent = '' +
    '<table class="table table-striped table-hover">' +
    '<thead>' +
    '<tr>' +
    '<th class="col-xs-1">Result</th>' +
    '<th>Method</th>' +
    '<th class="col-xs-5"><b>Authors</b></td>' +
    '<th class="col-xs-1"><b>Venue</b></td>' +
    '<th class="col-xs-1"><b>Details<b></td>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';
  content += preContent;
  var postContent = '' +
    '</tbody>' +
    '</table>';
  getJSONFromGoogleSpreadsheet(gid, function (benchmarks) {
    _.each(benchmarks, function (benchmark) {
      //noinspection JSUnresolvedVariable
      var benchmarkContent = '' +
        '<tr>' +
        '<td>' + benchmark.result +'</td>' +
        '<td>' +
        '<a href="' + benchmark.website + '" target="_blank">' + benchmark.method + '</a>' +
        '</td>' +
        '<td>' + benchmark.authors + '</td>' +
        '<td>' + benchmark.time + '</td>' +
        '<td>' +
        '<a class="btn btn-default benchmark" data-html="true" data-original-title="Additional information" data-content="' + benchmark.description + '" data-placement="left" data-toggle="confirmation" data-trigger="hover" rel="popover">Details </a>' +
        '</td>' +
        '</tr>';
      content += benchmarkContent;
    });
    content += postContent;
    $(rootDom).append(content);
    $('[data-toggle="confirmation"]').confirmation();
  });
});
