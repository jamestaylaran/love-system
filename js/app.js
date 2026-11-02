// ============================================================
// US 💖 — Relationship System
// ============================================================

/* ---------- Navigation ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navToggle = document.getElementById('navToggle');
const navLinksMenu = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');
const footer = document.querySelector('footer');

function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  navLinks.forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
  if (activeLink) activeLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  navLinksMenu.classList.remove('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(link.getAttribute('href').replace('#', ''));
  });
});

// Quick-link cards on the home screen
document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(el.dataset.goto);
  });
});

navToggle.addEventListener('click', () => {
  navLinksMenu.classList.toggle('open');
});

/* ---------- Days together & countdown ---------- */
// Change START_DATE to the day you two started dating / met
const START_DATE = new Date('2024-01-01T00:00:00');
const NEXT_DATE = new Date();
NEXT_DATE.setDate(NEXT_DATE.getDate() + 30); // next date night (example)

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

/* ---------- LANDING: Evasive No Button + Negative Thoughts ---------- */
const landing = document.getElementById('landing');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionCard = document.querySelector('.question-card');
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
  "please come back to me",
  "was all of this a lie?",
  "i guess i loved you more 😔",
  "you never really loved me...",
  "my world is falling apart",
  "i keep checking my phone for you",
  "why do you hurt me like this?",
  "i dont deserve this...",
  "say yes... please just say yes",
  "every song reminds me of you",
  "i dream about you every night",
  "youre my favorite person... am i yours?",
  "i feel so empty right now",
  "dont throw us away 💔",
  "i would do anything for you",
  "is there someone else?",
  "my hands are shaking...",
  "i hate feeling this way",
  "you make me cry every day now",
  "i still believe in us",
  "please, just one chance",
  "i cant stop thinking about you",
  "am i easy to forget?",
  "i wait for you all day long",
  "my heart says you still care",
  "why does love hurt so much?",
  "i gave you everything...",
  "you were my whole world",
  "dont break what we built 💔",
  "i smile but im dying inside",
  "say you love me... one more time",
  "i never want to lose you",
  "my eyes are full of tears",
  "youre the only one i want",
  "i wish you would just hold me",
  "how can you be so cold?",
  "i still see your smile everywhere",
  "please dont walk away",
  "my heart beats only for you",
  "i would wait forever for you",
  "loving you is my biggest risk"
];

let hasJumped = false;
let lastEvade = 0;

// Random position anywhere in the viewport, never on top of the Yes button
function getRandomPosition(btn) {
  const pad = 16;
  const maxX = window.innerWidth - btn.offsetWidth - pad;
  const maxY = window.innerHeight - btn.offsetHeight - pad;
  const yes = yesBtn.getBoundingClientRect();

  let x = pad, y = pad;
  for (let i = 0; i < 50; i++) {
    x = pad + Math.random() * Math.max(maxX - pad, 1);
    y = pad + Math.random() * Math.max(maxY - pad, 1);
    // Keep 40px away from the Yes button (and the center where Yes sits)
    const overlaps =
      x < yes.right + 40 && x + btn.offsetWidth > yes.left - 40 &&
      y < yes.bottom + 40 && y + btn.offsetHeight > yes.top - 40;
    if (!overlaps) break;
  }
  return { x, y };
}

function evadeNoButton() {
  // Switch out of the centered layout into jump mode, then teleport
  noBtn.style.position = 'fixed';
  const { x, y } = getRandomPosition(noBtn);
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  hasJumped = true;
}

function spawnThought() {
  const text = negativeThoughts[Math.floor(Math.random() * negativeThoughts.length)];
  const thought = document.createElement('div');
  thought.className = 'thought';
  thought.textContent = text;

  const rect = noBtn.getBoundingClientRect();
  let top = rect.bottom + 12;
  let left = rect.left + rect.width / 2 - 90;
  top = Math.min(Math.max(top, 10), window.innerHeight - 44);
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

function scareNoButton() {
  const now = Date.now();
  if (now - lastEvade < 450) return; // throttle so thoughts don't spam
  lastEvade = now;
  evadeNoButton();
  spawnThought();
}

// Hover / touch the No button → it runs away
noBtn.addEventListener('mouseenter', scareNoButton);
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  scareNoButton();
});

// The No button flees when the cursor gets close (anywhere on screen)
document.addEventListener('mousemove', (e) => {
  if (landing.classList.contains('landing-hidden')) return;
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
  if (dist < 150) scareNoButton();
});

