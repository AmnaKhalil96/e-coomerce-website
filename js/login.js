
(() => {
  const form = document.getElementById('login-form');
  const identity = document.getElementById('login-identity');
  const password = document.getElementById('login-password');
  const error = document.getElementById('login-error');

  /* Accept a valid email address or a phone number containing 7 to 15 digits. */
  function isEmailOrPhone(value) {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const digits = value.replace(/\D/g, '');
    const phoneValid = /^[+\d().\s-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
    return emailValid || phoneValid;
  }

  /* Show a concise validation error and prevent a fake backend submission. */
  function validateLogin(event) {
    event.preventDefault();
    error.classList.add('hidden');
    const identityValue = identity.value.trim();
    let message = '';
    if (!identityValue) message = 'Enter your email or phone number.';
    else if (!isEmailOrPhone(identityValue)) message = 'Enter a valid email address or phone number.';
    else if (!password.value) message = 'Enter your password.';

    if (message) {
      error.textContent = message;
      error.classList.remove('hidden');
      (identityValue && isEmailOrPhone(identityValue) ? password : identity).focus();
      return;
    }
  }

  /* Attach the form check and clear stale feedback while the user edits. */
  form.addEventListener('submit', validateLogin);
  [identity, password].forEach(input => input.addEventListener('input', () => {
    error.classList.add('hidden');
  }));
})();
