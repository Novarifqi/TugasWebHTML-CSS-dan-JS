let events = []; // Array untuk menyimpan data acara

// Load data acara dari localStorage (jika ada)
loadEvents();

// Menambahkan event listener ke formulir "Tambah Acara"
const addEventForm = document.getElementById("addEventForm");
addEventForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;
  const eventText = document.getElementById("eventInput").value;
  const reminder = document.getElementById("reminderInput").value;

  // Validasi input
  if (!date || !time || !eventText) {
    alert("Semua kolom harus diisi!");
    return;
  }

  // Buat objek acara baru
  const newEvent = {
    date: date,
    time: time,
    event: eventText,
    reminder: reminder,
    id: Math.random().toString(36).substr(2, 9) // Buat ID unik untuk setiap acara
  };

  // Tambahkan acara baru ke array events
  events.push(newEvent);

  // Simpan data acara ke localStorage
  saveEvents();

  // Tampilkan acara baru di tabel
  displayEvents();

  // Bersihkan formulir
  addEventForm.reset();
});

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}

function displayEvents() {
  const eventTable = document.getElementById("eventTable");
  const tbody = eventTable.querySelector("tbody");
  tbody.innerHTML = ""; // Kosongkan tabel sebelum menampilkan data baru

  events.forEach(event => {
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    const timeCell = document.createElement("td");
    const eventCell = document.createElement("td");
    const reminderCell = document.createElement("td");
    const actionCell = document.createElement("td");

    dateCell.textContent = event.date;
    timeCell.textContent = event.time;
    eventCell.textContent = event.event;
    reminderCell.textContent = event.reminder;

    // Buat tombol "Hapus"
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function() {
      deleteEvent(event.id);
    });

    actionCell.appendChild(deleteButton);

    row.appendChild(dateCell);
    row.appendChild(timeCell);
    row.appendChild(eventCell);
    row.appendChild(reminderCell);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });
}

function deleteEvent(eventId) {
  events = events.filter(event => event.id !== eventId); // Hapus acara berdasarkan ID
  saveEvents();
  displayEvents();
}

function loadEvents() {
  const storedEvents = localStorage.getItem("events");
  if (storedEvents) {
    events = JSON.parse(storedEvents);
    displayEvents();
  }
}