/* ---------- YES → celebration → home screen ---------- */
let enteredSite = false;
let enterTimer = null;

function enterSite() {
  if (enteredSite) return;
  enteredSite = true;
  clearTimeout(enterTimer);

  landing.classList.add('landing-hidden');
  document.body.classList.remove('landing-open');

  setTimeout(() => {
    landing.style.display = 'none';
    document.querySelectorAll('.thought').forEach(t => t.remove());
    navbar.classList.remove('hidden');
    footer.classList.add('visible');
    showSection('home');
  }, 600);
}

function spawnHeart(left, top, size, duration) {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = ['❤', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
  h.style.left = left + 'vw';
  h.style.top = top + 'vh';
  h.style.fontSize = size + 'rem';
  h.style.animationDuration = duration + 's';
  document.getElementById('floatingHearts').appendChild(h);
  setTimeout(() => h.remove(), duration * 1000);
}

yesBtn.addEventListener('click', () => {
  questionCard.classList.add('hidden');
  result.classList.remove('hidden');
  hasJumped = true;
  noBtn.style.display = 'none';
  document.querySelectorAll('.thought').forEach(t => t.remove());

  // Celebration hearts
  for (let i = 0; i < 45; i++) {
    spawnHeart(Math.random() * 100, Math.random() * 100, 1.2 + Math.random() * 2, 3 + Math.random() * 5);
  }

  // Proceed to the home screen (click the message to go faster)
  enterTimer = setTimeout(enterSite, 2400);
  result.addEventListener('click', enterSite, { once: true });
});

// Ambient hearts while on the landing page
setInterval(() => {
  if (!enteredSite && document.querySelector('.question-card')) {
    spawnHeart(Math.random() * 100, 100, 1 + Math.random() * 2, 5 + Math.random() * 5);
  }
}, 700);

/* ---------- Keep the No button inside the viewport after it jumps ---------- */
window.addEventListener('resize', () => {
  if (!hasJumped) return; // at rest it's in the centered layout — nothing to clamp
  const maxX = window.innerWidth - noBtn.offsetWidth - 16;
  const maxY = window.innerHeight - noBtn.offsetHeight - 16;
  noBtn.style.left = Math.min(Math.max(16, parseFloat(noBtn.style.left) || 16), Math.max(maxX, 16)) + 'px';
  noBtn.style.top = Math.min(Math.max(16, parseFloat(noBtn.style.top) || 16), Math.max(maxY, 16)) + 'px';
});

/* ---------- Storage layer: Supabase + instant local fallback ---------- */
const LS_KEY = 'love-system-v1';

function getLocal(table) {
  try {
    const db = JSON.parse(localStorage.getItem(LS_KEY)) || {};
    return Array.isArray(db[table]) ? db[table] : [];
  } catch { return []; }
}

function saveLocal(table, rows) {
  try {
    const db = JSON.parse(localStorage.getItem(LS_KEY)) || {};
    db[table] = rows;
    localStorage.setItem(LS_KEY, JSON.stringify(db));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function byNewest(a, b) {
  return new Date(b.created_at || 0) - new Date(a.created_at || 0);
}

function newId() {
  return (window.crypto && crypto.randomUUID)
    ? crypto.randomUUID()
    : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
}

function toast(message) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 2600);
}

// Safe cloud accessor — the app keeps working even if the
// Supabase script fails to load (falls back to local storage).
function getCloud() {
  try {
    return (typeof supabase !== 'undefined' && supabase) ? supabase : null;
  } catch {
    return null;
  }
}

async function fetchTable(table) {
  const local = getLocal(table);
  const cloud = getCloud();

  // Supabase not connected yet → instant local data
  if (!cloud) return local.slice().sort(byNewest);

  try {
    const { data, error } = await cloud.from(table).select('*').order('created_at', { ascending: false });
    if (error) {
      console.error(error);
      return local.slice().sort(byNewest);
    }
    const remote = data || [];
    // Sync up anything saved locally before Supabase was connected
    const remoteIds = new Set(remote.map(r => r.id));
    for (const row of local) {
      if (!remoteIds.has(row.id)) {
        try { await cloud.from(table).insert([row]); } catch {}
        remote.push(row);
      }
    }
    const merged = remote.sort(byNewest);
    saveLocal(table, merged);
    return merged;
  } catch (e) {
    console.error(e);
    return local.slice().sort(byNewest);
  }
}

async function insertRow(table, row) {
  const full = {
    id: newId(),
    created_at: new Date().toISOString(),
    ...row
  };

  // Save locally first — instant feedback, works offline
  const rows = getLocal(table);
  rows.unshift(full);
  const saved = saveLocal(table, rows);

  const cloud = getCloud();
  if (!cloud) {
    toast(saved ? 'Sent 💖' : '⚠️ Device storage is full — delete an old photo first 😥');
    return saved;
  }

  try {
    const { error } = await cloud.from(table).insert([full]);
    if (error) {
      console.error(error);
      toast(saved ? 'Saved on this device — cloud sync will retry' : '⚠️ Could not save that 😥');
      return saved;
    }
    toast('Sent 💖');
    return true;
  } catch (e) {
    console.error(e);
    toast(saved ? 'Saved on this device — cloud sync will retry' : '⚠️ Could not save that 😥');
    return saved;
  }
}

async function deleteRow(table, id) {
  const ok = saveLocal(table, getLocal(table).filter(r => r.id !== id));
  if (!ok) {
    toast('⚠️ Device storage is full — could not delete 😥');
    return;
  }
  const cloud = getCloud();
  if (!cloud) return;
  try {
    const { error } = await cloud.from(table).delete().eq('id', id);
    if (error) console.error(error);
  } catch (e) {
    console.error(e);
  }
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
      ${m.photo_url ? `<img src="${escapeHtml(m.photo_url)}" alt="memory" style="width:100%;border-radius:12px;margin-bottom:0.75rem;">` : ''}
      <h3>${escapeHtml(m.title)}</h3>
      <p>${escapeHtml(m.description)}</p>
      <small>📅 ${new Date(m.memory_date).toLocaleDateString()}</small>
      <button class="btn yes" style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.85rem;" data-del-memory="${m.id}">Delete</button>
    `;
    memGrid.appendChild(card);
  });
}

memGrid.addEventListener('click', async (e) => {
  const id = e.target.dataset.delMemory;
  if (id && confirm('Delete this memory?')) {
    await deleteRow('memories', id);
    loadMemories();
  }
});

/* ---------- Photo upload: pick from files → compress → preview ---------- */
const memPhotoInput = document.getElementById('memPhoto');
const uploadZone = document.getElementById('uploadZone');
const uploadIdle = document.getElementById('uploadIdle');
const uploadPreview = document.getElementById('uploadPreview');
const uploadImg = document.getElementById('uploadImg');
const uploadRemove = document.getElementById('uploadRemove');
let pendingPhoto = null;

function resetPhotoUpload() {
  pendingPhoto = null;
  memPhotoInput.value = '';
  uploadImg.removeAttribute('src');
  uploadPreview.classList.add('hidden');
  uploadIdle.classList.remove('hidden');
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 1280;
      let width = img.width;
      let height = img.height;
      if (width > max || height > max) {
        const scale = Math.min(max / width, max / height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image'));
    };
    img.src = url;
  });
}

uploadZone.addEventListener('click', (e) => {
  if (e.target === uploadRemove || e.target === memPhotoInput) return;
  memPhotoInput.click();
});

uploadRemove.addEventListener('click', (e) => {
  e.stopPropagation();
  resetPhotoUpload();
});

memPhotoInput.addEventListener('change', async () => {
  const file = memPhotoInput.files && memPhotoInput.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    toast('Please choose an image file');
    resetPhotoUpload();
    return;
  }
  try {
    pendingPhoto = await compressImage(file);
    uploadImg.src = pendingPhoto;
    uploadIdle.classList.add('hidden');
    uploadPreview.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    toast('Could not read that image 😥');
    resetPhotoUpload();
  }
});

addMemBtn.addEventListener('click', () => {
  memModal.classList.add('open');
  const d = document.getElementById('memDate');
  if (!d.value) d.value = todayStr();
});
memClose.addEventListener('click', () => {
  memModal.classList.remove('open');
  resetPhotoUpload();
});
window.addEventListener('click', (e) => {
  if (e.target === memModal) {
    memModal.classList.remove('open');
    resetPhotoUpload();
  }
});

memForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!requireFields([
    ['memTitle', 'Give your memory a title first 🥺'],
    ['memDesc', 'Add a little description 🥰'],
    ['memDate', 'Pick a date for this memory 📅']
  ])) return;
  const ok = await insertRow('memories', {
    title: document.getElementById('memTitle').value,
    description: document.getElementById('memDesc').value,
    photo_url: pendingPhoto || null,
    memory_date: document.getElementById('memDate').value
  });
  if (!ok) return;
  memForm.reset();
  resetPhotoUpload();
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
      <p style="font-style:italic;">&ldquo;${escapeHtml(n.content)}&rdquo;</p>
      ${n.is_private ? '<small>🔒 Private note</small>' : ''}
      <small>📅 ${new Date(n.created_at).toLocaleDateString()}</small>
      <button class="btn yes" style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.85rem;" data-del-note="${n.id}">Delete</button>
    `;
    noteGrid.appendChild(card);
  });
}

