const jpdbBaseUrl = "http://api.login2explore.com:5577";
const jpdbIrl = "/api/irl";
const jpdbIml = "/api/iml";
const DBName = "School-DB";
const relationDB = "Student-Table";
const connToken = "90934858|-31949264109091591|90958017";




$("#stuRoll").focus();
function validateAndGetFormData() {
	let stuRollVar = $("#stuRoll").val();
	if (stuRollVar === "") {
		alert("Student must have Roll No. !!");
		$("#stuRoll").focus();
		return "";
	}

	var stuNameVar = $("#stuName").val();
	if (stuNameVar === "") {
		alert("Student Name is Required Value");
		$("#stuName").focus();
		return "";
	}

	var stuClassVar = $("#stuClass").val();
	if (stuClassVar === "") {
		alert("Student Class is requied !!");
		$("#stuClass").focus();
		return "";
	}

	var stuDobVar = $("#stuDob").val();
	if (stuDobVar === "") {
		alert("Required Student date of birth !!");
		$("#stuDob").focus();
		return "";
	}

	var stuAddressVar = $("#stuAddress").val();
	if (stuAddressVar === "") {
		alert("Required Student date of birth !!");
		$("#stuAddress").focus();
		return "";
	}
	var stuEnrollVar = $("#stuEnroll").val();
	if (stuEnrollVar === "") {
		alert("Required Student date of birth !!");
		$("#stuEnroll").focus();
		return "";
	}
	var jsonStrObj = {
		id: stuRollVar,
		name: stuNameVar,
		dob: stuDobVar,
		class: stuClassVar,
		address: stuAddressVar,
		enroll: stuEnrollVar,
	};

	return JSON.stringify(jsonStrObj);
}


function updateFormData() {
	let stuRollVar = $("#stuRoll").val();
	if (stuRollVar === "") {
		alert("Student must have Roll No. !!");
		$("#stuRoll").focus();
		return "";
	}

	let stuNameVar = $("#stuName").val();
	let stuClassVar = $("#stuClass").val();
	let stuDobVar = $("#stuDob").val();
	let stuAddressVar = $("#stuAddress").val();
	let stuEnrollVar = $("#stuEnroll").val();

	let jsonStrObj = {
		id: stuRollVar,
		name: stuNameVar,
		dob: stuDobVar,
		class: stuClassVar,
		address: stuAddressVar,
		enroll: stuEnrollVar
	};

	return JSON.stringify(jsonStrObj);
}

function createPUTRequest(jsonObj) {
	var putRequest = "{\n"
		+ "\"token\" : \""
		+ connToken
		+ "\","
		+ "\"dbName\": \""
		+ DBName
		+ "\",\n" + "\"cmd\" : \"PUT\",\n"
		+ "\"rel\" : \""
		+ relationDB + "\","
		+ "\"jsonStr\": \n"
		+ jsonObj
		+ "\n"
		+ "}";
	return putRequest;
}
function createGetRequest(jsonObj) {
	var putRequest = "{\n"
		+ "\"token\" : \""
		+ connToken
		+ "\","
		+ "\"dbName\": \""
		+ DBName
		+ "\",\n" + "\"cmd\" : \"GET\",\n"
		+ "\"rel\" : \""
		+ relationDB + "\","
		+ "\"jsonStr\": \n"
		+ jsonObj
		+ "\n"
		+ "}";
	return putRequest;
}
function createUpdateRequest(innerJsonObj) {
    // innerJsonObj should be a JS object like: { "<rec_no>": { id: "...", name: "...", ... } }
    var putRequest = {
        token: connToken,
        dbName: DBName,
        cmd: "UPDATE",
        rel: relationDB,
        jsonStr: innerJsonObj
    };
    return JSON.stringify(putRequest);
}


function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
	var url = dbBaseUrl + apiEndPointUrl;
	var jsonObj;
	$.post(url, reqString, function(result) {
		jsonObj = JSON.parse(result);
	}).fail(function(result) {
		var dataJsonObj = result.responseText;
		jsonObj = JSON.parse(dataJsonObj);
	});
	return jsonObj;
}

function disableAll() {
	$("#stuName").prop("disabled", true);
	$("#stuClass").prop("disabled", true);
	$("#stuDob").prop("disabled", true);
	$("#stuAddress").prop("disabled", true);
	$("#stuEnroll").prop("disabled", true);

	$("#save").prop("disabled", true);
	$("#update").prop("disabled", true);
	$("#reset").prop("disabled", true);
}

