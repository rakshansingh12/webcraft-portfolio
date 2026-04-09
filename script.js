/* ═══════════════════════════════════════════════════════════
   WebCraft — script.js
   Rakshan Singh · 23BCB0062 · Web Programming Lab
   All Moodle JS Assignments: 28, 29, 30, 31, 32, 33, 34, 35,
   36, 37, 38, 39, 41a, 41b + Auth forms 20/25/26
═══════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────────────
   UTILITY HELPERS
────────────────────────────────────────────────────────── */
function $(id) { return document.getElementById(id); }
function showErr(id) { const el = $(id); if (el) el.classList.add('show'); }
function hideErr(id) { const el = $(id); if (el) el.classList.remove('show'); }
function showAlert(msg, type = 'success') {
  const alertId = 'globalAlert';
  let el = $(alertId);
  if (!el) {
    el = document.createElement('div');
    el.id = alertId;
    el.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:9999;
      background:var(--surface); border:1px solid var(--border);
      border-radius:10px; padding:1rem 1.5rem; max-width:340px;
      font-family:var(--font-mono); font-size:.82rem;
      box-shadow:0 8px 32px rgba(0,0,0,.5);
      color:var(--text); display:flex; gap:10px; align-items:center;
    `;
    document.body.appendChild(el);
  }
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  el.innerHTML = `<span style="font-size:1.2rem">${icon}</span><span>${msg}</span>`;
  el.style.borderColor = type === 'success' ? 'var(--green)' : type === 'error' ? 'var(--red)' : 'var(--accent)';
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.style.opacity = '0'; }, 3500);
}

/* ──────────────────────────────────────────────────────────
   ASSIGNMENT 32 — STATUS TOGGLE (goOnline)
────────────────────────────────────────────────────────── */
function goOnline(elId) {
  // Called from both index.html and page2.html
  const ids = elId ? [elId] : ['statusDisplay', 'statusDisplay32'];
  ids.forEach(id => {
    const el = $(id);
    if (el) {
      el.textContent = '● Status: Online';
      el.classList.remove('status-offline');
      el.classList.add('status-online');
    }
  });
}

/* ──────────────────────────────────────────────────────────
   ASSIGNMENT 29 — GREETING PAGE
────────────────────────────────────────────────────────── */
function greetUser(inputId, outputId) {
  // Default IDs for index.html usage
  const iid = inputId || 'userName29';
  const oid = outputId || 'displayMessage29';
  const name = $(iid) ? $(iid).value.trim() : '';
  const out  = $(oid);
  if (!out) return;
  if (name !== '') {
    out.innerHTML = `Hello <strong style="color:var(--accent)">${name}</strong>, Welcome!`;
  } else {
    out.textContent = 'Please enter a name.';
  }
}

/* ──────────────────────────────────────────────────────────
   ASSIGNMENT 30 — ORDER CALCULATION
────────────────────────────────────────────────────────── */
function calcOrder(priceId, qtyId, resultId) {
  const pid = priceId || 'priceInput';
  const qid = qtyId   || 'qtyInput';
  const rid = resultId || 'orderResult';
  const price = parseFloat($(pid) ? $(pid).value : 0);
  const qty   = parseFloat($(qid) ? $(qid).value : 0);
  const out   = $(rid);
  if (!out) return;
  if (isNaN(price) || isNaN(qty)) {
    out.textContent = 'Enter valid numbers.';
    return;
  }
  const total = price * qty;
  out.innerHTML = `Total Cost: <strong style="color:var(--green)">₹${total.toFixed(2)}</strong>`;
}

/* ──────────────────────────────────────────────────────────
   ASSIGNMENT 25 — MODERN LOGIN PORTAL
────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── LOGIN FORM 25 ── */
  const lf25 = $('loginForm25');
  if (lf25) {
    lf25.addEventListener('submit', e => {
      e.preventDefault();
      const user = $('user25').value.trim();
      const pass = $('pass25').value.trim();
      if (!user || !pass) {
        showAlert('Please fill in both fields.', 'error');
        return;
      }
      showAlert('Login successful! Welcome back.', 'success');
      lf25.reset();
    });
  }

  /* ── ASSIGNMENT 35: VTOP LOGIN ── */
  const vtopForm = $('vtopForm');
  if (vtopForm) {
    vtopForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const user = $('vtopUser').value.trim();
      const pass = $('vtopPass').value.trim();
      const type = $('vtopType').value;

      if (!user) { showErr('vtopUserErr'); valid = false; } else { hideErr('vtopUserErr'); }
      if (!pass) { showErr('vtopPassErr'); valid = false; } else { hideErr('vtopPassErr'); }
      if (!type) { showErr('vtopTypeErr'); valid = false; } else { hideErr('vtopTypeErr'); }

      if (valid) {
        $('vtopForm').style.display = 'none';
        const dash = $('vtopDashboard');
        $('vtopWelcomeMsg').textContent = `Welcome ${user}!`;
        dash.classList.remove('d-none');
      }
    });
  }

  /* ── ASSIGNMENT 39: FOCUS-MANAGED LOGIN ── */
  const ufield = $('username39');
  const pfield = $('password39');
  if (ufield && pfield) {
    ufield.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); if (ufield.value.trim()) pfield.focus(); }
    });
    ufield.addEventListener('blur', () => { if (ufield.value.trim()) pfield.focus(); });
  }
  const lf39 = $('loginForm39');
  if (lf39) {
    lf39.addEventListener('submit', e => {
      e.preventDefault();
      showAlert('Logging in…', 'info');
    });
  }

  /* ── ASSIGNMENT 26 / LAB38: REGISTRATION ── */
  const rf26 = $('regForm26');
  if (rf26) {
    rf26.addEventListener('submit', e => {
      e.preventDefault();
      const fn    = $('fn26').value.trim();
      const ln    = $('ln26').value.trim();
      const email = $('email26').value.trim();
      const phone = $('phone26').value.trim();
      const pass  = $('pass26').value;
      const cpass = $('cpass26').value;
      const dob   = $('dob26').value;
      const gender = rf26.querySelector('input[name="gender26"]:checked');
      const terms  = $('terms26').checked;
      const errEl  = $('regErr26');

      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let errors = [];
      if (!fn || !ln) errors.push('Full name is required.');
      if (!emailRx.test(email)) errors.push('Valid email required.');
      if (!phone) errors.push('Phone is required.');
      if (pass.length < 8) errors.push('Password must be 8+ characters.');
      if (pass !== cpass) errors.push('Passwords do not match.');
      if (!dob) errors.push('Date of birth required.');
      if (!gender) errors.push('Please select a gender.');
      if (!terms) errors.push('You must accept the Terms.');

      if (errors.length) {
        errEl.textContent = errors[0];
        errEl.classList.add('show');
      } else {
        errEl.classList.remove('show');
        showAlert('Registration successful! 🎉', 'success');
        rf26.reset();
      }
    });
  }

  /* ── ASSIGNMENT 33: UNIVERSITY REGISTRATION ── */
  const uf33 = $('uniForm33');
  if (uf33) {
    uf33.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const name    = $('stuName33').value.trim();
      const email   = $('stuEmail33').value.trim();
      const age     = $('stuAge33').value;
      const pass    = $('stuPass33').value;
      const confirm = $('stuConfirm33').value;
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name)                      { showErr('nameErr33');    valid = false; } else hideErr('nameErr33');
      if (!emailRx.test(email))       { showErr('emailErr33');   valid = false; } else hideErr('emailErr33');
      if (!age || isNaN(age) || +age < 18) { showErr('ageErr33'); valid = false; } else hideErr('ageErr33');
      if (pass.length < 8)            { showErr('passErr33');    valid = false; } else hideErr('passErr33');
      if (!confirm || confirm !== pass){ showErr('confirmErr33'); valid = false; } else hideErr('confirmErr33');

      if (valid) { showAlert('University registration submitted successfully!', 'success'); uf33.reset(); }
    });
  }

  /* ── ASSIGNMENT 41b: REAL-TIME VALIDATION ── */
  const eField41 = $('email41');
  const pField41 = $('password41');
  const btn41    = $('submitBtn41');
  let validEmail41 = false, validPass41 = false;

  if (eField41 && pField41 && btn41) {
    eField41.addEventListener('input', () => {
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRx.test(eField41.value)) {
        eField41.classList.add('fc-valid'); eField41.classList.remove('fc-invalid');
        $('emailIcon41').textContent = '✅';
        hideErr('emailError41');
        validEmail41 = true;
      } else {
        eField41.classList.add('fc-invalid'); eField41.classList.remove('fc-valid');
        $('emailIcon41').textContent = '❌';
        showErr('emailError41');
        validEmail41 = false;
      }
      updateBtn41();
    });

    pField41.addEventListener('input', () => {
      const val = pField41.value;
      const hasNum = /\d/.test(val);
      const hasSym = /[!@#$%^&*_\-+=?]/.test(val);
      const hasLen = val.length >= 8;
      const bar    = $('strengthBar');
      const txt    = $('strengthText');

      if (hasLen && hasNum && hasSym) {
        bar.className = 'strength-fill strength-strong';
        txt.textContent = '💪 Strong password';
        txt.style.color = 'var(--green)';
        hideErr('passError41');
        validPass41 = true;
      } else if (hasLen && (hasNum || hasSym)) {
        bar.className = 'strength-fill strength-medium';
        txt.textContent = '⚠️ Medium — add number or symbol';
        txt.style.color = 'var(--accent3)';
        showErr('passError41');
        validPass41 = false;
      } else {
        bar.className = 'strength-fill strength-weak';
        txt.textContent = '❌ Too weak';
        txt.style.color = 'var(--red)';
        showErr('passError41');
        validPass41 = false;
      }
      updateBtn41();
    });

    const rf41 = $('regForm41');
    if (rf41) {
      rf41.addEventListener('submit', e => {
        e.preventDefault();
        showAlert('Registration Successful! 🎉', 'success');
        rf41.reset();
        validEmail41 = false; validPass41 = false;
        updateBtn41();
        $('emailIcon41').textContent = '';
        $('strengthBar').className = 'strength-fill';
        $('strengthText').textContent = '';
      });
    }
  }

  function updateBtn41() {
    if (btn41) btn41.disabled = !(validEmail41 && validPass41);
  }

  /* ── ASSIGNMENT 34: CHECKOUT FORM ── */
  const cf34 = $('checkoutForm34');
  if (cf34) {
    cf34.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const name    = $('fullName34').value.trim();
      const phone   = $('phone34').value.trim();
      const address = $('address34').value.trim();
      const zip     = $('zip34').value.trim();
      const payments = cf34.querySelectorAll('input[name="payment34"]');
      const phoneRx = /^[0-9]{10}$/;
      const zipRx   = /^[0-9]{6}$/;

      if (!name)             { showErr('nameErr34');  valid = false; } else hideErr('nameErr34');
      if (!phoneRx.test(phone)){ showErr('phoneErr34'); valid = false; } else hideErr('phoneErr34');
      if (!address)          { showErr('addrErr34');  valid = false; } else hideErr('addrErr34');
      if (!zipRx.test(zip))  { showErr('zipErr34');   valid = false; } else hideErr('zipErr34');

      let paySelected = false;
      payments.forEach(r => { if (r.checked) paySelected = true; });
      if (!paySelected) { showErr('payErr34'); valid = false; } else hideErr('payErr34');

      if (valid) { showAlert('Order placed successfully! 🛒', 'success'); cf34.reset(); }
    });
  }

  /* ── ASSIGNMENT 37: HOTEL BOOKING ── */
  const hf37 = $('hotelForm37');
  if (hf37) {
    hf37.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const name  = $('guestName37').value.trim();
      const phone = $('contactNumber37').value.trim();
      const rooms = hf37.querySelectorAll('input[name="roomType37"]');
      const services = hf37.querySelectorAll('input[name="services37"]');
      const terms = $('terms37').checked;

      if (!name)                    { showErr('nameError37');    valid = false; } else hideErr('nameError37');
      if (!phone || isNaN(phone))   { showErr('phoneError37');   valid = false; } else hideErr('phoneError37');

      let roomSel = false;
      rooms.forEach(r => { if (r.checked) roomSel = true; });
      if (!roomSel) { showErr('roomError37');    valid = false; } else hideErr('roomError37');

      let svcSel = false;
      services.forEach(s => { if (s.checked) svcSel = true; });
      if (!svcSel) { showErr('serviceError37');  valid = false; } else hideErr('serviceError37');

      if (!terms) { showErr('termsError37'); valid = false; } else hideErr('termsError37');

      if (valid) { showAlert('Booking request sent successfully! 🏨', 'success'); hf37.reset(); }
    });
  }

  /* ── ASSIGNMENT 36: EXAM REGISTRATION ── */
  const ef36 = $('examForm36');
  if (ef36) {
    ef36.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const name    = $('studentName36').value.trim();
      const email   = $('email36').value.trim();
      const genders = ef36.querySelectorAll('input[name="gender36"]');
      const subjects = ef36.querySelectorAll('input[name="subject36"]');
      const decl    = $('declaration36').checked;
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name)                { showErr('nameErr36');    valid = false; } else hideErr('nameErr36');
      if (!emailRx.test(email)) { showErr('emailErr36');   valid = false; } else hideErr('emailErr36');

      let genSel = false;
      genders.forEach(g => { if (g.checked) genSel = true; });
      if (!genSel) { showErr('genderErr36'); valid = false; } else hideErr('genderErr36');

      let subSel = false;
      subjects.forEach(s => { if (s.checked) subSel = true; });
      if (!subSel) { showErr('subjectErr36'); valid = false; } else hideErr('subjectErr36');

      if (!decl) { showErr('declErr36'); valid = false; } else hideErr('declErr36');

      if (valid) { showAlert('Registration successful! 📝', 'success'); ef36.reset(); }
    });
  }

  /* ── ASSIGNMENT 23: SIMPLE CONTACT FORM ── */
  const cf23 = $('contactForm23');
  if (cf23) {
    cf23.addEventListener('submit', e => {
      e.preventDefault();
      showAlert('Message sent! We will get back to you soon.', 'success');
      cf23.reset();
    });
  }

  /* ── ASSIGNMENT 27: MODERN CONTACT FORM ── */
  const cf27 = $('contactForm27');
  if (cf27) {
    cf27.addEventListener('submit', e => {
      e.preventDefault();
      const name    = $('fullName27').value.trim();
      const email   = $('email27').value.trim();
      const subject = $('subject27').value;
      const msg     = $('message27').value.trim();
      if (!name || !email || !subject || !msg) {
        showAlert('Please fill all required fields.', 'error');
        return;
      }
      showAlert('Thank you! Your message has been sent successfully. ✉️', 'success');
      cf27.reset();
    });
  }

  /* ── NAVBAR SCROLL EFFECT ── */
  const nav = $('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(11,12,20,0.97)';
      } else {
        nav.style.background = 'rgba(11,12,20,0.85)';
      }
    }, { passive: true });
  }

}); // end DOMContentLoaded

/* ──────────────────────────────────────────────────────────
   VTOP LOGOUT
────────────────────────────────────────────────────────── */
function vtopLogout() {
  const dash = $('vtopDashboard');
  const form = $('vtopForm');
  if (dash) dash.classList.add('d-none');
  if (form) { form.style.display = ''; form.reset(); }
}

/* ──────────────────────────────────────────────────────────
   ASSIGNMENT 41a — PRODUCT IMAGE HOVER TOOLTIP
   (handled in CSS but JS also supports programmatic init)
────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const img  = $('productImg41');
  const tip  = $('tooltip41');
  if (img && tip) {
    // CSS hover handles it; JS fallback for mobile
    img.addEventListener('mouseenter', () => tip.style.opacity = '1');
    img.addEventListener('mouseleave', () => tip.style.opacity = '');
  }
});

/* ──────────────────────────────────────────────────────────
   ADD TO CART (Assignment 22 / 16 / 19)
────────────────────────────────────────────────────────── */
const cart = [];
function addToCart(btn, name) {
  cart.push(name);
  btn.textContent = '✓ Added!';
  btn.style.background = 'var(--green)';
  btn.style.color = '#000';
  btn.style.borderColor = 'var(--green)';
  setTimeout(() => {
    btn.textContent = 'Add to Cart';
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 2000);

  const cs = $('cartStatus');
  const ci = $('cartItems');
  if (cs && ci) {
    cs.classList.remove('d-none');
    ci.textContent = cart.join(', ');
  }
  showAlert(`"${name}" added to cart! 🛒`, 'success');
}
