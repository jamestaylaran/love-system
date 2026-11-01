// ============================================================
// US 💖 — Relationship System
// ============================================================

/* ---------- Custom cursor ---------- */
const cursor = document.createElement('div');
document.body.style.cursor = 'none';
document.body.classList.add('cursor-active');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.width = '18px';
  cursor.style.height = '18px';
  cursor.style.background = '#ff1493';
});
document.addEventListener('mouseup', () => {
  cursor.style.width = '12px';
  cursor.style.height = '12px';
  cursor.style.background = '#ff69b4';
});

/* ---------- Navigation ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navToggle = document.getElementById('navToggle');
const navLinksMenu = document.querySelector('.nav-links');

function showSection(id) {
  sections.forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
  navLinks.forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
  if (activeLink) activeLink.classList.add('active');
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href').replace('#', '');
    showSection(id);
    navLinksMenu.classList.remove('open');
  });
});

navToggle.addEventListener('click', () => {
  navLinksMenu.classList.toggle('open');
});

/* ---------- Days together & countdown ---------- */
// Change START_DATE to the day you two started dating / met
const START_DATE = new Date('2024-01-01T00:00:00');
const NEXT_DATE = new Date();
NEXT_DATE.setDate(NEXT_DATE.getDate() + 30); // next date night in 30 days (example)

function updateStats() {
  const now = new Date();
  const days = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
  const daysUntil = Math.ceil((NEXT_DATE - now) / (1000 * 60 * 60 * 24));
  const daysEl = document.getElementById('daysTogether');
  const countEl = document.getElementById('countdown');
  if (daysEl) daysEl.textContent = days;
  if (countEl) countEl.textContent = Math.max(daysUntil, 0);
}
updateStats();
setInterval(updateStats, 60000);

/* ---------- Home: Evasive No Button + Negative Thoughts ---------- */
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const result = document.getElementById('result');

const negativeThoughts = [
  "u dont love me :(",
  "why not? am i not enough?",
  "i thought you cared...",
  "please dont leave me",
  "im sorry im not perfect",
  "youre breaking my heart 💔",
  "do you even miss me?",
  "i love you so much...",
  "am i too much for you?",
  "please say you love me",
  "i cant breathe without you",
  "you dont want me :(",
  "im crying right now",
  "why are you doing this to me?",
  "i just want you to be happy",
  "please dont say no",
  "my heart hurts",
  "do you even remember me?",
  "im nothing without you",
  "please come back to me"
];

function getRandomPosition(btn) {
  const maxX = window.innerWidth - btn.offsetWidth - 20;
  const maxY = window.innerHeight - btn.offsetHeight - 20;
  let x, y;
  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } while (Math.abs(x - window.innerWidth / 2) < 100 && Math.abs(y - window.innerHeight / 2) < 100);
  return { x, y };
}

function evadeNoButton() {
  const { x, y } = getRandomPosition(noBtn);
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
}

function spawnThought() {
  const text = negativeThoughts[Math.floor(Math.random() * negativeThoughts.length)];
  const thought = document.createElement('div');
  thought.className = 'thought';
  thought.textContent = text;

  const rect = noBtn.getBoundingClientRect();
  let top = rect.top + rect.height + 12;
  let left = rect.left + rect.width / 2 - 90;
  top = Math.min(Math.max(top, 10), window.innerHeight - 40);
  left = Math.min(Math.max(left, 10), window.innerWidth - 220);

  thought.style.top = top + 'px';
  thought.style.left = left + 'px';
  document.body.appendChild(thought);

  requestAnimationFrame(() => thought.classList.add('show'));

  setTimeout(() => {
    thought.classList.remove('show');
    thought.classList.add('hide');
    setTimeout(() => thought.remove(), 400);
  }, 2200);
}

noBtn.addEventListener('mouseenter', () => {
  evadeNoButton();
  spawnThought();
});

noBtn.addEventListener('mousemove', (e) => {
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
  if (dist < 140) {
    evadeNoButton();
    spawnThought();
  }
});