$(document).ready(function() {
	disableAll();
	$("#stuRoll").focus();
});


function resetForm() {
	$("#stuRoll").val("").prop("disabled", false);
	$("#stuName").val("");
	$("#stuClass").val("");
	$("#stuDob").val("");
	$("#stuAddress").val("");
	$("#stuEnroll").val("");

	disableAll();
	$("#stuRoll").focus();
}

function saveStudent() {
	var jsonStr = validateAndGetFormData();
	if (jsonStr === "") {
		return;
	}
	var putReqStr = createPUTRequest(jsonStr);
	alert(putReqStr);
	jQuery.ajaxSetup({ async: false });
	var resultObj = executeCommand(putReqStr,
		jpdbBaseUrl, jpdbIml);
	alert(JSON.stringify(resultObj));
	jQuery.ajaxSetup({ async: true });
	resetForm();
}


function getStu() {
	let stuRollJsonObj = getStuRollAsJsonObj();
	let getRequest = createGetRequest(stuRollJsonObj);

	jQuery.ajaxSetup({ async: false });
	let resJsonObj = executeCommand(getRequest, jpdbBaseUrl, jpdbIrl);
	jQuery.ajaxSetup({ async: true });

	if (resJsonObj.status === 400) {
		// New record → Enable Save, Disable Update
		$("#save").prop("disabled", false);
		$("#update").prop("disabled", true);
		$("#reset").prop("disabled", false);

		// Enable input fields
		$("#stuName, #stuClass, #stuDob, #stuAddress, #stuEnroll").prop("disabled", false);
		$("#stuName").focus();
	}

	else if (resJsonObj.status === 200) {
		// Existing record → Disable Save, Enable Update
		$("#save").prop("disabled", true);
		$("#update").prop("disabled", false);
		$("#reset").prop("disabled", false);

		$("#stuRoll").prop("disabled", true);
		fillData(resJsonObj);

		$("#stuName, #stuClass, #stuDob, #stuAddress, #stuEnroll").prop("disabled", false);
		$("#stuName").focus();
	}
}



function saveRec(jsonObj) {
	let lvData = JSON.parse(jsonObj.data);
	localStorage.setItem("recno", lvData.rec_no);

}

function fillData(jsonObj) {
	saveRec(jsonObj);
	let record = JSON.parse(jsonObj.data).record;
	$("#stuName").val(record.name);
	$("#stuClass").val(record.class);
	$("#stuDob").val(record.dob);
	$("#stuAddress").val(record.address);
	$("#stuEnroll").val(record.enroll);
}

function getStuRollAsJsonObj() {
	let stuRoll = $("#stuRoll").val();
	let jsonStr = {
		id: stuRoll
	};
	return JSON.stringify(jsonStr);
}


function updateData() {
	// disable the update button to avoid multiple clicks
	$("#update").prop("disabled", true);

	// validation and gather fields
	let stuRoll = $("#stuRoll").val().trim();
	if (!stuRoll) {
		alert("Student Roll No. is required to update.");
		$("#stuRoll").focus();
		$("#update").prop("disabled", false);
		return;
	}

	// get recno saved earlier by saveRec()
	let recno = localStorage.getItem("recno");
	if (!recno) {
		alert("Record number (rec_no) not found. Please fetch the record first (enter Roll No and press Enter).");
		$("#update").prop("disabled", false);
		return;
	}

	// build the update payload (object)
	let updObj = {};
	updObj[recno] = {
		id: stuRoll,
		name: $("#stuName").val().trim(),
		dob: $("#stuDob").val().trim(),
		class: $("#stuClass").val().trim(),
		address: $("#stuAddress").val().trim(),
		enroll: $("#stuEnroll").val().trim()
	};

	// Construct the full UPDATE request string
	let updateReqStr = createUpdateRequest(updObj);

	// send synchronously like your original code
	jQuery.ajaxSetup({ async: false });
	let res = executeCommand(updateReqStr, jpdbBaseUrl, jpdbIml);
	jQuery.ajaxSetup({ async: true });

	// handle response
	if (!res) {
		alert("No response from server while updating.");
		$("#update").prop("disabled", false);
		return;
	}

	if (res.status === 200 || res.status === "200") {
		alert("Record updated successfully.");
		// After update, reset form to Step-2
		resetForm();
	} else {
		alert("Update failed: " + (res.message || JSON.stringify(res)));
		$("#update").prop("disabled", false);
	}
}
