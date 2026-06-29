// ===============================
// 1. SELECT ELEMENTS
// ===============================
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeBtn");
const closeIcon = document.querySelector(".close");

const saveBtn = document.getElementById("saveBtn");
const search = document.getElementById("search");
const tasks = document.querySelector(".tasks");
const totaltask = document.getElementById("totaltask");

// ===============================
// 2. FUNCTIONS
// ===============================

// Update Dashboard Counts
function updates() {
    const completedCount = document.querySelectorAll(".task.Completed").length;
    const progressCount = document.querySelectorAll(".task.progress").length;
    const totalCount = document.querySelectorAll(".task").length;

    document.querySelector(".card .value").textContent = completedCount;
    document.querySelector(".card .cardP").textContent = progressCount;
    document.querySelector(".card .cardT").textContent = totalCount;
}

// Open Modal
function openModal() {
    modal.style.display = "flex";
}

// Close Modal
function closeModal() {
    modal.style.display = "none";
}

// ===============================
// 3. EVENT LISTENERS
// ===============================

// Open Modal
openBtn.addEventListener("click", openModal);

// Close Modal
closeBtn.addEventListener("click", closeModal);
closeIcon.addEventListener("click", closeModal);

// Close When Clicking Outside
window.addEventListener("click", function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

// ===============================
// SAVE TASK
// ===============================

saveBtn.addEventListener("click", function () {

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const selected = document.querySelector('input[name="stats"]:checked');
    const date = document.getElementById("date").value;

    // Validation
    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    if (message.trim() === "") {
        alert("Please enter your message.");
        return;
    }

    if (!selected) {
        alert("Please select a status.");
        return;
    }

    if (date.trim() === "") {
        alert("Please select a date.");
        return;
    }

    // Create Task
    const task = document.createElement("div");

    task.classList.add("task");
    task.classList.add(selected.value);

    task.innerHTML = `
        <div class="input-aglin">
            <input type="checkbox" ${selected.value === "completed" ? "checked" : ""}>

            <div>
                <h3>${name}</h3>
                <p>${message}</p>
                <span><small>${date}</small></span>
            </div>
        </div>

        <div class="outer-check-icons">
            <div class="check-icons">
                <i class="fa-solid fa-trash delete"></i>
            </div>
        </div>
    `;

    tasks.appendChild(task);

    // Update Dashboard
    updates();

    // Clear Form
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    document.getElementById("date").value = "";
    selected.checked = false;

    closeModal();
});

// ===============================
// DELETE TASK (Event Delegation)
// ===============================

tasks.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete")) {

        e.target.closest(".task").remove();

        updates();
    }

});

// ===============================
// SEARCH TASK
// ===============================

search.addEventListener("keyup", function () {

    const searchText = search.value.toLowerCase();

    document.querySelectorAll(".task").forEach(function (task) {

        const title = task.querySelector("h3").textContent.toLowerCase();

        if (title.includes(searchText)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    });

});
totaltask.addEventListener("click", function () {

    document.querySelectorAll(".task").forEach(function (task) {
        task.style.display = "flex";
    });

});

const activeBtn = document.getElementById("activeList");
const completedBtn = document.getElementById("completedBtn");

function filterTasks(status) {

    const allTasks = document.querySelectorAll(".task");

    allTasks.forEach(function (task) {

        if (task.classList.contains(status)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    });

}

activeBtn.addEventListener("click", function () {
    filterTasks("progress");
});

completedBtn.addEventListener("click", function () {
    filterTasks("Completed");
});
// ===============================
// 4. INITIALIZE
// ===============================

updates();

{/* <button class="filter-btn" data-status="progress">Active</button>
<button class="filter-btn" data-status="completed">Completed</button>
<button class="filter-btn" data-status="all">All</button>
JavaScript
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const status = this.dataset.status;

        document.querySelectorAll(".task").forEach(function (task) {

            if (status === "all" || task.classList.contains(status)) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }

        });

    });

});
Why this is better
✅ No duplicate code.
✅ Easy to add new filters.
✅ More maintainable.

If you later add a Pending button, you only need to add: */}