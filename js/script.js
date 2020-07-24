// script.js
// creates variable to store data *ADD YOUR NEW DATA HERE -> var ______Data;*
var mentorData;
var remoteData;
var centros2020Data;
var centros2019Data;

// creates used array - which makes sure there are no duplicates
used = [];


$(document).ready(function() {
	// makes selectors able to be searchable
	$(".chosen-select").chosen();

	// if the first selector is changed
	$('#tableList').change(function(e) {

		// empty the second selector (because you are changing the first selector so the RUEE's will be different)
		// also the append adds the standard [select RUEE], which is the first element
		$('#schoolList').empty().append('<option value="">-- Select RUEE --</option>')

		// empty the array
		used = []

		// run clear everything function (which removes all tables since you are changing which data you want to see)
		clearEverything()

		// based on what value you select you should get different data
		switch ($('#tableList').val()) { // *ADD STUFF HERE -> COPY ONE OF THE CASES AND CHANGE APPROPRIATELY (email goepnik@gmail.com for help)
			// if you select mentorData run mentorData
			case "mentorData":
				// get data from spreadsheet
				$.get("https://sheets.googleapis.com/v4/spreadsheets/1nE79aQlIS7Y09vg3kJ0h_aOGJVdVdQCwfojn79NEmgg/values/Sheet1!A2:F100?key=AIzaSyAeY3E1MYOhF0zNMWluG00vLj4fuCg3ENM", function(data) {
					// set mentorData equal to the data from spreadsheet
					mentorData = data.values;
					// for each value in the data
					mentorData.forEach(function(entry) {
						// get the RUEE
						name = entry[0];
						// if the RUEE is already done skip this otherwise
						if (used.includes(name) != true) {
							// append the data to the schoolList selector
							$('#schoolList').append($('<option>', {
								value: name,
								text: name
							}));
							used.push(name);
						}
					});
					// update the chosen (the thing making selectors searchable)
					$(".chosen-select").trigger("chosen:updated");
				});
				// end loop
				break;
			// reference above (same code)
			case "remoteData": // change this line
				$.get("https://sheets.googleapis.com/v4/spreadsheets/1JqqxSrBs27Qh_jnZeq_S3qBCOrcJ_lkap6Vx66k_U2c/values/Sheet1!A2:AG100?key=AIzaSyAeY3E1MYOhF0zNMWluG00vLj4fuCg3ENM", function(data) { // change this line
					remoteData = data.values; // change this line
					remoteData.forEach(function(entry) { // change this line
						name = entry[12]; // change this line
						if (used.includes(name) != true) {
							$('#schoolList').append($('<option>', {
								value: name,
								text: name
							}));
							used.push(name);
						}
					});
					$(".chosen-select").trigger("chosen:updated");
				});
				break;

			case "centros2019Data":
			  $.get("https://sheets.googleapis.com/v4/spreadsheets/1aALnfGBWnPGlht4bI6Adqvmkl_1bjXet9GYafFSKYCw/values/centros!A2:AE10000?key=AIzaSyAeY3E1MYOhF0zNMWluG00vLj4fuCg3ENM", function(data) {
					centros2019Data = data.values;
			    centros2019Data.forEach(function(entry) {
			      name = entry[0];
			      if (used.includes(name) != true) {
			        $('#schoolList').append($('<option>', {
			          value: name,
			          text: name
			        }));
			        used.push(name);
			      }
			    });
					$(".chosen-select").trigger("chosen:updated");
			  });
				break;

			case "centros2020Data":
				$.get("https://sheets.googleapis.com/v4/spreadsheets/1e6X4V3BDoFUV_5XGPa8UXE6KvcuTDY0Knj_rCKc7FCg/values/centros!A2:Y10000?key=AIzaSyAeY3E1MYOhF0zNMWluG00vLj4fuCg3ENM", function(data) {
					centros2020Data = data.values;
					centros2020Data.forEach(function(entry) {
						name = entry[0];
						if (used.includes(name) != true) {
							$('#schoolList').append($('<option>', {
								value: name,
								text: name
							}));
							used.push(name);
						}
					});
					$(".chosen-select").trigger("chosen:updated");
				});
				break;

			default:
				// if error console should print error
				console.log("ERROR");
		}
	})

	// if the second selector is changed
  $('#schoolList').change(function(e) {
		// clear everything again (just to make sure)
		clearEverything()

		// check to see what RUEE was selected and run the appropiate function *ADD STUFF HERE -> copy one of the cases and add appropriately
		switch ($('#tableList').val()) {
			case "mentorData":
				mentorReportFunc($('#schoolList').val());
				break;
			case "remoteData":
				remoteReportFunc($('#schoolList').val());
				break;
			case "centros2020Data":
				centros2020ReportFunc($('#schoolList').val());
				break;
			case "centros2019Data": // change this line
				centros2019ReportFunc($('#schoolList').val()); // change this line
				break;

			default:
				console.log("error with schoollist change function");

		}

  })

});

