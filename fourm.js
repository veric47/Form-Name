const form = document.getElementById("contactForm");
const inputs = document.querySelectorAll("input, textarea");
const message = document.getElementById("formMessage");
const charCount = document.getElementById("charCount");
const textarea = document.getElementById("message");
const button = document.getElementById("submitBtn");
const loader = document.querySelector(".loader");
const btnText = document.querySelector(".btn-text");

/* Character counter */
textarea.addEventListener("input", () => {
  charCount.textContent = `${textarea.value.length}/200`;
});

/* Validation */
function validateInput(input) {
  const errorText = input.parentElement.querySelector(".error-text");

  if (!input.value.trim()) {
    input.classList.add("error");
    input.classList.remove("success");
    errorText.textContent = "Required field";
    return false;
  }

  if (input.type === "email") {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    if (!valid) {
      input.classList.add("error");
      errorText.textContent = "Invalid email format";
      return false;
    }
  }

  if (input.id === "message" && input.value.length < 10) {
    input.classList.add("error");
    errorText.textContent = "At least 10 characters";
    return false;
  }

  input.classList.remove("error");
  input.classList.add("success");
  errorText.textContent = "";
  return true;
}

/* Live validation */
inputs.forEach(input => {
  input.addEventListener("input", () => validateInput(input));
});

/* Submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  inputs.forEach(input => {
    if (!validateInput(input)) valid = false;
  });

  if (!valid) {
    message.textContent = "Fix the errors above";
    message.style.color = "#ff4d6d";
    return;
  }

  /* Simulate sending */
  loader.style.display = "inline-block";
  btnText.style.display = "none";
  button.disabled = true;

  setTimeout(() => {
    loader.style.display = "none";
    btnText.style.display = "inline";
    button.disabled = false;

    message.textContent = "Message sent successfully!";
    message.style.color = "#2dd4bf";

    form.reset();
    charCount.textContent = "0/200";
  }, 1500);
});