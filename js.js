// ======================
// 公共登录验证（我只加了这个）
// ======================
function checkLogin() {
  let user = localStorage.getItem('currentUser');
  if (!user) {
    alert('请先登录再进行操作！');
    location.href = 'login.html';
    return false;
  }
  return true;
}

let goodsData = JSON.parse(localStorage.getItem("campusGoods")) || [];
let collectData = JSON.parse(localStorage.getItem("collectList")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let bargains = JSON.parse(localStorage.getItem("bargains")) || [];

// 内置固定示例商品（上线展示用，ID 1-6 固定不可删）
const fixedDefaultGoods = [
  {
    id: 1,
    name: "高等数学 同济七版",
    cate: "教材书籍",
    level: "9成新",
    price: 32,
    desc: "笔记少，无破损，考研必备",
    img: "img/tp1.png",
    img2: "img/tp1-2.png",
    img3: "img/tp1-2.png",
    time: Date.now(),
    seller: { nickname: "校园学长", contact: "13800138000", verified: true }
  },
  {
    id: 2,
    name: "大学英语 全新版",
    cate: "教材书籍",
    level: "95新",
    price: 25,
    desc: "几乎全新，四六级可用",
    img: "img/tp2.png",
    img2: "img/tp2-2.png",
    img3: "img/tp2-2.png",
    time: Date.now(),
    seller: { nickname: "校园学长", contact: "13800138000", verified: true }
  },
  {
    id: 3,
    name: "线性代数 同济六版",
    cate: "教材书籍",
    level: "9成新",
    price: 20,
    desc: "线代必备，字迹清晰",
    img: "img/tp3.png",
    img2: "img/tp3-2.png",
    img3: "img/tp3-2.png",
    time: Date.now(),
    seller: { nickname: "校园学长", contact: "13800138000", verified: true }
  },
  {
    id: 4,
    name: "概率论与数理统计",
    cate: "教材书籍",
    level: "8成新",
    price: 18,
    desc: "少量划线，不影响使用",
    img: "img/tp4.png",
    img2: "img/tp4-2.png",
    img3: "img/tp4-2.png",
    time: Date.now(),
    seller: { nickname: "校园学长", contact: "13800138000", verified: true }
  },
  {
    id: 5,
    name: "思想道德与法治",
    cate: "教材书籍",
    level: "全新",
    price: 15,
    desc: "未使用，大一必修",
    img: "img/tp5.png",
    img2: "img/tp5-2.png",
    img3: "img/tp5-2.png",
    time: Date.now(),
    seller: { nickname: "校园学长", contact: "13800138000", verified: true }
  },
  {
    id: 6,
    name: "计算机二级题库",
    cate: "教材书籍",
    level: "95新",
    price: 28,
    desc: "2026最新版，带真题",
    img: "img/tp6.png",
    img2: "img/tp6-2.png",
    img3: "img/tp6-2.png",
    time: Date.now(),
    seller: { nickname: "校园学长", contact: "13800138000", verified: true }
  }
];

// 合并数据：固定示例商品 + 你自己发布的商品
goodsData = [...fixedDefaultGoods, ...goodsData.filter(item => item.id > 1000)];

// 首页分类筛选 + 切换选中蓝色下划线
function filterHome(cate) {
  const box = document.getElementById("home-goods");
  let list = goodsData;
  if (cate !== "") {
    list = goodsData.filter(g => g.cate === cate);
  }
  let html = "";
  list.forEach(g => {
    html += `
    <div class="goods-card" onclick="goDetail(${g.id})">
      <img src="${g.img}">
      <div class="goods-info">
        <div class="goods-title">${g.name}</div>
        <div class="goods-price">¥${g.price}</div>
        <div class="goods-level">${g.level}</div>
      </div>
    </div>`;
  });
  box.innerHTML = html;

  // 切换选中样式
  const items = document.querySelectorAll("#navTab .cate-item");
  items.forEach(item => item.classList.remove("active"));
  if (event) event.target.classList.add("active");
}

// 渲染首页商品
function renderHomeGoods() {
  const box = document.getElementById("home-goods");
  if (!box) return;
  let html = "";
  goodsData.forEach(g => {
    html += `
    <div class="goods-card" onclick="goDetail(${g.id})">
      <img src="${g.img}">
      <div class="goods-info">
        <div class="goods-title">${g.name}</div>
        <div class="goods-price">¥${g.price}</div>
        <div class="goods-level">${g.level}</div>
      </div>
    </div>`;
  });
  box.innerHTML = html;
}

// 跳转到详情
function goDetail(id) {
  localStorage.setItem("currentGoodsId", id);
  location.href = "index3.html";
}

// 加载详情
function loadDetail() {
  const id = Number(localStorage.getItem("currentGoodsId"));
  const g = goodsData.find(i => i.id === id);
  if (!g) return;
  
  document.getElementById("detail-img1").src = g.img;
  document.getElementById("detail-img2").src = g.img2 || g.img;
  document.getElementById("detail-img3").src = g.img3 || g.img;
  document.getElementById("detail-title").innerText = g.name;
  document.getElementById("detail-price").innerText = "¥" + g.price;
  document.getElementById("detail-cate").innerText = g.cate;
  document.getElementById("detail-level").innerText = g.level;
  document.getElementById("detail-desc").innerText = g.desc;
  
  const sellerInfo = g.seller || {nickname: "未知卖家", contact: "无联系方式", verified: false};
  const sellerBox = document.getElementById("seller-info");
  if (sellerBox) {
    sellerBox.innerHTML = `
      <p>卖家：${sellerInfo.nickname}</p>
      <p>联系方式：${sellerInfo.contact}</p>
      ${sellerInfo.verified ? '<p style="color: #06c76f; font-weight: 500;">✅ 在校认证用户</p>' : ''}
    `;
  }
  
  const isCollect = collectData.some(item => item.id === id);
  const collectBtn = document.getElementById("collect-btn");
  if (collectBtn) {
    collectBtn.innerText = isCollect ? "已收藏" : "收藏商品";
  }
}

// 图片预览
function previewImg() {
  const files = document.getElementById("goods-img").files;
  const p = document.getElementById("img-preview");
  p.innerHTML = "";
  for (let i = 0; i < files.length && i < 3; i++) {
    const u = URL.createObjectURL(files[i]);
    p.innerHTML += `<img src="${u}" style="width:100px;height:100px;object-fit:cover;margin:5px;">`;
  }
}

// 图片压缩（超级省空间！）
function compressImage(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      }
    }
  });
}

