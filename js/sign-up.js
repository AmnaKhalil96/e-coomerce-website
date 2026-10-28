
(() => {
  const form = document.getElementById('signup-form');
  const name = document.getElementById('signup-name');
  const identity = document.getElementById('signup-identity');
  const password = document.getElementById('signup-password');
  const error = document.getElementById('signup-error');

  /* Accept a valid email address or a phone number containing 7 to 15 digits. */
  function isEmailOrPhone(value) {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const digits = value.replace(/\D/g, '');
    const phoneValid = /^[+\d().\s-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
    return emailValid || phoneValid;
  }

  /* Check each required field and report the first issue in the form. */
  function validateSignup(event) {
    event.preventDefault();
    error.classList.add('hidden');
    const nameValue = name.value.trim();
    const identityValue = identity.value.trim();
    let message = '';
    if (!nameValue) message = 'Enter your name.';
    else if (!identityValue) message = 'Enter your email or phone number.';
    else if (!isEmailOrPhone(identityValue)) message = 'Enter a valid email address or phone number.';
    else if (password.value.length < 8) message = 'Use a password with at least 8 characters.';

    if (message) {
      error.textContent = message;
      error.classList.remove('hidden');
      if (!nameValue) name.focus();
      else if (!identityValue || !isEmailOrPhone(identityValue)) identity.focus();
      else password.focus();
      return;
    }
  }

  form.addEventListener('submit', validateSignup);
  [name, identity, password].forEach(input => input.addEventListener('input', () => {
    error.classList.add('hidden');
  }));
})();