noteGrid.addEventListener('click', async (e) => {
  const id = e.target.dataset.delNote;
  if (id && confirm('Delete this note?')) {
    await deleteRow('love_notes', id);
    loadNotes();
  }
});

addNoteBtn.addEventListener('click', () => noteModal.classList.add('open'));
noteClose.addEventListener('click', () => noteModal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === noteModal) noteModal.classList.remove('open'); });

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!requireFields([['noteContent', 'Write something sweet first 🥺']])) return;
  const ok = await insertRow('love_notes', {
    content: document.getElementById('noteContent').value,
    is_private: document.getElementById('notePrivate').checked
  });
  if (!ok) return;
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
      <button class="btn yes" style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.85rem;" data-del-date="${d.id}">Delete</button>
    `;
    dateGrid.appendChild(card);
  });
}

dateGrid.addEventListener('click', async (e) => {
  const id = e.target.dataset.delDate;
  if (id && confirm('Delete this date?')) {
    await deleteRow('dates', id);
    loadDates();
  }
});

addDateBtn.addEventListener('click', () => {
  dateModal.classList.add('open');
  const w = document.getElementById('dateWhen');
  if (!w.value) w.value = todayStr() + 'T19:00';
});
dateClose.addEventListener('click', () => dateModal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === dateModal) dateModal.classList.remove('open'); });

dateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!requireFields([
    ['dateTitle', 'Give your date a name 🌙'],
    ['dateWhen', 'When is it? 📅']
  ])) return;
  const ok = await insertRow('dates', {
    title: document.getElementById('dateTitle').value,
    location: document.getElementById('dateLocation').value || null,
    date_time: document.getElementById('dateWhen').value,
    notes: document.getElementById('dateNotes').value || null
  });
  if (!ok) return;
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
      ${s.song_link ? `<a href="${escapeHtml(s.song_link)}" target="_blank" rel="noopener" class="btn yes" style="display:inline-block;padding:0.5rem 1rem;font-size:0.85rem;margin-top:0.75rem;">Listen</a>` : ''}
      ${s.why_song ? `<p style="font-size:0.85rem; margin-top:0.5rem; color:var(--text-light);">&ldquo;${escapeHtml(s.why_song)}&rdquo;</p>` : ''}
      <button class="btn yes" style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.85rem;" data-del-song="${s.id}">Delete</button>
    `;
    songGrid.appendChild(card);
  });
}

