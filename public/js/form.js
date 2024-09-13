document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission for validation
      
      // Get form elements
      const inputs = document.querySelectorAll('#bookingForm input, #bookingForm select');
      let valid = true;
  
      // Clear previous states
      inputs.forEach(input => {
        input.classList.remove('invalid', 'valid');
        const errorSpan = document.getElementById(input.id + 'Error');
        if (errorSpan) errorSpan.style.display = 'none';
      });
  
      // Validation logic
      inputs.forEach(input => {
        if (input.type !== 'file' && input.value.trim() === '') {
          input.classList.add('invalid');
          const errorSpan = document.getElementById(input.id + 'Error');
          if (errorSpan) {
            errorSpan.style.display = 'inline';
            errorSpan.textContent = 'This field is required'; // Show an error message
          }
          valid = false;
        } else {
          input.classList.add('valid');
        }
      });
  
      // Show success message if form is valid
      if (valid) {
        alert('Form has been submitted successfully!');
        document.getElementById('bookingForm').reset(); // Reset the form
      }
    });
  });
  