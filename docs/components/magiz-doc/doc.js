/**
 * Created by rain on 24/7/2017.
 */
// fix span in title
function parseTitle(title){
    var regex = /<span .*><\/span> (.*)/g;
    var matched = regex.exec(title);
    if(matched){
        title = matched[1];
    }
    return title;
}

$(document).ready(function(){
    var title = $("title").text();
    title = parseTitle(title);
    $("title").text(title);
});
