
document.addEventListener("click", event => {
    // Check if the clicked element is the "Add" button
    if (event.target.classList.contains("add-btn")) {
      // Prevent the default form submission behavior
      event.preventDefault();
  
      // Get the parent form of the clicked button
      const form = event.target.closest('form');
      
      // Get form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      // Perform API call to submit form data
      fetch('http://localhost:8000/addperson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          alert('Form submitted successfully!');
          
          // Clone the current form
          const clonedForm = form.cloneNode(true);
          
          // Clear the input values in the cloned form
          clonedForm.reset();
          
          // Append the cloned form below the current form
          form.parentNode.appendChild(clonedForm);
        } else {
          alert('Failed to submit form. Check form fields; they cannot be empty.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit form. Check form fields; they cannot be empty.');
      });
    }
  });
  
async function displayAll() {
try {
    const response = await fetch('http://localhost:8000/displayall');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const dataArray = await response.json();
    // Get the container element to append the table
    const container = document.getElementById('data-container');

    // Create a table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    Object.keys(dataArray[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    dataArray.forEach(data => {
        const row = document.createElement('tr');
        Object.values(data).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Append table to the container
    container.appendChild(table);
} catch (error) {
    console.error('Error:', error);
}
}