// 发布商品
async function submitPublish() {
  if (!checkLogin()) return;

  const name = document.getElementById("goods-name").value;
  const cate = document.getElementById("goods-cate").value;
  const level = document.getElementById("goods-level").value;
  const price = document.getElementById("goods-price").value;
  const desc = document.getElementById("goods-desc").value;
  const tradeContact = document.getElementById("trade-contact").value;
  const files = document.getElementById("goods-img").files;

  if (!name || !cate || !level || !price || files.length === 0) {
    alert("请完善信息并上传图片！");
    return;
  }

  const user = JSON.parse(localStorage.getItem("userInfo")) || {
    nickname: "匿名用户",
    contact: "未设置联系方式"
  };

  let img1 = "", img2 = "", img3 = "";
  if (files[0]) img1 = await compressImage(files[0]);
  if (files[1]) img2 = await compressImage(files[1]);
  if (files[2]) img3 = await compressImage(files[2]);

  const newGoods = {
    id: Date.now(), name, cate, level, price, desc,
    img: img1, img2: img2, img3: img3,
    time: Date.now(),
    seller: { nickname: user.nickname, contact: tradeContact, verified: true }
  };
  goodsData.unshift(newGoods);

  try {
    localStorage.setItem("campusGoods", JSON.stringify(goodsData));
    alert("发布成功！");
    location.href = "index1.html";
  } catch (e) {
    goodsData.shift();
    if (e.name === "QuotaExceededError") {
      alert("⚠️ 存储空间已满！请删除几个不需要的商品再发布~");
    } else {
      alert("发布失败：" + e.message);
    }
  }
}

// 删除商品（拦截默认示例商品删除）
function deleteGoods(id) {
  if (id <= 1000) {
    alert("默认展示商品不可删除！");
    return;
  }
  if (confirm("确定删除？")) {
    goodsData = goodsData.filter(item => item.id !== id);
    localStorage.setItem("campusGoods", JSON.stringify(goodsData));
    showMyPublish();
    renderHomeGoods();
  }
}

