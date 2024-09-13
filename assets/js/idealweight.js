document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("idealWeightForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const heightInput = document.getElementById('height').value;
        const heightUnit = document.getElementById('heightUnit').value;

        let heightInCm;

        // Convert height to centimeters
        if (heightUnit === 'cm') {
            heightInCm = parseFloat(heightInput);
        } else if (heightUnit === 'feet_inch') {
            const [feet, inch] = heightInput.split('.').map(num => parseFloat(num));
            heightInCm = (feet * 30.48) + (inch * 2.54);
        }

        // Calculate ideal weight range
        let minIdealWeight, maxIdealWeight;

        if (gender === 'male') {
            minIdealWeight = 50 + 0.91 * (heightInCm - 152.4);
            maxIdealWeight = 60 + 0.91 * (heightInCm - 152.4);
        } else if (gender === 'female') {
            minIdealWeight = 45.5 + 0.91 * (heightInCm - 152.4);
            maxIdealWeight = 55.5 + 0.91 * (heightInCm - 152.4);
        }

        // Provide results
        document.getElementById('idealWeightResult').innerHTML = 
            `Your ideal weight range is ${minIdealWeight.toFixed(2)} kg to ${maxIdealWeight.toFixed(2)} kg.`;
    });
});
