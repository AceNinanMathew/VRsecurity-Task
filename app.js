// Simulated Data for Users and Roles
let users = [];
let roles = ["Admin", "Editor", "Viewer"]; // Default roles

// Function to Render User Table
function renderUserTable() {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = ""; // Clear the table

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        // User details in table row
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}

// Function to Populate Role Dropdown in User Modal
function populateRoleDropdown() {
    const roleDropdown = document.getElementById("role");
    roleDropdown.innerHTML = ""; // Clear existing options

    roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        roleDropdown.appendChild(option);
    });
}

// Add or Edit User Functionality
document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    // Check if editing or adding a new user
    if (document.getElementById("userForm").dataset.editing === "true") {
        const userIndex = document.getElementById("userForm").dataset.index;
        users[userIndex] = { username, email, role, status };
    } else {
        users.push({ username, email, role, status });
    }

    // Reset form and update table
    document.getElementById("userForm").reset();
    document.getElementById("userModalLabel").textContent = "Add User";
    delete document.getElementById("userForm").dataset.editing;
    delete document.getElementById("userForm").dataset.index;

    renderUserTable();
    $('#userModal').modal('hide'); // Close the modal
});

// Function to Edit User
function editUser(index) {
    const user = users[index];

    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
    document.getElementById("role").value = user.role;
    document.getElementById("status").value = user.status;

    // Set form in editing mode
    document.getElementById("userForm").dataset.editing = "true";
    document.getElementById("userForm").dataset.index = index;
    document.getElementById("userModalLabel").textContent = "Edit User";

    $('#userModal').modal('show');
}

// Function to Delete User
function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        users.splice(index, 1);
        renderUserTable();
    }
}

// Initialize the Page
document.addEventListener("DOMContentLoaded", function () {
    // Populate the role dropdown in the user modal
    populateRoleDropdown();
    // Render the initial user table (empty at start)
    renderUserTable();
});

// Render Role Table Function
function renderRoleTable() {
    const roleTableBody = document.getElementById("roleTableBody");
    roleTableBody.innerHTML = ""; // Clear the table

    roles.forEach((role, index) => {
        const row = document.createElement("tr");

        // Role details in table row
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${role}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteRole(${index})">Delete</button>
            </td>
        `;

        roleTableBody.appendChild(row);
    });

    // Update role dropdown in user form whenever roles change
    populateRoleDropdown();
}

// Add Role Form Submission
document.getElementById("roleForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const roleName = document.getElementById("roleName").value.trim();

    // Check for empty or duplicate role names
    if (roleName === "" || roles.includes(roleName)) {
        alert("Invalid or duplicate role name.");
        return;
    }

    // Add role and reset form
    roles.push(roleName);
    document.getElementById("roleForm").reset();
    renderRoleTable();
    $('#roleModal').modal('hide'); // Close the modal
});

// Function to Delete Role
function deleteRole(index) {
    if (confirm("Are you sure you want to delete this role?")) {
        roles.splice(index, 1);
        renderRoleTable();
    }
}

// Initialize the Page with Role Table Rendering
document.addEventListener("DOMContentLoaded", function () {
    // Render the initial role table
    renderRoleTable();
});