// 筛选
function filterGoods() {
  const cate = document.getElementById("filter-cate").value;
  const min = document.getElementById("min-price").value || 0;
  const max = document.getElementById("max-price").value || 9999;
  const level = document.getElementById("filter-level").value;
  const sort = document.getElementById("sort-type").value;

  let list = goodsData.filter(i => {
    return (cate === "" || i.cate === cate) && i.price >= min && i.price <= max && (level === "" || i.level === level);
  });

  if (sort === "new") list.sort((a, b) => b.time - a.time);
  if (sort === "old") list.sort((a, b) => a.time - b.time);
  if (sort === "price-up") list.sort((a, b) => a.price - b.price);
  if (sort === "price-down") list.sort((a, b) => b.price - a.price);

  let html = "";
  list.forEach(g => {
    html += `
    <div class="goods-card" onclick="goDetail(${g.id})">
      <img src="${g.img}">
      <div class="goods-info">
        <div class="goods-title">${g.name}</div>
        <div class="goods-price">¥${g.price}</div>
        <div class="goods-level">${g.level}</div>
      </div>
    </div>`;
  });
  const filterBox = document.getElementById("filter-goods");
  if (filterBox) filterBox.innerHTML = html;
}

// 收藏
function toggleCollect() {
  if (!checkLogin()) return;

  const id = Number(localStorage.getItem("currentGoodsId"));
  const idx = collectData.findIndex(i => i.id === id);
  if (idx > -1) {
    collectData.splice(idx, 1);
    alert("已取消收藏");
  } else {
    collectData.push(goodsData.find(i => i.id === id));
    alert("收藏成功");
  }
  localStorage.setItem("collectList", JSON.stringify(collectData));
  loadDetail();
}

// 我的发布（只展示用户自己发布的，隐藏默认商品）
function showMyPublish() {
  let html = "";
  goodsData.forEach(g => {
    if(g.id <= 1000) return;
    html += `
    <div class="goods-card" style="position:relative">
      <img src="${g.img}" onclick="goDetail(${g.id})">
      <div class="goods-info" onclick="goDetail(${g.id})">
        <div class="goods-title">${g.name}</div>
        <div class="goods-price">¥${g.price}</div>
      </div>
      <button onclick="event.stopPropagation();deleteGoods(${g.id})" style="position:absolute;right:6px;bottom:6px;background:red;color:white;border:none;border-radius:4px;font-size:12px;padding:3px 6px">删除</button>
    </div>`;
  });
  const userGoodsBox = document.getElementById("user-goods");
  if (userGoodsBox) userGoodsBox.innerHTML = html;
}

// 我的收藏
function showMyCollect() {
  let html = "";
  collectData.forEach(g => {
    html += `
    <div class="goods-card" onclick="goDetail(${g.id})">
      <img src="${g.img}">
      <div class="goods-info">
        <div class="goods-title">${g.name}</div>
        <div class="goods-price">¥${g.price}</div>
      </div>
    </div>`;
  });
  const userGoodsBox = document.getElementById("user-goods");
  if (userGoodsBox) userGoodsBox.innerHTML = html;
}

// 价格协商
function startBargain() {
  if (!checkLogin()) return;

  const id = Number(localStorage.getItem("currentGoodsId"));
  const goods = goodsData.find(item => item.id === id);
  const user = JSON.parse(localStorage.getItem("userInfo")) || {
    nickname: "匿名用户",
    contact: "未设置联系方式"
  };
  
  if (!goods) {
    alert("商品不存在！");
    return;
  }
  
  const offerPrice = prompt("请输入您的议价金额：");
  if (offerPrice && !isNaN(offerPrice) && offerPrice > 0) {
    const bargain = {
      id: Date.now(),
      goods: goods,
      offerPrice: offerPrice,
      status: "协商中",
      createTime: new Date().toLocaleString(),
      buyer: {
        nickname: user.nickname,
        contact: user.contact
      },
      chat: [
        { sender: "系统", content: `买家发起议价：¥${offerPrice}`, time: new Date().toLocaleTimeString() }
      ]
    };
    
    bargains.push(bargain);
    localStorage.setItem("bargains", JSON.stringify(bargains));
    
    alert("议价已发起！可前往【我的协商】查看，去【我的消息】沟通~");
  } else {
    alert("请输入有效的价格！");
  }
}

