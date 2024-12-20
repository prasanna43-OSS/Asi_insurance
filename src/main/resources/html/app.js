// Fetch all policies and display them in the table
window.onload = function() {
    fetchPolicies();
};

// Function to fetch policies from the API
function fetchPolicies() {
    fetch('/api/policies')
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("policiesTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';  // Clear existing rows

            data.forEach(policy => {
                let row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${policy.id}</td>
                    <td>${policy.policyNumber}</td>
                    <td>${policy.policyHolder}</td>
                    <td>${policy.premiumAmount}</td>
                `;
            });
        })
        .catch(error => console.log('Error fetching policies:', error));
}

// Function to handle form submission for adding a policy
document.getElementById('addPolicyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const policy = {
        policyNumber: document.getElementById('policyNumber').value,
        policyHolder: document.getElementById('policyHolder').value,
        premiumAmount: document.getElementById('premiumAmount').value
    };

    // Send POST request to add the policy
    fetch('/api/policies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(policy)
    })
    .then(response => response.json())
    .then(data => {
        // Clear form fields
        document.getElementById('policyNumber').value = '';
        document.getElementById('policyHolder').value = '';
        document.getElementById('premiumAmount').value = '';
        
        // Refresh the policies list
        fetchPolicies();
    })
    .catch(error => console.log('Error adding policy:', error));
});