songGrid.addEventListener('click', async (e) => {
  const id = e.target.dataset.delSong;
  if (id && confirm('Delete this song?')) {
    await deleteRow('songs', id);
    loadSongs();
  }
});

addSongBtn.addEventListener('click', () => songModal.classList.add('open'));
songClose.addEventListener('click', () => songModal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === songModal) songModal.classList.remove('open'); });

songForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!requireFields([
    ['songTitle', "What's the song called? 🎵"],
    ['songArtist', 'Who sings it? 🎤']
  ])) return;
  // Tolerate links typed without https:// (native url validation is off)
  const linkEl = document.getElementById('songLink');
  if (linkEl.value && !/^https?:\/\//i.test(linkEl.value.trim())) {
    linkEl.value = 'https://' + linkEl.value.trim();
  }
  const ok = await insertRow('songs', {
    title: document.getElementById('songTitle').value,
    artist: document.getElementById('songArtist').value,
    song_link: document.getElementById('songLink').value || null,
    why_song: document.getElementById('songWhy').value || null
  });
  if (!ok) return;
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

// Visible validation — replaces the browser's easy-to-miss native bubbles
// with a clear toast + focused field, so a click never "does nothing".
function requireFields(checks) {
  for (const [id, msg] of checks) {
    const el = document.getElementById(id);
    if (!el || !String(el.value || '').trim()) {
      toast(msg);
      if (el && el.focus) el.focus();
      return false;
    }
  }
  return true;
}

function todayStr() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

/* ---------- Init ---------- */
loadMemories();
loadNotes();
loadDates();
loadSongs();