// 立即购买
function buyNow() {
  if (!checkLogin()) return;

  const id = Number(localStorage.getItem("currentGoodsId"));
  const goods = goodsData.find(item => item.id === id);
  const user = JSON.parse(localStorage.getItem("userInfo")) || {
    nickname: "匿名用户",
    contact: "未设置联系方式"
  };
  
  if (!goods) {
    alert("商品不存在！");
    return;
  }
  
  const order = {
    id: Date.now(),
    goods: goods,
    status: "待支付",
    createTime: new Date().toLocaleString(),
    buyer: {
      nickname: user.nickname,
      contact: user.contact
    }
  };
  
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  
  alert("购买成功！订单已创建");
  location.href = "index6.html";
}

// 渲染订单
function renderOrders() {
  const orderList = document.getElementById("order-list");
  if (!orderList) return;
  
  if (orders.length === 0) {
    orderList.innerHTML = "<p>暂无订单</p>";
    return;
  }
  
  let html = "";
  orders.forEach(order => {
    const seller = order.goods.seller || {nickname: "未知卖家", contact: "无联系方式"};
    const buyer = order.buyer || {nickname: "未知买家", contact: "无联系方式"};
    
    html += `
    <div style="margin:15px 0;padding:15px;border:1px solid #eee;border-radius:8px;">
        <div style="display:flex;align-items:center;gap:15px;margin-bottom:15px;">
            <img src="${order.goods.img}" style="width:80px;height:80px;object-fit:cover;border-radius:6px;">
            <div>
                <h4>${order.goods.name}</h4>
                <p>价格：¥${order.goods.price}</p>
                <p>订单状态：<span style="color:#ff4444">${order.status}</span></p>
            </div>
        </div>
        
        <div style="margin:10px 0;">
            <p><strong>卖家：</strong>${seller.nickname} (${seller.contact})</p>
            <p><strong>买家：</strong>${buyer.nickname} (${buyer.contact})</p>
        </div>
        
        <p>创建时间：${order.createTime}</p>
        
        <div style="margin-top:10px;">
            ${order.status === '待支付' ? `
            <button onclick="updateOrderStatus(${order.id}, '已完成')" style="margin-right:10px;">确定支付</button>
            <button onclick="updateOrderStatus(${order.id}, '已取消')" style="margin-right:10px;">取消订单</button>
            ` : ''}
            <button onclick="deleteOrder(${order.id})">删除订单</button>
        </div>
    </div>
    `;
  });
  
  orderList.innerHTML = html;
}

// 更新订单状态
function updateOrderStatus(orderId, status) {
  const index = orders.findIndex(o => o.id === orderId);
  if (index > -1) {
    orders[index].status = status;
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
  }
}

// 删除订单
function deleteOrder(orderId) {
  if (confirm('确定要删除这个订单吗？')) {
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
  }
}

// 渲染协商记录
function renderBargains() {
  const bargainList = document.getElementById("bargain-list");
  if (!bargainList) return;
  
  if (bargains.length === 0) {
    bargainList.innerHTML = "<p>暂无协商记录</p>";
    return;
  }
  
  let html = "";
  bargains.forEach(bargain => {
    const seller = bargain.goods.seller || {nickname: "未知卖家", contact: "无联系方式"};
    const buyer = bargain.buyer || {nickname: "未知买家", contact: "无联系方式"};
    
    html += `
    <div style="display:flex;align-items:center;gap:15px;margin:15px 0;padding:15px;border:1px solid #eee;border-radius:8px;">
      <img src="${bargain.goods.img}" style="width:80px;height:80px;object-fit:cover;border-radius:6px;">
      <div style="flex:1;">
        <h4>${bargain.goods.name}</h4>
        <p>原价：¥${bargain.goods.price}</p>
        <p>协商价：¥${bargain.offerPrice}</p>
        <p>卖家：${seller.nickname} (${seller.contact})</p>
        <p>买家：${buyer.nickname} (${buyer.contact})</p>
        <p>状态：<span style="color:${bargain.status === '协商中' ? '#ff4444' : '#2D7DFF'}">${bargain.status}</span></p>
        <p>发起时间：${bargain.createTime}</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;">
        <button onclick="goToChatList(${bargain.id})" style="background:#2D7DFF;color:white;border:none;padding:5px;border-radius:4px;cursor:pointer;">去聊天</button>
        ${bargain.status === '协商中' ? `
        <button onclick="acceptBargain(${bargain.id})">接受</button>
        <button onclick="rejectBargain(${bargain.id})">拒绝</button>
        ` : ''}
        <button onclick="deleteChatOnly(${bargain.id})" style="background:red;color:white;border:none;padding:5px;border-radius:4px;cursor:pointer;">删除聊天</button>
      </div>
    </div>
    `;
  });
  
  bargainList.innerHTML = html;
}

