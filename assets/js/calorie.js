document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calorieForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get user input values
        const age = parseFloat(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const heightInput = document.getElementById('height').value;
        const heightUnit = document.getElementById('heightUnit').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const weightUnit = document.getElementById('weightUnit').value;
        const activityLevel = document.getElementById('activityLevel').value;

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

        // Calculate total daily calorie needs based on activity level
        let calorieNeeds;
        switch (activityLevel) {
            case 'sedentary':
                calorieNeeds = bmr * 1.2;
                break;
            case 'light':
                calorieNeeds = bmr * 1.375;
                break;
            case 'moderate':
                calorieNeeds = bmr * 1.55;
                break;
            case 'active':
                calorieNeeds = bmr * 1.725;
                break;
            case 'extra_active':
                calorieNeeds = bmr * 1.9;
                break;
            default:
                calorieNeeds = bmr;
                break;
        }

        // Provide suggestions based on calorie needs
        const suggestions = getSuggestions(calorieNeeds);

        // Display the result and suggestions
        document.getElementById('calorieResult').innerHTML = `Your daily calorie needs are ${calorieNeeds.toFixed(2)} calories.<br>${suggestions}`;
    });
});

// Function to provide suggestions based on daily calorie needs
function getSuggestions(calorieNeeds) {
    if (calorieNeeds < 1800) {
        return "Suggested: Increase caloric intake to meet daily energy requirements.";
    } else if (calorieNeeds >= 1800 && calorieNeeds < 2500) {
        return "Suggested: Maintain a balanced diet to sustain energy levels.";
    } else {
        return "Suggested: Ensure caloric intake is not excessive; balance with physical activity.";
    }
}