// the different functions * YOU NEED TO COPY A FUNCTION (like CENTROS2020 since it doesn't have my comments) AND EDIT APPROPRIATELY

function remoteReportFunc(data) {
  $('#remoteReport').html('');
	$('#remoteReport').css("visibility", "hidden")

	// choose which columns of data you want *YOU NEED TO CHANGE THIS
  var choiceOfColumns = [12, 24, 7, 8, 16]

	// set table variable and add header *YOU NEED TO CHANGE THE HEADERS YOU WANT
  var table = '';
  table += "<tr><th style=\"border-top-left-radius:10px\">RUEE</th><xth>Event</th><th>Date</th><th>First Name</th><th>Last Name</th><th style=\"border-top-right-radius:10px\">Institute</th></tr>";

	// for each value in the data
  remoteData.forEach(function(entry) {
		// add data to table
    if (entry[choiceOfColumns[0]] == data) {
      var columns = choiceOfColumns.length;
      table += '<tr>';
      for (var i = 0; i < columns; i++) {
        table += '<td>';
        table += entry[choiceOfColumns[i]];
        table += '</td>';
      }
      table += '</tr>';

      $('#remoteReport').append(table);
      $('#remoteReport').css("visibility", "visible")
      table = '';
    }
  });
}

function centros2020ReportFunc(data) {
  $('#centros2020Report').html('');
	$('#centros2020Report').css("visibility", "hidden")

  var choiceOfColumns = [0, 3, 7, 8, 9, 12]

  var table = '';
  table += "<tr><th style=\"border-top-left-radius:10px\">RUEE</th><xth>Event</th><th>Date</th><th>First Name</th><th>Last Name</th><th>SOMETHING</th><th style=\"border-top-right-radius:10px\">Institute</th></tr>";

  centros2020Data.forEach(function(entry) {
    if (entry[choiceOfColumns[0]] == data) {
      var columns = choiceOfColumns.length;
      table += '<tr>';
      for (var i = 0; i < columns; i++) {
        table += '<td>';
        table += entry[choiceOfColumns[i]];
        table += '</td>';
      }
      table += '</tr>';
      $('#centros2020Report').append(table);
      $('#centros2020Report').css("visibility", "visible")
      table = '';
    }
  });
}

function centros2019ReportFunc(data) {
  $('#centros2019Report').html('');
	$('#centros2019Report').css("visibility", "hidden")

  var choiceOfColumns = [0, 3, 7, 8, 9, 12]

  var table = '';
  table += "<tr><th style=\"border-top-left-radius:10px\">RUEE</th><xth>Event</th><th>Date</th><th>First Name</th><th>Last Name</th><th>SOMETHING</th><th style=\"border-top-right-radius:10px\">Institute</th></tr>";

  centros2019Data.forEach(function(entry) {
    if (entry[choiceOfColumns[0]] == data) {
      var columns = choiceOfColumns.length;
      table += '<tr>';
      for (var i = 0; i < columns; i++) {
        table += '<td>';
        table += entry[choiceOfColumns[i]];
        table += '</td>';
      }
      table += '</tr>';
      $('#centros2019Report').append(table);
      $('#centros2019Report').css("visibility", "visible")
      table = '';
    }
  });
}

function mentorReportFunc(data) {
  $('#mentorReport').html('');
	$('#mentorReport').css("visibility", "hidden")

	// THIS IS DIFFERENT BECAUSE THE DATA WAS IN ORDER (DO NOT COPY THIS ONE)
  var table = '';
  table += "<tr><th style=\"border-top-left-radius:10px\">RUEE</th><th>Date</th><th>Name</th><th>Colour</th><th>Institute</th><th style=\"border-top-right-radius:10px\">Main Issues</th></tr>";

  mentorData.forEach(function(entry) {
      if (entry[0] == data) {
      var columns = 6;
      table += '<tr>';
      for (var i = 0; i < columns; i++) {
        table += '<td>';
        table += entry[i];
        table += '</td>';
      }
      table += '</tr>';
      $('#mentorReport').append(table);
      $('#mentorReport').css("visibility", "visible")

      table = '';
    }

  });
}

// clears all tables
function clearEverything() {
	$('#remoteReport').html('');
	$('#centros2020Report').html('');
	$('#mentorReport').html('');
	$('#centros2019Report').html('');

	$('#remoteReport').css("visibility", "hidden")
	$('#centros2020Report').css("visibility", "hidden")
	$('#mentorReport').css("visibility", "hidden")
	$('#centros2019Report').css("visibility", "hidden")
}
