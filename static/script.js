document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze-btn");
  const textInput = document.getElementById("text-input");
  const thresholdInput = document.getElementById("threshold");
  const loadingElement = document.getElementById("loading");
  const predictionsContainer = document.getElementById("predictions-container");
  const predictionsList = document.getElementById("predictions-list");
  const probabilitiesChart = document.getElementById("probabilities-chart");
  const errorMessage = document.getElementById("error-message");

  analyzeBtn.addEventListener("click", () => {
    console.log("Analyzing...");
    analyzeText();
  });

  // Also allow Shift+Enter to submit
  textInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
       console.log("Analyzing...");
      analyzeText();
    }
  });

  async function analyzeText() {
    const text = textInput.value.trim();
    const threshold = parseFloat(thresholdInput.value);

    // Validate input
    if (!text) {
      showError("Please enter some text to analyze.");
      return;
    }

    if (isNaN(threshold) || threshold < 0 || threshold > 1) {
      showError("Please enter a valid threshold between 0 and 1.");
      return;
    }

    // Clear previous results and errors
    clearResults();
    hideError();

    // Show loading indicator
    loadingElement.classList.remove("hidden");

    try {
      // Make API request
      const response = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          threshold: threshold,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }

      const data = await response.json();
      displayResults(data);
    } catch (error) {
      showError(error.message);
    } finally {
      loadingElement.classList.add("hidden");
    }
  }

  function displayResults(data) {
    // Helper function to capitalize first letter and replace underscores
    const formatLabel = (str) => {
        return str.replace(/_/g, ' ')
                 .split(' ')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' ');
    };

    // Display predictions
    predictionsList.innerHTML = "";
    if (data.predictions.length > 0) {
        data.predictions.forEach((prediction) => {
            const li = document.createElement("li");
            li.textContent = formatLabel(prediction);
            predictionsList.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "No toxic content detected";
        li.style.backgroundColor = "#2ecc71";
        predictionsList.appendChild(li);
    }

    // Display probabilities
    probabilitiesChart.innerHTML = "";
    for (const [label, probability] of Object.entries(data.probabilities)) {
        const percentage = (probability * 100).toFixed(1);

        const barContainer = document.createElement("div");
        barContainer.className = "probability-bar";

        const labelElement = document.createElement("div");
        labelElement.className = "probability-label";
        labelElement.textContent = formatLabel(label);

        const valueElement = document.createElement("div");
        valueElement.className = "probability-value";
        valueElement.textContent = percentage + "%";

        const visualContainer = document.createElement("div");
        visualContainer.className = "probability-visual";

        const visualFill = document.createElement("div");
        visualFill.className = "probability-fill";
        visualFill.style.width = percentage + "%";

        visualContainer.appendChild(visualFill);

        barContainer.appendChild(labelElement);
        barContainer.appendChild(valueElement);
        barContainer.appendChild(visualContainer);

        probabilitiesChart.appendChild(barContainer);
    }

    // Show results container
    predictionsContainer.classList.remove("hidden");
}

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
  }

  function hideError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
  }

  function clearResults() {
    predictionsContainer.classList.add("hidden");
    predictionsList.innerHTML = "";
    probabilitiesChart.innerHTML = "";
  }
});
