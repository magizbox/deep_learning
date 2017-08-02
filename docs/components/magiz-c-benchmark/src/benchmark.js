/**
 * Created by rain on 10/11/2016.
 */
// $(".benchmark").popover({"delay": {"show": 100, "hide": 800}});

function renderHTML(benchmark){
  var content = '' +
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
  return content;
}

function createBenchmarkDom(rootDom){
  var content = '';
  var gid = $(rootDom).attr("gid");
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
      var benchmarkContent = renderHTML(benchmark);
      content += benchmarkContent;
    });
    content += postContent;
    $(rootDom).append(content);
    $('[data-toggle="confirmation"]').confirmation();
  });
}

var CustomScoreBenchmarkDom = {
  buildTitle: function(labels){
    var scoreDom = '';
    _.each(labels, function(label){
      scoreDom += '<th class="col-xs-1">' + label + '</th>';
    });
    var preContent = '' +
      '<table class="table table-striped table-hover">' +
      '<thead>' +
      '<tr>' +
      scoreDom +
      '<th>Method</th>' +
      '<th class="col-xs-5"><b>Authors</b></td>' +
      '<th class="col-xs-1"><b>Venue</b></td>' +
      '<th class="col-xs-1"><b>Details<b></td>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';
    return preContent;
  },

  buildPostContent: function(){
    var postContent = '' +
      '</tbody>' +
      '</table>';
    return postContent;
  },

  buildRow: function(benchmark, labels){
    labels = _.map(labels, function(label){ return label.toLowerCase() });
    var scores = "";
    _.each(labels, function(label){
      scores += '<td>' + benchmark[label] +'</td>';
    });
    var content = '' +
      '<tr>' +
      scores +
      '<td>' +
      '<a href="' + benchmark.website + '" target="_blank">' + benchmark.method + '</a>' +
      '</td>' +
      '<td>' + benchmark.authors + '</td>' +
      '<td>' + benchmark.time + '</td>' +
      '<td>' +
      '<a class="btn btn-default benchmark" data-html="true" data-original-title="Additional information" data-content="' + benchmark.description + '" data-placement="left" data-toggle="confirmation" data-trigger="hover" rel="popover">Details </a>' +
      '</td>' +
      '</tr>';
    return content;
  },

  build: function(rootDom){
    var gid = $(rootDom).attr("gid");
    var labels = $(rootDom).attr("scores").split(",");
    var content = '';
    content += CustomScoreBenchmarkDom.buildTitle(labels);
    getJSONFromGoogleSpreadsheet(gid, function (benchmarks) {
      _.each(benchmarks, function (benchmark) {
        var benchmarkContent = CustomScoreBenchmarkDom.buildRow(benchmark, labels);
        content += benchmarkContent;
      });
      content += CustomScoreBenchmarkDom.buildPostContent();
      $(rootDom).append(content);
      $('[data-toggle="confirmation"]').confirmation();
    });
  }
};
function createBenchmarkDomWithCustomScore(rootDom){
}

$(".benchmarks").each(function () {
  var rootDom = this;
  var hasCustomScore = $(this).attr("scores") != undefined;
  if (!hasCustomScore){
    createBenchmarkDom(rootDom);
  } else {
    CustomScoreBenchmarkDom.build(rootDom);
  }
});
