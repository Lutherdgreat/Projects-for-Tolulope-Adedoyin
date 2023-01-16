/**
 * DO NOT MODIFY THIS FILE
 *
 * Configure the API and call the profile
 * @type {TimeTrackerApi}
 */
const api = new TimeTrackerApi(api_key_time_tracking, api_url);

// Load the reports after the DOM has loaded
window.addEventListener('DOMContentLoaded',() => new Track(api, company_id));

window.addEventListener('load',function(){
    document.getElementById("start_button").addEventListener("click", function(e) {
        let track = new Track(api, company_id);
        track.start(e);
    });
    document.getElementById("stop_button").addEventListener("click", function(e) {

        var description = document.getElementById("description");
        var project = document.getElementById("project_id");

        if(description.value =='' || project.options[project.selectedIndex].value=='') {
            alert("You must choose project and enter some description");
            return false;
        }

        let track = new Track(api, company_id);
        track.stop(e);
    });
});



