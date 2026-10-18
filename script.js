// PERSONALIZE AQUI: troque pelo WhatsApp da doceria, com DDI 55 e DDD, apenas números.

const WHATSAPP = '5582987186690';

const products = [
  {
    id: 1,
    name: 'Brigadeiro tradicional',
    description: 'Chocolate intenso com granulado especial.',
    price: 2.50,
    emoji: '🍫'
  },
  {
    id: 2,
    name: 'Brigadeiro de ninho com nutella',
    description: 'Uma combinação delicada e irresistível.',
    price: 2.50,
    emoji: '🍪'
  },
  {
    id: 3,
    name: 'Brigadeiro de paçoca',
    description: 'Crocante por fora e macio por dentro.',
    price: 2.50,
    emoji: '🍪'
  },
  {
    id: 4,
    name: 'Brigadeiro de morango',
    description: 'Massa fofinha com cobertura cremosa.',
    price: 8.50,
    emoji: '🧁'
  },
  {
    id: 5,
    name: 'Caixa com 6 Docinhos',
    description: 'Uma seleção para adoçar seu dia.',
    price: 26.00,
    emoji: '🎁'
  },
  {
    id: 6,
    name: 'Bolo no Pote',
    description: 'Camadas generosas de sabor e carinho.',
    price: 12.00,
    emoji: '🍰'
  }
];

const cart = {};
const money = value => value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const productsEl = document.getElementById('products');
productsEl.innerHTML = products.map(p=>`<article class="product"><div class="product-art" aria-hidden="true">${p.emoji}</div><div class="product-body"><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}" type="button">+ Adicionar</button></div></div></article>`).join('');
const cartPanel=document.getElementById('cartPanel'),overlay=document.getElementById('overlay');
function openCart(){cartPanel.classList.add('open');cartPanel.setAttribute('aria-hidden','false');overlay.hidden=false;document.getElementById('closeCart').focus()}
function closeCart(){cartPanel.classList.remove('open');cartPanel.setAttribute('aria-hidden','true');overlay.hidden=true;document.getElementById('cartButton').focus()}
function renderCart(){const entries=products.filter(p=>cart[p.id]>0);const count=entries.reduce((s,p)=>s+cart[p.id],0);const total=entries.reduce((s,p)=>s+cart[p.id]*p.price,0);document.getElementById('cartCount').textContent=count;document.getElementById('cartTotal').textContent=money(total);document.getElementById('cartItems').innerHTML=entries.length?entries.map(p=>`<div class="cart-item"><div><strong>${p.name}</strong><small>${money(p.price)} cada</small></div><div class="quantity"><button type="button" data-change="${p.id}" data-delta="-1" aria-label="Remover uma unidade de ${p.name}">−</button><span>${cart[p.id]}</span><button type="button" data-change="${p.id}" data-delta="1" aria-label="Adicionar uma unidade de ${p.name}">+</button></div></div>`).join(''):'<p>Seu carrinho está vazio. Escolha seus doces favoritos! 💜</p>';document.getElementById('checkout').disabled=!entries.length}
productsEl.addEventListener('click',e=>{const btn=e.target.closest('[data-add]');if(!btn)return;const id=Number(btn.dataset.add);cart[id]=(cart[id]||0)+1;renderCart();openCart()});
document.getElementById('cartItems').addEventListener('click',e=>{const btn=e.target.closest('[data-change]');if(!btn)return;const id=Number(btn.dataset.change);cart[id]=Math.max(0,(cart[id]||0)+Number(btn.dataset.delta));renderCart()});
document.getElementById('cartButton').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});
document.getElementById('checkout').addEventListener('click',()=>{const entries=products.filter(p=>cart[p.id]>0);if(!entries.length)return;const total=entries.reduce((s,p)=>s+cart[p.id]*p.price,0);const message=['Olá! Gostaria de fazer um pedido na Doce Afeto:','',...entries.map(p=>`• ${cart[p.id]}x ${p.name} — ${money(cart[p.id]*p.price)}`),'',`*Total: ${money(total)}*`,'','Poderia me informar sobre entrega/retirada e pagamento?'].join('\n');window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer')});
document.getElementById('contactLink').href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os doces da Doce Afeto.')}`;
document.getElementById('year').textContent=new Date().getFullYear();renderCart();
