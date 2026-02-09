const API = "http://localhost:5000/api/tasks";

const taskList = document.getElementById("taskList");
const form = document.getElementById("taskForm");

const titleEl = document.getElementById("title");
const descEl = document.getElementById("description");
const statusEl = document.getElementById("status");

let editId = null;

async function fetchTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  taskList.innerHTML = tasks.map(t => `
    <div class="task">
      <div class="row">
        <div>
          <b>${escapeHtml(t.title)}</b> <small>(${t.status})</small><br/>
          <small>${escapeHtml(t.description || "")}</small>
        </div>
        <div class="actions">
          <button onclick="startEdit(${t.id}, '${jsStr(t.title)}', '${jsStr(t.description || "")}', '${t.status}')">Edit</button>
          <button onclick="markDone(${t.id})">Done</button>
          <button onclick="deleteTask(${t.id})">Delete</button>
        </div>
      </div>
    </div>
  `).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    title: titleEl.value.trim(),
    description: descEl.value.trim(),
    status: statusEl.value
  };

  if (!payload.title) return alert("Title required");

  if (editId === null) {
    // CREATE
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } else {
    // UPDATE
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    editId = null;
  }

  form.reset();
  statusEl.value = "pending";
  fetchTasks();
});

function startEdit(id, title, description, status) {
  editId = id;
  titleEl.value = title;
  descEl.value = description;
  statusEl.value = status;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteTask(id) {
  console.log("Deleting ID:", id);

  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  console.log("Delete response status:", res.status);

  fetchTasks();
}


async function markDone(id) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "done" })
  });
  fetchTasks();
}

function escapeHtml(str) {
  return str.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
}

function jsStr(str) {
  return str.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

fetchTasks();
