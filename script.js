let currentStep = 1;
const totalSteps = 3;
const mealPrices = {
    breakfast: 50,
    lunch: 100
};

document.addEventListener("DOMContentLoaded", () => {
    showStep(currentStep);
});

function showStep(step) {
    document.querySelectorAll(".step").forEach((element, index) => {
        element.style.display = (index === step - 1) ? "block" : "none";
    });

    if (step === 1) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (step === totalSteps) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);

        if (currentStep === totalSteps) {
            calculateTotal();
        }
    } else {
        // Submit the form
        alert("Form submitted!");
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function calculateTotal() {
    let total = 0;
    ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach(day => {
        if (document.getElementById(`${day}-breakfast`).checked) {
            total += mealPrices.breakfast;
        }
        if (document.getElementById(`${day}-lunch`).checked) {
            total += mealPrices.lunch;
        }
    });

    const summary = document.getElementById("summary");
    summary.innerHTML = `Total Amount: $${total}`;

    // Clear existing QR code
    document.getElementById("qrcode").innerHTML = "";

    // Generate QR Code
    new QRCode(document.getElementById("qrcode"), {
        text: `Pay $${total}`,
        width: 128,
        height: 128
    });
}
