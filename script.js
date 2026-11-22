// Filter produk
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.produk-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
    });
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

// WhatsApp bubble toggle
let waOpen = false;
function toggleWA() {
  waOpen = !waOpen;
  document.getElementById('waPopup').classList.toggle('open', waOpen);
  if (waOpen) document.querySelector('.wa-notif').style.display = 'none';
}

// Auto open WA popup after 5 seconds
setTimeout(() => {
  if (!waOpen) toggleWA();
}, 5000);

// Simulasi kredit
function hitungCicilan() {
  const harga = parseInt(document.getElementById('hargaMotor').value);
  const dp = parseInt(document.getElementById('dpPersen').value) / 100;
  const tenor = parseInt(document.getElementById('tenor').value);
  const bunga = 0.015; // 1.5% per tahun flat

  const pinjaman = harga * (1 - dp);
  const bungaTotal = pinjaman * bunga * tenor;
  const cicilan = Math.round((pinjaman + bungaTotal) / tenor);

  const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(cicilan);
  document.getElementById('nilaiCicilan').textContent = formatted + ' / bln';
}

// Hitung otomatis saat halaman load
hitungCicilan();

// Hitung otomatis saat input berubah
['hargaMotor', 'dpPersen', 'tenor'].forEach(id => {
  document.getElementById(id).addEventListener('change', hitungCicilan);
});

// Form submit → redirect ke WhatsApp
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const nama = form.querySelector('input[type="text"]').value;
  const wa = form.querySelector('input[type="tel"]').value;
  const motor = form.querySelector('select').value;
  const pesan = form.querySelector('textarea').value;

  const text = encodeURIComponent(
    `Halo Marta Yamaha Sentral! 👋\n\nNama: ${nama}\nNo. WA: ${wa}\nMotor Diminati: ${motor}\n${pesan ? 'Pesan: ' + pesan : ''}\n\nMohon info lebih lanjut ya. Terima kasih!`
  );
  window.open(`https://wa.me/6289508739806?text=${text}`, '_blank');
}

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.produk-card, .promo-card, .testi-card, .keung-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
