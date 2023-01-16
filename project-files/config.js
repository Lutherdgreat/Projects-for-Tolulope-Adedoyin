/**
 * @var api_url
 * @type {string}
 * The URL that points to the main API path. All commands use this primary URL
 */
let api_url = 'https://acs2909.lusciousorange.com/t-api/';

/**
 * API KEYS
 * @type {string}
 * The three API keys for the three segments of the project. You must replace these YOUR KEYS for your respective roles.
 * @todo: clear these
 */
let api_key_time_tracking = 'k3w9g57-rybpd7nsxfq5kt86-x6gtfd9'; // PERSON A
let api_key_reports       = ''; // PERSON B
let api_key_projects      = ''; // PERSON C


/**
 * @var {int} company_id
 * Your company ID, you must replace this is your value once you know your company ID
 */
let company_id = 57;


/**
 * PROFILE CALL
 * This profile call must remain here as the first thing that happens in the config. It uses your API key to get the
 * profile of who is currently working.
 *
 * The code below will use your personal API key set in my_api_key.js
 * DO NOT MODIFY THIS CODE
 */
let current_api_key = my_api_key || api_key_time_tracking || api_key_reports || api_key_projects;
let my_api = new TimeTrackerApi(current_api_key, api_url);
my_api.makeRequest('GET','acs/profile', {}, saveUserID);
my_api = null;


/**
 * A function to save the user ID of the provide profile object
 * @param {object} profile_object
 */
function saveUserID(profile_object)
{
	console.log('----- saveUserID -----', profile_object);
	// INSERT YOUR CODE BELOW THIS LINE
	localStorage.setItem("profile_object",JSON.stringify (profile_object));
}

/**
 * A function to get the user ID
 */
function getUserID()
{
	return JSON.parse(localStorage.getItem("profile_object")).user_id;
}


/**
 * A method that shows an error message on the screen
 * @param {object} error_details
 */
function showError(error_details)
{
	console.error('----- showError -----', error_details);
	// INSERT YOUR CODE BELOW THIS LINE
}

/////////////////////////////////////////////
//
// TIME UTILITY FUNCTIONS
// These are functions provided to you as a
// courtesy to help with the build process.
//
/////////////////////////////////////////////

/**
 * A utility function that accepts a number of seconds and returns a formatted time with hours minutes and seconds.
 * @param {int} seconds
 * @returns {string} A time in the format of h:mm:ss
 */
function convertSecondsToHoursMinutesSeconds(seconds)
{
	let hours = Math.floor(seconds/3600);
	seconds -= hours*3600; // remove the hours seconds from the calculations

	let minutes = Math.floor(seconds / 60);
	seconds -= minutes*60; // remove the hours seconds from the calculations

	return hours + ':' + pad2Digits(minutes) + ":" + pad2Digits(seconds);
}

/**
 * Converts a timestamp integer into a string formatted as YYYY-MM-DD hh:mm:ss
 * @param {int} timestamp
 * @returns {string}
 */
function convertTimestampToDateFormat(timestamp)
{
	let d = new Date( parseInt(timestamp));

	return d.getFullYear() + '-' + pad2Digits(d.getMonth() + 1) + '-' + pad2Digits(d.getDate())
		+ ' ' + pad2Digits(d.getHours()) + ':' + pad2Digits(d.getMinutes()) + ':' + pad2Digits(d.getSeconds());

}


/**
 * A function to pad numbers to 2 digits
 * @param number
 * @return {string|*}
 */
function pad2Digits(number)
{
	return (number < 10 ? '0' + number : number);
}
function getDate() {
	var dateObj = new Date();
	var month = (dateObj.getMonth() < 9 ? '0': '') + (dateObj.getMonth()+1);
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	return  year + "-" + month + "-" + day;
}
function getMonth(date) {
	var month = date.getMonth() + 1;
	return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}

function getTime() {
	var dateObj = new Date();
	return dateObj.toLocaleTimeString('en-GB');
}
function getDatetime() {
	return getDate()+" "+getTime();
}