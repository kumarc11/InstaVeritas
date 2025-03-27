document.getElementById("accountForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from refreshing the page
  
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
  
  // Call the Flask API
  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    document.getElementById("result").innerText = 
      result.fake_account ? "The account is FAKE" : "The account is REAL";
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("result").innerText = "An error occurred. Check the console.";
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const footer = document.getElementById("undeletable-footer");

  // Prevent footer removal
  const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          if (!document.body.contains(footer)) {
              document.body.appendChild(footer); // Re-add footer if deleted
          }
      });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
