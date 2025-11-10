const form = document.querySelector("#userForm");
const addBtn = document.querySelector("#addBtn");
const updateBtn = document.querySelector("#updateBtn");

// Load all users
async function loadUsers() {
  const res = await fetch("/api/users");
  const users = await res.json();
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>
        <button onclick="editUser('${user._id}', '${user.name}', '${user.email}', '${user.age}')">Edit</button>
        <button onclick="deleteUser('${user._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Add new user
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = document.querySelector("#userId").value;
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const age = document.querySelector("#age").value;

  if (userId) {
    // Update existing user
    await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age }),
    });
    alert("User updated successfully!");
  } else {
    // Add new user
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age }),
    });
    alert("User added successfully!");
  }

  resetForm();
  loadUsers();
});

// Delete user
async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    loadUsers();
  }
}

// Edit user (populate form)
function editUser(id, name, email, age) {
  document.querySelector("#userId").value = id;
  document.querySelector("#name").value = name;
  document.querySelector("#email").value = email;
  document.querySelector("#age").value = age;

  addBtn.style.display = "none";
  updateBtn.style.display = "inline";
}

// Update button event
updateBtn.addEventListener("click", async () => {
  const id = document.querySelector("#userId").value;
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const age = document.querySelector("#age").value;

  await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, age }),
  });

  alert("User updated successfully!");
  resetForm();
  loadUsers();
});

// Reset form
function resetForm() {
  form.reset();
  document.querySelector("#userId").value = "";
  addBtn.style.display = "inline";
  updateBtn.style.display = "none";
}

// Load users initially
loadUsers();