// 跳转到消息列表页
function goToChatList(bid){
  localStorage.setItem("nowChatId", bid);
  location.href = "index11.html";
}

// 【修复】只删除聊天记录（统一使用全局变量，不再重复读取本地存储）
function deleteChatOnly(bargainId) {
  if (!confirm("确定删除该聊天记录吗？协商记录会保留")) return;
  let idx = bargains.findIndex(item => item.id === bargainId);
  if(idx !== -1){
    bargains[idx].chat = [];
    localStorage.setItem("bargains", JSON.stringify(bargains));
    renderBargains();
  }
}

// 接受协商
function acceptBargain(bargainId) {
  const index = bargains.findIndex(b => b.id === bargainId);
  
  if (index > -1) {
    bargains[index].status = "已接受";
    localStorage.setItem("bargains", JSON.stringify(bargains));
    
    const bargain = bargains[index];
    const order = {
      id: Date.now(),
      goods: {
        ...bargain.goods,
        price: bargain.offerPrice
      },
      status: "待支付",
      createTime: new Date().toLocaleString(),
      buyer: bargain.buyer
    };
    
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    
    alert("协商成功！已生成订单");
    renderBargains();
  }
}

// 拒绝协商
function rejectBargain(bargainId) {
  const index = bargains.findIndex(b => b.id === bargainId);
  
  if (index > -1) {
    bargains[index].status = "已拒绝";
    localStorage.setItem("bargains", JSON.stringify(bargains));
    alert("协商已拒绝");
    renderBargains();
  }
}

// 删除协商记录
function deleteBargain(bargainId) {
  deleteChatOnly(bargainId);
}

// 加载个人资料
function loadProfile() {
  const user = JSON.parse(localStorage.getItem("userInfo")) || {};
  const nicknameInput = document.getElementById("nickname");
  const contactInput = document.getElementById("contact");
  
  if (nicknameInput) nicknameInput.value = user.nickname || "";
  if (contactInput) contactInput.value = user.contact || "";
}

// 保存个人资料
function saveProfile() {
  const nickname = document.getElementById("nickname").value;
  const contact = document.getElementById("contact").value;
  
  const user = {
    nickname: nickname,
    contact: contact
  };
  
  localStorage.setItem("userInfo", JSON.stringify(user));
  alert("资料修改成功！");
  location.href = "index5.html";
}

window.onload = function () {
  // 页面加载时重新拉取最新本地数据，修复按钮点击失效
  goodsData = JSON.parse(localStorage.getItem("campusGoods")) || [];
  orders = JSON.parse(localStorage.getItem("orders")) || [];
  bargains = JSON.parse(localStorage.getItem("bargains")) || [];
  collectData = JSON.parse(localStorage.getItem("collectList")) || [];

  renderHomeGoods();
  loadDetail();
  renderOrders();
  renderBargains();
  loadProfile();
};

// ==============================================
// 导航：未登录显示【登录】，登录后显示【我的】
// ==============================================
window.addEventListener('load', function(){
  let navDom = document.getElementById('userNav');
  if(navDom){
    let loginUser = localStorage.getItem('currentUser');
    if(!loginUser){
      navDom.innerText = '登录';
      navDom.href = 'login.html';
    }else{
      navDom.innerText = '我的';
      navDom.href = 'index5.html';
    }
  }
});
