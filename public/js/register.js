document.getElementById('registration-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    if (response.ok) {
      alert('Registration successful!');
    } else {
      const errorMessage = await response.text();
      alert(`Registration failed: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during registration.');
  }
});
