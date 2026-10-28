/* Profile validation runs locally and does not save data to a server. */
(() => {
  const form = document.getElementById('profile-form');
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const email = document.getElementById('profile-email');
  const address = document.getElementById('profile-address');
  const currentPassword = document.getElementById('current-password');
  const newPassword = document.getElementById('new-password');
  const confirmPassword = document.getElementById('confirm-password');
  const feedback = document.getElementById('profile-feedback');

  /* Check required profile values and any optional password change. */
  function validateProfile(event) {
    event.preventDefault();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    let error = '';
    if (!firstName.value.trim() || !lastName.value.trim()) error = 'Enter your first and last name.';
    else if (!email.value.trim() || !emailIsValid) error = 'Enter a valid email address.';
    else if (!address.value.trim()) error = 'Enter your address.';
    else if (currentPassword.value || newPassword.value || confirmPassword.value) {
      if (!currentPassword.value) error = 'Enter your current password.';
      else if (newPassword.value.length < 8) error = 'Use a new password with at least 8 characters.';
      else if (newPassword.value !== confirmPassword.value) error = 'The new passwords do not match.';
    }
    feedback.textContent = error;
    feedback.classList.toggle('hidden', !error);
    if (error) {
      if (!firstName.value.trim()) firstName.focus();
      else if (!lastName.value.trim()) lastName.focus();
      else if (!email.value.trim() || !emailIsValid) email.focus();
      else if (!address.value.trim()) address.focus();
      else if (!currentPassword.value) currentPassword.focus();
      else if (newPassword.value.length < 8) newPassword.focus();
      else confirmPassword.focus();
    }
  }

  /* Attach validation and hide old errors when the profile is edited. */
  form.addEventListener('submit', validateProfile);
  form.addEventListener('input', () => feedback.classList.add('hidden'));
  form.addEventListener('reset', () => feedback.classList.add('hidden'));
})();
