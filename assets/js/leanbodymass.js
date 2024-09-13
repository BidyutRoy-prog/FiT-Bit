document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lbmForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const gender = document.getElementById('gender').value;
        let weight = parseFloat(document.getElementById('weight').value);
        const weightUnit = document.getElementById('weightUnit').value;
        let height = document.getElementById('height').value;
        const heightUnit = document.getElementById('heightUnit').value;

        // Convert weight to kg if input is in pounds
        if (weightUnit === "lb") {
            weight = weight * 0.453592; // 1 lb = 0.453592 kg
        }

        // Convert height to cm if input is in feet.inches
        if (heightUnit === "feet_inch") {
            const heightParts = height.split(".");
            const feet = parseFloat(heightParts[0]);
            const inches = heightParts.length > 1 ? parseFloat(heightParts[1]) : 0;
            height = (feet * 30.48) + (inches * 2.54); // 1 foot = 30.48 cm, 1 inch = 2.54 cm
        }

        let lbm = 0;

        // Calculate Lean Body Mass using Boer formula based on gender
        if (gender === "male") {
            lbm = 0.407 * weight + 0.267 * height - 19.2;
        } else {
            lbm = 0.252 * weight + 0.473 * height - 48.3;
        }

        // Display the result
        document.getElementById('lbmResult').innerHTML = `Your Lean Body Mass is approximately ${lbm.toFixed(2)} kg.`;
    });
});
