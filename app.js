function renderTable(container, columns, rows, title) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  columns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col === "" ? "Mua/Thuê" : col;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  const tbody = document.createElement("tbody");

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell, index) => {
      const td = document.createElement("td");
      
      // Nếu là cột thứ 3 (index 2) và trống, tạo nút
      if (index === 2 && cell === "") {
        const btn = document.createElement("button");
        btn.className = "btn-thue";
        
        // KIỂM TRA NẾU LÀ VPS THÌ HIỆN CHỮ MUA VÀ DẪN LINK
        if (title.trim() === "VPS") {
          btn.textContent = "Mua";
          btn.onclick = function() {
            window.open("https://cloudvpsviet.com", "_blank");
          };
        } else {
          // CÒN LẠI HIỆN CHỮ THUÊ VÀ MỞ QR
          btn.textContent = "Thuê";
          btn.onclick = openModal;
        }
        
        td.appendChild(btn);
      } else {
        td.innerHTML = cell;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(table);
}

function createCard(title, columns, rows, note) {
  const card = document.createElement("div");
  card.className = "card";

  const h = document.createElement("h3");
  h.textContent = title;

  const underline = document.createElement("div");
  underline.className = "underline";

  card.appendChild(h);
  card.appendChild(underline);

  // Truyền thêm title vào hàm renderTable
  renderTable(card, columns, rows, title);

  if (note) {
    const noteBox = document.createElement("div");
    noteBox.className = "note";
    note.forEach((n) => {
      const p = document.createElement("div");
      p.textContent = "• " + n;
      noteBox.appendChild(p);
    });
    card.appendChild(noteBox);
  }

  return card;
}

/* DATA - Giữ nguyên data của đại ca */
const pricesData = [
    {
    title: "Nhiệm Vụ",
    columns: ["Nhiệm vụ", "Giá tiền", ""],
    rows: [
      ["ĐHVT", "20.000", ""],
      ["Trung Uý Trắng", "10.000", ""],
      ["Bất Khả Thi", "20.000", ""],
      ["Kuku - Mập Đầu Đinh - Rambo", "20.000", ""],
      ["Tiểu Đội Sát Thủ", "30.000", ""],
      ["Fide 1, 2, 3", "30.000", ""],
      ["Android 19, 20", "30.000", ""],
      ["Sân Sau Siêu Thị", "20.000", ""],
      ["Pic - Poc - KingKong", "30.000", ""],
      ["XBH 1, 2, XHT", "40.000", ""],
      ["Pem Quái Xên 1, 3 , 5 , 8", "10.000", ""],
    ],
    note : ["Thuê nhiều nhiệm vụ hoặc nhiều acc sẽ được giảm giá"]
  },
  {
    title: "Treo Đệ Tử Tất Cả Sever",
    columns: ["Sức Mạnh", "Giá tiền",""],
    rows: [
      ["Sơ sinh - 1tr5", "10.000", ""],
      ["1tr5 - 149tr", "20.000", ""],
      ["150tr - 1ty499", "30.000", ""],
      ["1ty5 - 19ty99", "35.000", ""],
      ["20ty - 40ty", "35.000", ""],
      ["40ty - 50ty", "50.000", ""],
      ["50ty - 60ty", "50.000", ""],
      ["60ty - 70ty", "70.000", ""],
      ["70ty - 80ty", "100.000", ""],
      ["80ty - 90ty", "100.000", ""],
      ["Combo 40ty - 70ty", "150.000", ""],
    ],
    note: ["Chuẩn bị đồ trước khi treo"],
  },
  {
    title: "Dịch Vụ Khác",
    columns: ["Tên dịch vụ", "Giá tiền",""],
    rows: [
      ["Săn đệ", "20.000", ""],
      ["Giảm 1 tỷ sức mạnh sư phụ", "3.000", ""],
      ["Tạo bang 14 người thường", "20.000", ""],
      ["Tạo bang 14 người (đao/gậy)", "50.000", ""],
      ["Up cải trang Yardrat","50.000", ""],
      ["Treo buff đậu 7 ngày","15.000", ""],
      ["Treo buff đậu 30 ngày","30.000", ""],
      ["Up thức ăn x5 x99","30.000", ""],
      ["Treo Giáp Luyện Tập 1000 phút","3.000'", ""],
    ],
  },
  {
    title: "Up Set Kích Hoạt",
    columns: ["Gói", "Giá tiền",""],
    rows: [
      ["Up TDLT (2130 ngọc)", "70.000", ""],
      ["Up TDLT + Cỏ (20k ngọc)", "70.000", ""],
    ],
    note : ["Up full tất cả ib mình tư vấn cho dễ"]
  },
  {
    title: " Proxy",
    columns: ["Dịch vụ", "Giá", ""],
    rows: [
      ["Proxy 1 ngày","1.500", ""],
      ["Proxy 7 ngày","7.000", ""],
      ["Proxy 30 ngày", "25.000", ""],
    ],
    note : ["Proxy bao mượt"]
  },
  {
    title: "VPS ",
    columns: ["Đơn vị cung cấp", "Giá", ""],
    rows: [
      ["Cloudvpsviet.com", "Xem web", ""],
    ],
    note : ["VPS bao uy tín"]
  },
];

/* MODAL LOGIC */
const modal = document.getElementById("qr-modal");
const closeBtn = document.querySelector(".close-btn");

function openModal() {
    modal.style.display = "block";
}

if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* RENDER */
const pricesGrid = document.getElementById("prices-grid");
if (pricesGrid) {
    pricesData.forEach((item) => {
      pricesGrid.appendChild(
        createCard(item.title, item.columns, item.rows, item.note),
      );
    });
}

function searchService() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    let firstMatch = null; // Lưu lại dòng đầu tiên tìm thấy để cuộn trang
    
    // Xóa mọi highlight cũ và border đỏ
    document.querySelectorAll('.highlight-found').forEach(el => {
        el.classList.remove('highlight-found');
    });
    cards.forEach(card => card.style.border = "1px solid var(--blue-border)");

    if (input === "") return;

    cards.forEach(card => {
        const rows = card.querySelectorAll('tbody tr');
        let foundInCard = false;

        rows.forEach(row => {
            if (row.innerText.toLowerCase().includes(input)) {
                row.classList.add('highlight-found');
                foundInCard = true;
                if (!firstMatch) firstMatch = row; // Gán dòng đầu tiên tìm thấy
            }
        });

        if (foundInCard) {
            card.style.border = "2px solid var(--highlight-color)";
        }
    });

    // TỰ CUỘN TRANG ĐẾN DÒNG ĐỎ ĐẦU TIÊN
    if (firstMatch) {
        firstMatch.scrollIntoView({
            behavior: "smooth", // Cuộn mượt mà
            block: "center"     // Đưa dòng đó ra giữa màn hình
        });
    }
}