yesBtn.addEventListener('click', () => {
  document.querySelector('.question-card').style.display = 'none';
  noBtn.style.display = 'none';
  yesBtn.style.display = 'none';
  document.querySelectorAll('.thought').forEach(t => t.remove());
  result.style.display = 'block';

  // Celebration hearts
  for (let i = 0; i < 45; i++) {
    spawnHeart(Math.random() * 100, Math.random() * 100, 1.2 + Math.random() * 2, 3 + Math.random() * 5);
  }
});

function spawnHeart(left, top, size, duration) {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = ['❤', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
  h.style.left = left + 'vw';
  h.style.top = top + 'vh';
  h.style.fontSize = size + 'rem';
  h.style.animationDuration = duration + 's';
  document.querySelector('.floating-hearts').appendChild(h);
  setTimeout(() => h.remove(), duration * 1000);
}

setInterval(() => {
  if (document.querySelector('.question-card').style.display !== 'none') {
    spawnHeart(Math.random() * 100, 100, 1 + Math.random() * 2, 5 + Math.random() * 5);
  }
}, 700);

/* ---------- Supabase Helpers ---------- */
// Tables: memories, notes, dates, songs
async function fetchTable(table) {
  if (!supabase) return [];
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data || [];
}

async function insertRow(table, row) {
  if (!supabase) return;
  const { error } = await supabase.from(table).insert([row]);
  if (error) { console.error(error); alert('Failed to save. Check your Supabase config.'); }
}

async function deleteRow(table, id) {
  if (!supabase) return;
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) console.error(error);
}

/* ---------- Memories ---------- */
const memGrid = document.getElementById('memoryGrid');
const addMemBtn = document.getElementById('openAddMemory');
const memModal = document.getElementById('memoryModal');
const memClose = memModal.querySelector('.close');
const memForm = document.getElementById('addMemoryForm');

async function loadMemories() {
  const rows = await fetchTable('memories');
  memGrid.innerHTML = '';
  if (!rows.length) {
    memGrid.innerHTML = '<div class="empty-state">No memories yet. Add your first one!</div>';
    return;
  }
  rows.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      ${m.photo_url ? `<img src="${m.photo_url}" style="width:100%;border-radius:12px;margin-bottom:0.75rem;">` : ''}
      <h3>${escapeHtml(m.title)}</h3>
      <p>${escapeHtml(m.description)}</p>
      <small>📅 ${new Date(m.memory_date).toLocaleDateString()}</small>
      <button class="btn yes" style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.85rem;" onclick="deleteMemory('${m.id}')">Delete</button>
    `;
    memGrid.appendChild(card);
  });
}

window.deleteMemory = async (id) => {
  if (!confirm('Delete this memory?')) return;
  await deleteRow('memories', id);
  loadMemories();
};

addMemBtn.addEventListener('click', () => memModal.classList.add('open'));
memClose.addEventListener('click', () => memModal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === memModal) memModal.classList.remove('open'); });

memForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await insertRow('memories', {
    title: document.getElementById('memTitle').value,
    description: document.getElementById('memDesc').value,
    photo_url: document.getElementById('memPhoto').value || null,
    memory_date: document.getElementById('memDate').value
  });
  memForm.reset();
  memModal.classList.remove('open');
  loadMemories();
});

/* ---------- Love Notes ---------- */
const noteGrid = document.getElementById('notesGrid');
const addNoteBtn = document.getElementById('openAddNote');
const noteModal = document.getElementById('noteModal');
const noteClose = noteModal.querySelector('.close');
const noteForm = document.getElementById('addNoteForm');

async function loadNotes() {
  const rows = await fetchTable('love_notes');
  noteGrid.innerHTML = '';
  if (!rows.length) {
    noteGrid.innerHTML = '<div class="empty-state">No love notes yet.</div>';
    return;
  }
  rows.forEach(n => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>💌</h3>
      <p style="font-style:italic;">“${escapeHtml(n.content)}”</p>
      ${n.is_private ? '<small>🔒 Private note</small>' : ''}
      <small>📅 ${new Date(n.created_at).toLocaleDateString()}</small>
      <button class="btn yes" style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.85rem;" onclick="deleteNote('${n.id}')">Delete</button>
    `;
    noteGrid.appendChild(card);
  });
}

