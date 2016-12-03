function safeGetProperty(target, props){
	if(target === undefined)	return undefined;
	else if(!props.length)  	return target;
	else                    	return safeGetProperty(target[props.shift()], props);
}

angular
.module("imo-demo", [])
.controller("main", function($scope, $http){
	var kQueryMedicationURL = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/MedicationOrder?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB";
	$scope.keys = [
		"Medications", "Dosage", "Frequency", "Start", "End"
	];

	$http.get(kQueryMedicationURL)
	.then(function(res){
		$scope.entries = res.data.entry.map(function(entry){
			return {
				medication:	safeGetProperty(entry, ["resource", "medicationReference", "display"]),
				dosage:    	safeGetProperty(entry, ["resource", "dispenseRequest", "quantity", "value"]),
				frequency: 	safeGetProperty(entry, ["resource", "dosageInstruction", 0, "text"]),
				start:     	safeGetProperty(entry, ["resource", "dispenseRequest", "validityPeriod", "start"]),
				end:       	safeGetProperty(entry, ["resource", "dispenseRequest", "validityPeriod", "end"])
			}
		})
	})

});