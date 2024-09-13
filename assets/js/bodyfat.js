document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bodyFatForm").addEventListener("submit", function (e) {
        e.preventDefault();

        // Get user input values
        const age = parseFloat(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const heightInput = document.getElementById('height').value;
        const heightUnit = document.getElementById('heightUnit').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const weightUnit = document.getElementById('weightUnit').value;
        const waist = parseFloat(document.getElementById('waist').value);
        const neck = parseFloat(document.getElementById('neck').value);
        const hips = parseFloat(document.getElementById('hips').value);

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

        // Body fat percentage calculation using the US Navy method
        let bodyFatPercentage;
        if (gender === 'male') {
            bodyFatPercentage = (86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(heightInMeters * 100) + 36.76).toFixed(2);
        } else if (gender === 'female') {
            bodyFatPercentage = (163.205 * Math.log10(waist + hips - neck) - 97.684 * Math.log10(heightInMeters * 100) - 78.387).toFixed(2);
        }

        // Display the result and suggestions
        document.getElementById('bodyFatResult').innerHTML = `Your body fat percentage is ${bodyFatPercentage}%<br>${getSuggestions(bodyFatPercentage)}`;
    });
});

// Function to provide suggestions based on body fat percentage
function getSuggestions(bodyFatPercentage) {
    if (bodyFatPercentage < 14) {
        return "Suggested: Consider increasing body fat slightly for overall health.";
    } else if (bodyFatPercentage >= 14 && bodyFatPercentage <= 24) {
        return "Suggested: Maintain your current body fat percentage for optimal health.";
    } else {
        return "Suggested: Focus on reducing body fat through a balanced diet and exercise.";
    }
}