window.deleteNote = async (id) => {
  if (!confirm('Delete this note?')) return;
  await deleteRow('love_notes', id);
  loadNotes();
};

addNoteBtn.addEventListener('click', () => noteModal.classList.add('open'));
noteClose.addEventListener('click', () => noteModal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === noteModal) noteModal.classList.remove('open'); });

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await insertRow('love_notes', {
    content: document.getElementById('noteContent').value,
    is_private: document.getElementById('notePrivate').checked
  });
  noteForm.reset();
  noteModal.classList.remove('open');
  loadNotes();
});

/* ---------- Date Nights ---------- */
const dateGrid = document.getElementById('datesGrid');
const addDateBtn = document.getElementById('openAddDate');
const dateModal = document.getElementById('dateModal');
const dateClose = dateModal.querySelector('.close');
const dateForm = document.getElementById('addDateForm');

async function loadDates() {
  const rows = await fetchTable('dates');
  dateGrid.innerHTML = '';
  if (!rows.length) {
    dateGrid.innerHTML = '<div class="empty-state">No date nights planned yet.</div>';
    return;
  }
  rows.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(d.title)}</h3>
      ${d.location ? `<p>📍 ${escapeHtml(d.location)}</p>` : ''}
      <p>📅 ${new Date(d.date_time).toLocaleString()}</p>
      ${d.notes ? `<p>${escapeHtml(d.notes)}</p>` : ''}
      <button class="btn yes" style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.85rem;" onclick="deleteDate('${d.id}')">Delete</button>
    `;
    dateGrid.appendChild(card);
  });
}

window.deleteDate = async (id) => {
  if (!confirm('Delete this date?')) return;
  await deleteRow('dates', id);
  loadDates();
};

addDateBtn.addEventListener('click', () => dateModal.classList.add('open'));
dateClose.addEventListener('click', () => dateModal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === dateModal) dateModal.classList.remove('open'); });

dateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await insertRow('dates', {
    title: document.getElementById('dateTitle').value,
    location: document.getElementById('dateLocation').value || null,
    date_time: document.getElementById('dateWhen').value,
    notes: document.getElementById('dateNotes').value || null
  });
  dateForm.reset();
  dateModal.classList.remove('open');
  loadDates();
});

/* ---------- Playlist ---------- */
const songGrid = document.getElementById('playlistGrid');
const addSongBtn = document.getElementById('openAddSong');
const songModal = document.getElementById('songModal');
const songClose = songModal.querySelector('.close');
const songForm = document.getElementById('addSongForm');

async function loadSongs() {
  const rows = await fetchTable('songs');
  songGrid.innerHTML = '';
  if (!rows.length) {
    songGrid.innerHTML = '<div class="empty-state">No songs yet.</div>';
    return;
  }
  rows.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(s.title)}</h3>
      <p>${escapeHtml(s.artist)}</p>
      ${s.song_link ? `<a href="${escapeHtml(s.song_link)}" target="_blank" class="btn yes" style="display:inline-block;padding:0.5rem 1rem;font-size:0.85rem;margin-top:0.75rem;">Listen</a>` : ''}
      ${s.why_song ? `<p style="font-size:0.85rem; margin-top:0.5rem; color:var(--text-light);">“${escapeHtml(s.why_song)}”</p>` : ''}
      <button class="btn yes" style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.85rem;" onclick="deleteSong('${s.id}')">Delete</button>
    `;
    songGrid.appendChild(card);
  });
}

window.deleteSong = async (id) => {
  if (!confirm('Delete this song?')) return;
  await deleteRow('songs', id);
  loadSongs();
};

addSongBtn.addEventListener('click', () => songModal.classList.add('open'));
songClose.addEventListener('click', () => songModal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === songModal) songModal.classList.remove('open'); });

songForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await insertRow('songs', {
    title: document.getElementById('songTitle').value,
    artist: document.getElementById('songArtist').value,
    song_link: document.getElementById('songLink').value || null,
    why_song: document.getElementById('songWhy').value || null
  });
  songForm.reset();
  songModal.classList.remove('open');
  loadSongs();
});

/* ---------- Utilities ---------- */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ---------- Init ---------- */
loadMemories();
loadNotes();
loadDates();
loadSongs();
