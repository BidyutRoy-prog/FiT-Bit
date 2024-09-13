document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bmrForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Getting the user input values
        const age = parseFloat(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const heightInput = document.getElementById('height').value;
        const heightUnit = document.getElementById('heightUnit').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const weightUnit = document.getElementById('weightUnit').value;

        // Convert height to meters
        let heightInMeters;
        if (heightUnit === 'cm') {
            heightInMeters = parseFloat(heightInput) / 100;
        } else if (heightUnit === 'feet_inch') {
            const [feet, inch] = heightInput.split('.').map(Number);
            heightInMeters = (feet * 0.3048) + (inch * 0.0254);
        }

        // Convert weight to kilograms
        let weightInKg;
        if (weightUnit === 'lb') {
            weightInKg = weight * 0.453592;
        } else {
            weightInKg = weight;
        }

        // BMR calculation based on the Harris-Benedict Equation
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weightInKg) + (4.799 * (heightInMeters * 100)) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weightInKg) + (3.098 * (heightInMeters * 100)) - (4.330 * age);
        }

        // Provide suggestions based on BMR
        const suggestions = getSuggestions(bmr);

        // Display the result and suggestions
        document.getElementById('bmrResult').innerHTML = `Your BMR is ${bmr.toFixed(2)} calories/day.<br>${suggestions}`;
    });
});

// Function to provide suggestions based on BMR
function getSuggestions(bmr) {
    if (bmr < 1200) {
        return "Suggested: Increase caloric intake to meet your daily energy needs.";
    } else if (bmr >= 1200 && bmr < 1800) {
        return "Suggested: Maintain a balanced diet and exercise regularly to stay healthy.";
    } else {
        return "Suggested: Ensure you are not consuming excessive calories. Balance with physical activity.";
    }
}
