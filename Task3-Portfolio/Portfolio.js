const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});
document.querySelectorAll('.nav-link, .contact-btn').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});




const roles = ['Web Developer', 'Database Designer', 'UI Designer' , 'Graphic Designer'];
const typingText = document.getElementById('typingText');
let role = 0, char = 0, deleting = false;
function typeLoop(){
  const word = roles[role];
  typingText.textContent = deleting ? word.slice(0, char--) : word.slice(0, char++);
  let speed = deleting ? 55 : 105;
  if(!deleting && char > word.length){ speed = 1300; deleting = true; }
  if(deleting && char < 0){ deleting = false; role = (role + 1) % roles.length; char = 0; speed = 350; }
  setTimeout(typeLoop, speed);
}
typeLoop();




document.querySelectorAll('.service-head').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    document.querySelectorAll('.service-item').forEach(other => {
      if(other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});




const track = document.getElementById('worksTrack');
const cards = [...document.querySelectorAll('.work-card')];
const dots = [...document.querySelectorAll('.dot')];
let index = 0;
function visibleCount(){ return window.innerWidth <= 650 ? 1 : window.innerWidth <= 900 ? 2 : 3; }
function moveSlider(){
  const gap = 22;
  const cardWidth = cards[0].getBoundingClientRect().width + gap;
  const max = Math.max(0, cards.length - visibleCount());
  index = Math.min(index, max);
  track.scrollTo({left:index * cardWidth, behavior:'smooth'});
  dots.forEach((d,i)=>d.classList.toggle('active', i===index));
}
document.getElementById('nextWork').onclick=()=>{ index++; if(index>=cards.length-visibleCount()+1) index=0; moveSlider(); };
document.getElementById('prevWork').onclick=()=>{ index--; if(index<0) index=Math.max(0,cards.length-visibleCount()); moveSlider(); };
dots.forEach((d,i)=>d.onclick=()=>{index=i;moveSlider();});
window.addEventListener('resize',moveSlider);




document.getElementById('contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('success').classList.add('show');
  e.target.reset();
  setTimeout(()=>document.getElementById('success').classList.remove('show'),5000);
});




const sections=[...document.querySelectorAll('section[id]')];
const links=[...document.querySelectorAll('.nav-link')];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>observer.observe(s));


const topBtn=document.getElementById('topBtn');
window.addEventListener('scroll',()=>{
  topBtn.classList.toggle('show',window.scrollY>700);
});
topBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});



const glow=document.querySelector('.cursor-glow');
window.addEventListener('mousemove',e=>{
  glow.style.left=e.clientX+'px';
  glow.style.top=e.clientY+'px';
  glow.style.opacity='1';
});
window.addEventListener('mouseleave',()=>glow.style.opacity='0');

document.getElementById('year').textContent=new Date().getFullYear();
