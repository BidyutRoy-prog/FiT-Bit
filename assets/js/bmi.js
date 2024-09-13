document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bmiForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const heightInput = document.getElementById('height').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const heightUnit = document.getElementById('heightUnit').value;
        const weightUnit = document.getElementById('weightUnit').value;
        let heightInMeters;
        let weightInKg = weight;

        if (heightUnit === 'feet_inch') {
            // Split height input by decimal point
            const [feet, inches] = heightInput.split('.').map(Number);
            const totalInches = (feet || 0) * 12 + (inches || 0);
            heightInMeters = totalInches * 0.0254;
        } else if (heightUnit === 'cm') {
            heightInMeters = parseFloat(heightInput) / 100;
        }

        if (weightUnit === 'lb') {
            weightInKg = weight * 0.453592;
        }

        if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
            document.getElementById('bmiResult').innerHTML = "Please enter valid height and weight.";
            return;
        }
        const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }
        const suggestions = getSuggestions(category);

        document.getElementById('bmiResult').innerHTML = `Your BMI is ${bmi} (${category}).<br>${suggestions}`;
    });
});
function getSuggestions(category) {
    switch (category) {
        case 'Underweight':
            return "Suggested: Increase calorie intake with nutrient-dense foods and strength training.";
        case 'Normal weight':
            return "Suggested: Maintain a balanced diet and regular exercise to stay healthy.";
        case 'Overweight':
            return "Suggested: Focus on a calorie-deficit diet and incorporate cardio exercises.";
        case 'Obesity':
            return "Suggested: Consult a healthcare provider for a personalized plan. Focus on a low-calorie diet and regular physical activity.";
        default:
            return "";
    }
}
