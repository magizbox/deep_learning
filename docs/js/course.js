/**
 * Created by rain on 7/29/2016.
 */

$(".courses").each(function(index, courses){
  var gid = $(this).attr("gid");
  var rootDom = this;
  getJSONFromGoogleSpreadsheet(gid, function (courses) {
    _.each(courses, function (course) {
      //noinspection JSUnresolvedVariable
      var courseDom =
        '<div class="course">' +
        '  <div class="thumb">' +
        '    <img src="' + course.image + '"/>' +
        '  </div>' +
        '  <div class="description">' +
        '    <a href="' + course.url + '">' + course.name + '</a><br/>' +
        '    <span class="date">' + course.date + '</span><br/>' +
        '    <div class="content">' + course.description + '</div>' +
        '      <span class="build">BUILD BY</span> <span class="organization">' + course.organization + '</span> <span class="build">via</span> <a class="provider" href="' + course.providerurl + '">' + course.provider + '</a></span><br/>' +
        '    </div>' +
        '</div>';
      $(rootDom).append(courseDom);
    });
  });
});
