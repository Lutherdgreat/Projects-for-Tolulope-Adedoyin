/**
 * A class that handles anything to do with the Reports view
 */
class Track
{
	constructor(api, company_id)
	{
		this.start_button = document.getElementById("start_button");
		this.stop_button = document.getElementById("stop_button");
		this.counter  = document.getElementById("counter");
		this.description = document.getElementById("description");
		this.project = document.getElementById("project_id");

		this.track_form = undefined;

		// Update the timer immediately, then trigger the callback every second to update the clock

		//this.updateTimer();
		//window.interval = setInterval(this.updateTimer,1000);

		this.api = api;
		this.company_id = company_id;


		// INSERT YOUR CODE BELOW THIS LINE

		// if project is selected, then donot refresh projects list

		var selectedValue = this.project.options[this.project.selectedIndex].value;
		if (selectedValue == "")
		{
			this.loadProjects();
		} else {
			this.project_id  = selectedValue;
		}
	}

	updateTimer()
	{
		//console.log('----- updateTimer -----'); // disabled. too noisy
		// INSERT YOUR CODE BELOW THIS LINE


		this.counter.textContent = getTime();
	}

	/////////////////////////////////////////////
	//
	// EVENTS
	//
	/////////////////////////////////////////////

	start(event)
	{
		console.log('----- start -----', event);
		// INSERT YOUR CODE BELOW THIS LINE

		this.start_button.style.display = 'none';

		localStorage.setItem("timer_timestamp",getDatetime());

		this.stop_button.style.display = 'block';

		this.updateTimer();
		window.interval = setInterval(this.updateTimer,1000);

	}

	stop(event)
	{
		console.log('----- stop -----', event);
		// INSERT YOUR CODE BELOW THIS LINE


		this.stop_button.style.display = 'none';
		this.start_button.style.display = 'block';

		clearInterval(window.interval);
		this.counter.textContent = '';
		var stop_timestamp = getDatetime();

		let parameters = {'project_id':this.project_id,'description':this.description.value,'user_id':getUserID(),'start_time':localStorage.getItem('timer_timestamp'),'end_time':stop_timestamp};
		this.api.makeRequest('POST','projects/entries', parameters, this.entryDone);
	}
	entryDone (response){
		console.log(response);
		alert("Entry "+response.entry_id+" was made successfully. see the console for full entry detail.");
	}


	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////


	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE BELOW THIS LINE
		this.api.makeRequest('GET','companies/'+this.company_id+'/projects', {}, this.fillProjectsWithResponse);
	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

		//  xhr_response is already json decoded response
		var element = document.getElementById('project_id');
		Object.keys(xhr_response).forEach(function(key) {
			// console.log(key, xhr_response[key].project_id,xhr_response[key].title);
			element.innerHTML = element.innerHTML + '<option value="' + key + '">' + xhr_response[key].title + '</option>';
		});

		//console.log(JSON.parse(localStorage.getItem("profile_object")));
		//console.log(getUserID());
	}
}
