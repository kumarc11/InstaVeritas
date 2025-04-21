document.addEventListener("DOMContentLoaded", function() {
  const accountForm = document.getElementById("accountForm");
  const resultElement = document.getElementById("result");
  const loadingIndicator = document.getElementById("loading");
  const submitButton = accountForm.querySelector("button");
  const footer = document.getElementById("undeletable-footer");
  const themeToggleButton = document.querySelector(".theme-toggle button");

  // Prevent footer removal using MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (!document.body.contains(footer)) {
        document.body.appendChild(footer);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Form submission handler
  accountForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Basic client-side validation
    if (!validateForm()) {
      resultElement.innerText = "Please fill out all required fields correctly.";
      return;
    }

    // Collect form data
    const data = {
      profile_pic: Number(document.getElementById("profile_pic").value),
      nums_length_username: Number(document.getElementById("nums_length_username").value),
      fullname_words: Number(document.getElementById("fullname_words").value),
      nums_length_fullname: Number(document.getElementById("nums_length_fullname").value),
      name_equals_username: Number(document.getElementById("name_equals_username").value),
      description_length: Number(document.getElementById("description_length").value),
      external_url: Number(document.getElementById("external_url").value),
      private: Number(document.getElementById("private").value),
      posts: Number(document.getElementById("posts").value),
      followers: Number(document.getElementById("followers").value),
      follows: Number(document.getElementById("follows").value)
    };

    // Show loading indicator and disable button
    loadingIndicator.style.display = "block";
    submitButton.disabled = true;

    // Send data to the Flask API
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server response not OK");
      }
      return response.json();
    })
    .then(result => {
      resultElement.innerText = result.fake_account ? "🚩 The account is FAKE" : "✅ The account is REAL";
    })
    .catch(error => {
      console.error("Error:", error);
      resultElement.innerText = "❌ An error occurred. Please try again later.";
    })
    .finally(() => {
      // Hide loading indicator and re-enable the button
      loadingIndicator.style.display = "none";
      submitButton.disabled = false;
    });
  });

  // Basic form validation function
  function validateForm() {
    const inputs = accountForm.querySelectorAll("input[required]");
    for (let input of inputs) {
      if (input.value.trim() === "" || isNaN(input.value)) {
        return false;
      }
    }
    return true;
  }

  // Theme Toggle functionality
  themeToggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });

});
