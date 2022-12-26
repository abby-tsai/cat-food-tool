/* 共用參數 */
/* ========================== */

// 貓咪狀態
let catStatus = ""
// 狀態對應的卡路里
let kg_kcal = 0


// 貓咪體重＆貓咪狀態選項
let catWeight_value = document.querySelector("#catWeight")
let catStatuses = document.querySelectorAll(".catStatus-box input[type=radio]")


// 尚未完成表單
let card_notFinish = document.querySelector("#card_notFinish")
// 計算結果表單
let card_result = document.querySelector("#card_result")
// 尚未完成表單 - 勾選每日分配
let card_notFinish_selectDaliyFeed = document.querySelector("#card_notFinish_selectDaliyFeed")
// 計算結果表單 - 勾選每日分配
let card_result_selectDaliyFeed = document.querySelector("#card_result_selectDaliyFeed")
// 計算已完成表單
let mathDoneBoxes = document.querySelectorAll(".mathDone")


// 罐頭重量 ＆ 營養成分％
let wetGram = document.querySelector("#wetGram")
let wet_proteinPercent = document.querySelector("#wet_proteinPercent")
let wet_fatPercent = document.querySelector("#wet_fatPercent")
let wet_fiberPercent = document.querySelector("#wet_fiberPercent")
let wet_ashPercent = document.querySelector("#wet_ashPercent")
let wet_waterPercent = document.querySelector("#wet_waterPercent")


// 乾糧重量 ＆ 營養成分％
let dry_1Kg_Kcal = document.querySelector("#dry_1Kg_Kcal")
let dry_proteinPercent = document.querySelector("#dry_proteinPercent")
let dry_fatPercent = document.querySelector("#dry_fatPercent")
let dry_fiberPercent = document.querySelector("#dry_fiberPercent")
let dry_ashPercent = document.querySelector("#dry_ashPercent")
let dry_waterPercent = document.querySelector("#dry_waterPercent")


// 清除所有表單數值
let cleanAllValue_btn = document.querySelector("#cleanAllValue_btn")


/* 共用功能 - 貓咪卡路里變數 */
/* ========================== */
function check_catStatuses(catStatus) {
  switch (catStatus) {
    case "10週大":
      kg_kcal = 248;
      break;
    case "20週大":
      kg_kcal = 130;
      break;
    case "30週大":
      kg_kcal = 99;
      break;
    case "40週大":
      kg_kcal = 80;
      break;
    case "活動力低(未結紮)":
      kg_kcal = 40;
      break;
    case "活動力低(已結紮)":
      kg_kcal = 40 * 0.7;
      break;
    case "活動力高(未結紮)":
      kg_kcal = 55;
      break;
    case "活動力高(已結紮)":
      kg_kcal = 55 * 0.7;
      break;
    case "懷孕期":
      kg_kcal = 99;
      break;
    case "哺乳期":
      kg_kcal = 221;
      break;
  }
  return kg_kcal;
}


/* 共用功能 - 計算各營養的乾物比 */
/* ========================== */

// 計算蛋白質乾物比 = 蛋白質% / (100 - 水分%) * 100
function math_protein_solid(protein, water) {
  protein_solid = protein / (100 - water) * 100;
  return protein_solid
}

// 計算脂肪乾物比 = 脂肪% / (100 - 水分%) * 100
function math_fat_solid(fat, water) {
  fat_solid = fat / (100 - water) * 100;
  return fat_solid
}

// 計算纖維乾物比 = 纖維% / (100 - 水分%) * 100
function math_fiber_solid(fiber, water) {
  fiber_solid = fiber / (100 - water) * 100;
  return fiber_solid
}

// 計算碳水化合物乾物比 = 碳水化合物% / (100 - 水分%) * 100
function math_carbohydrate_solid(protein, fat, fiber, ash, water) {
  // 碳水化合物％ = (100 - 蛋白質％ - 脂肪％ - 纖維％ - 灰份％ - 水分％)
  carbohydrate_p = (100 - protein - fat - fiber - ash - water);
  // 碳水化合物乾物比
  carbohydrate_solid = carbohydrate_p / (100 - water) * 100;
  return carbohydrate_solid
}


/* 共用功能 - 我的收藏 */
/* ========================== */

// 開關 - "我的收藏"區塊
let open_mySaveButton = document.querySelector("#open_mySaveButton")
let close_mySaveButton = document.querySelector("#close_mySaveButton")
let mySaveBox = document.querySelector("#mySaveBox")
let no_saveBoxArea = document.querySelector("#no_saveBoxArea")

if (open_mySaveButton) {
  open_mySaveButton.addEventListener("click", function () {
    mySaveBox.classList.add("right-0");
    mySaveBox.classList.remove("-right-full");
    no_saveBoxArea.classList.remove("pointer-events-none");
  })
}

if (close_mySaveButton) {
  close_mySaveButton.addEventListener("click", function () {
    mySaveBox.classList.add("-right-full");
    mySaveBox.classList.remove("right-0");
    no_saveBoxArea.classList.add("pointer-events-none");
  })
}


window.addEventListener("click", function (e) {
  if (e.target.id === "no_saveBoxArea") {
    // 如果滑鼠點到 no_saveBoxArea 區塊，就關閉“我的收藏”
    mySaveBox.classList.add("-right-full");
    mySaveBox.classList.remove("right-0");
    no_saveBoxArea.classList.add("pointer-events-none");
  }
})


/* 共用功能 - “加入收藏”按鈕 */
/* ========================== */

// “加入收藏”按鈕
let save_btn = document.querySelector("#save_btn")
let saveLightBox = document.querySelector("#saveLightBox")
let saveName = document.querySelector("#saveName")
let saveObject = JSON.parse(localStorage.getItem('saveObject')) || [];

if (saveLightBox != null) {
  // 如果頁面有 加入收藏 lightbox 才執行以下
  let save_sbumit_btn = saveLightBox.querySelector(".sbumit_btn")
  let save_cancel_btn = saveLightBox.querySelector(".cancel_btn")
  if (save_btn) {
    save_btn.addEventListener("click", open_saveLightBox)
  }
  if (save_cancel_btn) {
    save_cancel_btn.addEventListener("click", close_saveLightBox)
  }

  // 抓取當前頁面的分類名稱，方便加入收藏直接預設名稱
  let categoryName = document.querySelector("#card_result .header .title").dataset.cata
  let categoryText = saveLightBox.querySelector(".category-text")
  categoryText.textContent = categoryName

  // “加入”按鈕
  if (save_sbumit_btn) {
    save_sbumit_btn.addEventListener("click", addTo_localStorage)
  }
};

addTo_saveBox(saveObject)

function addTo_saveBox(saveObj) {
  let item = "";

  saveObj.forEach((e, i) => {
    item +=
      `
      <div class="card card-style-4 w-full px-7 py-5 border-b border-solid border-gray-300">
        <div class="header">
          <p class="title"><span class="color-darkergreen">${e.name}</span> ${e.categoryName}</p>
          <button type="button" class="more moreButton"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          <nav class="more-nav hidden" status="0">
            <ul>
              <li>
                <button type="button" class="btn renameButton" data-num="${i}">重新命名<i class="fa-solid fa-pencil pl-2 text-gray-400"></i></button>
              </li>
              <li>
                <button type="button" class="btn deleteButton" data-num="${i}">刪除<i class="fa-solid fa-trash-can pl-2 text-gray-400"></i></button>
              </li>
            </ul>
          </nav>
        </div>
        <div class="body">
          ${e.categoryName === "的一日所需營養" ?
        `<div class="flex flex-row space-x-4">
            <div class="basis-1/2 mb-4">
              <label class="text-sm font-medium block">熱量：</label>
                <div class="input-style-3">
                  <input type="text" readonly value="${e.daliyKcalValue}">
                  <span class="unit">kcal</span>
                </div>
              </div>
              <div class="basis-1/2 mb-4">
              <label class="text-sm font-medium block">水分：</label>
              <div class="input-style-3">
                <input type="text" readonly value="${e.daliyWaterValue}">
                <span class="unit">ml</span>
              </div>
              </div>
            </div>
            <div class="flex flex-row space-x-4">
              <div class="basis-1/2 mb-4">
                <label class="text-sm font-medium block">蛋白質：</label>
                <div class="input-style-3">
                  <input type="text" readonly value="${e.daliyProteinValue}">
                  <span class="unit">g</span>
                </div>
              </div>
              <div class="basis-1/2 mb-4">
                <label class="text-sm font-medium block">脂肪：</label>
                <div class="input-style-3">
                  <input type="text" readonly value="${e.daliyFatValue}">
                  <span class="unit">g</span>
                </div>
              </div>
            </div>` :
        ``}
          ${e.categoryName === "貓罐乾物比" ? `${e.wet_solid_block}` : ``}
          ${e.categoryName === "貓糧乾物比" ? `${e.dry_solid_block}` : ``}
          ${e.categoryName === "全濕食分配" ? `${e.full_wet_block}` : ``}
          ${e.categoryName === "全乾食分配" ? `${e.full_dry_block}` : ``}
          ${e.categoryName === "半濕食分配" ? `${e.half_wetdry_block}` : ``}
        </div>
        <p class="text-xs text-gray-400 text-right pt-2">${e.time}</p>
      </div>
      `;
  })
  document.querySelector("#saveItems").innerHTML = item;

  // 放在這裡是因為，當“加入收藏”的清單改變之後，可以抓到剩下的button
  document.querySelectorAll(".moreButton").forEach(dropDownFunc);
  document.querySelectorAll(".deleteButton").forEach(deleteFunc);
  document.querySelectorAll(".renameButton").forEach(renameFunc);
}

// 將得到的數據，儲存到localStorage
function addTo_localStorage() {
  let date = new Date();
  let obj = {

    // 每日所需營養結果
    daliyKcalValue: document.querySelector("#daliyKcal") ? document.querySelector("#daliyKcal").value : "",
    daliyProteinValue: document.querySelector("#daliyProtein") ? document.querySelector("#daliyProtein").value : "",
    daliyFatValue: document.querySelector("#daliyFat") ? document.querySelector("#daliyFat").value : "",
    daliyWaterValue: document.querySelector("#daliyWater") ? document.querySelector("#daliyWater").value : "",

    // 貓罐乾物比分析結果
    wet_solid_block: document.querySelector(".wet_solid_block") ? document.querySelector(".wet_solid_block .beSave_block").innerHTML : "",

    // 貓糧乾物比分析結果
    dry_solid_block: document.querySelector(".dry_solid_block") ? document.querySelector(".dry_solid_block .beSave_block").innerHTML : "",

    // 半濕食的分配結果
    half_wetdry_block: document.querySelector(".half_wetdry_block") ? document.querySelector(".half_wetdry_block .beSave_block").innerHTML : "",

    // 全濕食的分配結果
    full_wet_block: document.querySelector(".full_wet_block") ? document.querySelector(".full_wet_block .beSave_block").innerHTML : "",

    // 全乾食的分配結果
    full_dry_block: document.querySelector(".full_dry_block") ? document.querySelector(".full_dry_block .beSave_block").innerHTML : "",

    name: saveName.value,
    categoryName: document.querySelector("#card_result .header .title").dataset.cata,
    time: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  }
  saveObject.unshift(obj)
  localStorage.setItem("saveObject", JSON.stringify(saveObject))
  addTo_saveBox(saveObject)
  saveName.value = "";

  // 關閉 加入收藏 lightbox
  close_saveLightBox();

  // 讓“我的收藏”欄位滑入
  mySaveBox.classList.add("right-0");
  mySaveBox.classList.remove("-right-full");
  no_saveBoxArea.classList.remove("pointer-events-none");

  // 所有欄位回到初始
  clean_allValue()

  // 如果是在“每日營養”頁面
  if (editDailyMath_btn) {
    edit_daily()
  }

  // 如果是在“貓罐乾物比分析”頁面
  if (editsolidWetMath_btn) {
    edit_solidWeMath()
  }

  // 如果是在“貓糧乾物比分析”頁面
  if (editsolidDryMath_btn) {
    editsolidDryMath()
  }

  // 如果是在“半濕食的分配析”頁面
  if (halfWetDryPrev_fillIn_btn) {
    fillIn_block()
    select_block()
  }

  // 如果是在“全濕食的分配”頁面
  if (editFullWetMath_btn) {
    edit_fullWetMath()
  }

  // 如果是在“全乾食的分配”頁面
  if (editFullDryMath_btn) {
    editFullDryMath()
  }


}

function open_saveLightBox() {
  // 開啟 加入收藏 lightbox
  saveLightBox.classList.add("block")
  saveLightBox.classList.remove("hidden")
  // 名稱欄位 focus
  saveName.focus();
}

function close_saveLightBox() {
  // 關閉 加入收藏 lightbox
  saveLightBox.classList.add("hidden")
  saveLightBox.classList.remove("block")
}


/* 共用功能 - “加入收藏”按鈕的下拉選單 */
/* ========================== */

// 下拉開關設定
// document.querySelectorAll(".moreButton").forEach(dropDownFunc);

function dropDownFunc(btn) {
  if (btn.classList.contains("moreButton") === true) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (this.nextElementSibling.classList.contains("hidden") === false) {
        // 如果當前的nav是開啟狀態，就讓當前nav隱藏
        this.nextElementSibling.classList.add("hidden");
      } else {
        // 反之，如果當前的nav還沒開啟，就關掉其他的nav，並開啟當前的nav
        closeDropdown(); // 這個要在前面
        this.nextElementSibling.classList.remove("hidden");
      }
    });
  }
}

// 當滑鼠點擊 .moreButton 以外的地方，就關掉nav
window.addEventListener("click", function (e) {
  if (e.target.closest(".moreButton") === null) {
    closeDropdown();
  }
});

// 當滑鼠不在nav，就關掉開啟的nav
document.querySelectorAll(".more-nav").forEach(function (nav) {
  nav.onmouseleave = closeDropdown;
});

// 關掉所有開啟的nav
function closeDropdown() {
  document.querySelectorAll(".more-nav").forEach(function (nav) {
    nav.classList.add("hidden");
  });
}

// 下拉 - 重新命名
let renameLightBox = document.querySelector("#renameLightBox")
let old_saveName = renameLightBox.querySelector("#old_saveName")
let rename_categoryText = renameLightBox.querySelector(".category-text")
let rename_submit_btn = renameLightBox.querySelector(".submit_btn")
let rename_cancel_btn = renameLightBox.querySelector(".cancel_btn")

// 點擊 重新命名
function renameFunc(btn) {
  let isactive = false;
  btn.addEventListener("click", function (e) {
    isactive = true;
    if (isactive) {

      addTo_saveBox(saveObject);

      rename_dataNumber = e.target.dataset.num;

      // 開啟 加入收藏 lightbox
      renameLightBox.classList.add("block")
      renameLightBox.classList.remove("hidden")
      // 名稱欄位 focus
      old_saveName.focus();
      // 名稱欄位為原本的名稱
      old_saveName.value = saveObject[rename_dataNumber].name;

      // 關閉 "我的收藏"區塊
      mySaveBox.classList.add("-right-full");
      mySaveBox.classList.remove("right-0");
      no_saveBoxArea.classList.add("pointer-events-none");

      // 抓取當前頁面的分類名稱，方便加入收藏直接預設名稱
      let categoryName = saveObject[rename_dataNumber].categoryName;
      rename_categoryText.textContent = categoryName;

      // addEventListener "input" 是在 input 的 value 被更改時觸發！
      old_saveName.addEventListener("input", function () {
        saveObject[rename_dataNumber].name = old_saveName.value;
      })

    }
  })
}

// 確認 重新命名
rename_submit_btn.addEventListener("click", function () {

  // 上傳到localStorage
  localStorage.setItem("saveObject", JSON.stringify(saveObject));
  // 渲染到“我的收藏”
  addTo_saveBox(saveObject);

  // 關閉lightbox
  renameLightBox.classList.add("hidden")
  renameLightBox.classList.remove("block")

  // 滑入“我的收藏”區塊
  mySaveBox.classList.add("right-0");
  mySaveBox.classList.remove("-right-full");
  no_saveBoxArea.classList.remove("pointer-events-none");
})


// 取消 重新命名
rename_cancel_btn.addEventListener("click", function () {

  // 關閉lightbox
  renameLightBox.classList.add("hidden")
  renameLightBox.classList.remove("block")

  // 滑入“我的收藏”區塊
  mySaveBox.classList.add("right-0");
  mySaveBox.classList.remove("-right-full");
  no_saveBoxArea.classList.remove("pointer-events-none");
})



// 下拉 - 刪除
// document.querySelectorAll(".deleteButton").forEach(deleteFunc);

function deleteFunc(btn) {
  btn.addEventListener("click", function (e) {

    addTo_saveBox(saveObject);

    let dataNumber = e.target.dataset.num;
    saveObject.splice(dataNumber, 1);
    localStorage.setItem("saveObject", JSON.stringify(saveObject))
    addTo_saveBox(saveObject)
  })
}

/* 共用功能 - “清除”按鈕 */
/* ========================== */
if (cleanAllValue_btn) {
  cleanAllValue_btn.addEventListener("click", clean_allValue)
}

// 清除所有欄位的值
function clean_allValue() {

  if (wetGram) {
    wetGram.value = ""
    wet_proteinPercent.value = ""
    wet_fatPercent.value = ""
    wet_fiberPercent.value = ""
    wet_ashPercent.value = ""
    wet_waterPercent.value = ""
  }

  if (dry_1Kg_Kcal) {
    dry_1Kg_Kcal.value = ""
    dry_proteinPercent.value = ""
    dry_fatPercent.value = ""
    dry_fiberPercent.value = ""
    dry_ashPercent.value = ""
    dry_waterPercent.value = ""
  }

  if (catWeight_value) {
    catWeight_value.value = ""
  }

  if (catStatuses) {
    catStatuses.forEach(item => {
      item.checked = false
    })
  }

  // 讓第一個欄位 focus
  // ==========
}


/* 共用功能 - 點擊“開始計算”按鈕，會滑到計算結果區塊 */
/* ========================== */
function scrollToResult() {
  if (window.innerWidth <= 991) {
    const elem = document.querySelector("#card_result");
    window.scrollTo(0, elem.offsetTop);
  }
}


/* 共用功能 - 點擊“重新計算”按鈕，會滑到填寫區塊 */
/* ========================== */
function scrollToFill() {
  if (window.innerWidth <= 991) {
    const elem = document.querySelector("#card_fill");
    window.scrollTo(0, elem.offsetTop - 100);
  }
}


/* 頁面 - 貓咪一日所需營養 */
/* ========================== */

let DailyMath_btn = document.querySelector("#DailyMath_btn")
let editDailyMath_btn = document.querySelector("#editDailyMath_btn")

// “開始計算”按鈕
if (DailyMath_btn) {
  DailyMath_btn.addEventListener("click", math_daily)
}

function math_daily() {

  scrollToResult()

  // 取得選擇的貓咪狀態，並取得所需卡路里
  for (let i = 0; i < catStatuses.length; i++) {
    if (catStatuses[i].checked) {
      catStatus = catStatuses[i].value;
    }
  }

  if (catWeight_value.value === "") {
    // 如果“貓咪的體重”欄位是空的

    // 提醒卡出現
    document.querySelector(".alert-catWeight").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-catWeight").classList.remove("opacity-0", "h-0");
    catWeight_value.focus();

  } else if (!catStatus) {

    // 如果“貓咪的狀態”欄位是空的
    // 提醒卡出現
    document.querySelector(".alert-catStatus").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.remove("opacity-0", "h-0");
    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");

  } else {

    catWeight_value.value = Number(catWeight_value.value);

    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catStatus").classList.remove("opacity-1", "h-auto");

    // “開始計算”按鈕不能編輯
    DailyMath_btn.disabled = true
    // “貓咪的體重”欄位不能編輯
    catWeight_value.disabled = true
    // “貓咪的狀態”欄位不能編輯
    for (let i = 0; i < catStatuses.length; i++) {
      catStatuses[i].disabled = true
    }
    // 所有計算的box都不能編輯
    for (let i = 0; i < mathDoneBoxes.length; i++) {
      mathDoneBoxes[i].classList.add("opacity-60");
    }

    //  取得貓咪卡路里變數
    check_catStatuses(catStatus);
    // console.log(kg_kcal);

    // 計算每日熱量
    daliyKcal = card_result.querySelector("#daliyKcal");
    daliyKcal.value = (catWeight_value.value * kg_kcal).toFixed(0);

    // 計算每日蛋白質克數
    daliyProtein_min = ((daliyKcal.value * 0.46) / 3.5).toFixed(0);
    daliyProtein_max = ((daliyKcal.value * 0.6) / 3.5).toFixed(0);
    daliyProtein = card_result.querySelector("#daliyProtein");
    daliyProtein.value = `${daliyProtein_min} ~ ${daliyProtein_max}`;

    // 計算每日脂肪克數
    daliyFat_min = ((daliyKcal.value * 0.09) / 8.5).toFixed(0);
    daliyFat_max = ((daliyKcal.value * 0.5) / 8.5).toFixed(0);
    daliyFat = card_result.querySelector("#daliyFat");
    daliyFat.value = `${daliyFat_min} ~ ${daliyFat_max}`;

    // 每日飲水量
    daliyWater_min = (catWeight_value.value * 40).toFixed(0);
    daliyWater_max = (catWeight_value.value * 60).toFixed(0);
    daliyWater = card_result.querySelector("#daliyWater");
    daliyWater.value = `${daliyWater_min} ~ ${daliyWater_max}`;


    // 關閉“請完成表單”
    card_notFinish.classList.add("h-0", "opacity-0", "hidden");
    card_notFinish.classList.remove("flex");
    // 開啟“計算結果”
    card_result.classList.remove("h-0", "opacity-0");
  }

}

// 點擊“重新計算”按鈕
if (editDailyMath_btn) {
  editDailyMath_btn.addEventListener("click", edit_daily)
}

function edit_daily() {

  scrollToFill()

  // “開始計算”按鈕可以編輯
  DailyMath_btn.disabled = false
  // “貓咪的體重”欄位可以編輯
  catWeight_value.disabled = false
  // “貓咪的狀態”欄位可以編輯
  for (let i = 0; i < catStatuses.length; i++) {
    catStatuses[i].disabled = false
  }
  // 所有計算的box都可以編輯
  for (let i = 0; i < mathDoneBoxes.length; i++) {
    mathDoneBoxes[i].classList.remove("opacity-60");
  }

  // 開啟“請完成表單”
  card_notFinish.classList.remove("h-0", "opacity-0", "hidden");
  card_notFinish.classList.add("flex");
  // 關閉“計算結果”
  card_result.classList.add("h-0", "opacity-0", "transition-none");
  card_result.classList.remove("transition-all");
}



/* 頁面 - 貓罐乾物比分析 */
/* ========================== */

let solidWetMath_btn = document.querySelector("#solidWetMath_btn")
let editsolidWetMath_btn = document.querySelector("#editsolidWetMath_btn")

// “開始計算”按鈕
if (solidWetMath_btn) {
  solidWetMath_btn.addEventListener("click", math_solidWet)
}

function math_solidWet() {

  scrollToResult()

  let wetGram_value = wetGram.value
  let wet_waterPercent_value = wet_waterPercent.value
  let wet_ashPercent_value = wet_ashPercent.value
  let wet_proteinPercent_value = wet_proteinPercent.value
  let wet_fatPercent_value = wet_fatPercent.value
  let wet_fiberPercent_value = wet_fiberPercent.value

  if (wetGram_value === "" || wet_waterPercent_value === "" || wet_ashPercent_value === "" || wet_proteinPercent_value === "" || wet_fatPercent_value === "" || wet_fiberPercent_value === "") {
    // 如果“罐頭營養成分”欄位其中一個是空的
    // 提醒卡出現
    document.querySelector(".alert-wetElement").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-wetElement").classList.remove("opacity-0", "h-0");
  } else {

    // 提醒卡隱藏
    document.querySelector(".alert-wetElement").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-wetElement").classList.remove("opacity-1", "h-auto");

    // 把值變成數字
    wetGram_value = Number(wetGram_value)
    wet_waterPercent_value = Number(wet_waterPercent_value)
    wet_ashPercent_value = Number(wet_ashPercent_value)
    wet_proteinPercent_value = Number(wet_proteinPercent_value)
    wet_fatPercent_value = Number(wet_fatPercent_value)
    wet_fiberPercent_value = Number(wet_fiberPercent_value)


    // “開始計算”按鈕不能編輯
    solidWetMath_btn.disabled = true
    // “清除”按鈕不能編輯
    cleanAllValue_btn.disabled = true
    // 所有欄位不能編輯
    wetGram.disabled = true
    wet_proteinPercent.disabled = true
    wet_fatPercent.disabled = true
    wet_fiberPercent.disabled = true
    wet_ashPercent.disabled = true
    wet_waterPercent.disabled = true
    // 所有計算的box都不能編輯
    for (let i = 0; i < mathDoneBoxes.length; i++) {
      mathDoneBoxes[i].classList.add("opacity-60");
    }

    // 計算蛋白質乾物比
    math_protein_solid(wet_proteinPercent_value, wet_waterPercent_value)
    // 計算脂肪乾物比
    math_fat_solid(wet_fatPercent_value, wet_waterPercent_value)
    // 計算纖維乾物比
    math_fiber_solid(wet_fiberPercent_value, wet_waterPercent_value)
    // 計算碳水化合物乾物比
    math_carbohydrate_solid(wet_proteinPercent_value, wet_fatPercent_value, wet_fiberPercent_value, wet_ashPercent_value, wet_waterPercent_value)

    // 把計算結果 乾物比數值 渲染上去
    let wet_solid_block = document.querySelector(".wet_solid_block")
    wet_solid_block.querySelector(".protein_solid_result").textContent = `${(protein_solid).toFixed(1)}%`
    wet_solid_block.querySelector(".fat_solid_result").textContent = `${(fat_solid).toFixed(1)}%`
    wet_solid_block.querySelector(".fiber_solid_result").textContent = `${(fiber_solid).toFixed(1)}%`
    wet_solid_block.querySelector(".carbohydrate_solid_result").textContent = `${(carbohydrate_solid).toFixed(1)}%`;

    let warning_txt_box = wet_solid_block.querySelector(".warning_txt_box");
    let warning_txt = [];

    // 判斷數值是否過多過少

    // 蛋白質
    if (protein_solid >= 45) {
      wet_solid_block.querySelector(".protein_solid_explain").textContent = "符合";
      if (wet_solid_block.querySelector(".protein_solid_explain").textContent === "符合") {
        wet_solid_block.querySelector(".protein_solid_explain").classList.add("color-green")
        wet_solid_block.querySelector(".protein_solid_explain").classList.remove("color-blue")
      }
    } else if (protein_solid < 45) {
      wet_solid_block.querySelector(".protein_solid_explain").textContent = "過少";
      if (wet_solid_block.querySelector(".protein_solid_explain").textContent === "過少") {
        wet_solid_block.querySelector(".protein_solid_explain").classList.add("color-blue")
        wet_solid_block.querySelector(".protein_solid_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 蛋白質不在參考值範圍。</p>`);
    }

    // 脂肪
    if (fat_solid >= 45) {
      wet_solid_block.querySelector(".fat_solid_explain").textContent = "過多";
      if (wet_solid_block.querySelector(".fat_solid_explain").textContent === "過多") {
        wet_solid_block.querySelector(".fat_solid_explain").classList.add("color-red")
        wet_solid_block.querySelector(".fat_solid_explain").classList.remove("color-blue")
        wet_solid_block.querySelector(".fat_solid_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 脂肪不在參考值範圍。</p>`);
    } else if (fat_solid >= 25 && fat_solid < 45) {
      wet_solid_block.querySelector(".fat_solid_explain").textContent = "符合";
      if (wet_solid_block.querySelector(".fat_solid_explain").textContent === "符合") {
        wet_solid_block.querySelector(".fat_solid_explain").classList.add("color-green")
        wet_solid_block.querySelector(".fat_solid_explain").classList.remove("color-blue")
        wet_solid_block.querySelector(".fat_solid_explain").classList.remove("color-red")
      }
    } else if (fat_solid < 25) {
      wet_solid_block.querySelector(".fat_solid_explain").textContent = "過少";
      if (wet_solid_block.querySelector(".fat_solid_explain").textContent === "過少") {
        wet_solid_block.querySelector(".fat_solid_explain").classList.add("color-blue")
        wet_solid_block.querySelector(".fat_solid_explain").classList.remove("color-green")
        wet_solid_block.querySelector(".fat_solid_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 脂肪不在參考值範圍。</p>`);
    }

    // 碳水化合物
    if (carbohydrate_solid >= 10) {
      wet_solid_block.querySelector(".carbohydrate_solid_explain").textContent = "過多";
      if (wet_solid_block.querySelector(".carbohydrate_solid_explain").textContent === "過多") {
        wet_solid_block.querySelector(".carbohydrate_solid_explain").classList.add("color-red")
        wet_solid_block.querySelector(".carbohydrate_solid_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 碳水化合物不在參考值範圍。</p>`);
    } else if (carbohydrate_solid < 10) {
      wet_solid_block.querySelector(".carbohydrate_solid_explain").textContent = "符合";
      if (wet_solid_block.querySelector(".carbohydrate_solid_explain").textContent === "符合") {
        wet_solid_block.querySelector(".carbohydrate_solid_explain").classList.add("color-green")
        wet_solid_block.querySelector(".carbohydrate_solid_explain").classList.remove("color-red")
      }
    }

    // 纖維
    if (fiber_solid >= 5) {
      wet_solid_block.querySelector(".fiber_solid_explain").textContent = "過多";
      if (wet_solid_block.querySelector(".fiber_solid_explain").textContent === "過多") {
        wet_solid_block.querySelector(".fiber_solid_explain").classList.add("color-red")
        wet_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-blue")
        wet_solid_block.querySelector(".fiber_solid_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 纖維不在參考值範圍。</p>`);
    } else if (fiber_solid >= 1 && fiber_solid < 5) {
      wet_solid_block.querySelector(".fiber_solid_explain").textContent = "符合";
      if (wet_solid_block.querySelector(".fiber_solid_explain").textContent === "符合") {
        wet_solid_block.querySelector(".fiber_solid_explain").classList.add("color-green")
        wet_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-blue")
        wet_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-red")
      }
    } else if (fiber_solid < 1) {
      wet_solid_block.querySelector(".fiber_solid_explain").textContent = "過少";
      if (wet_solid_block.querySelector(".fiber_solid_explain").textContent === "過少") {
        wet_solid_block.querySelector(".fiber_solid_explain").classList.add("color-blue")
        wet_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-green")
        wet_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 纖維不在參考值範圍。</p>`);
    }

    warning_txt_box.innerHTML = warning_txt.join('');
    // console.log(warning_txt);


    // 關閉“請完成表單”
    card_notFinish.classList.add("h-0", "opacity-0", "hidden");
    card_notFinish.classList.remove("flex");
    // 開啟“計算結果”
    card_result.classList.remove("h-0", "opacity-0");
  }

}

// “重新計算”按鈕
if (editsolidWetMath_btn) {
  editsolidWetMath_btn.addEventListener("click", edit_solidWeMath)
}

function edit_solidWeMath() {

  scrollToFill()

  // “開始計算”按鈕可以編輯
  solidWetMath_btn.disabled = false
  // “清除”按鈕可以編輯
  cleanAllValue_btn.disabled = false
  // 所有欄位可以編輯
  wetGram.disabled = false
  wet_proteinPercent.disabled = false
  wet_fatPercent.disabled = false
  wet_fiberPercent.disabled = false
  wet_ashPercent.disabled = false
  wet_waterPercent.disabled = false
  // 所有計算的box都可以編輯
  for (let i = 0; i < mathDoneBoxes.length; i++) {
    mathDoneBoxes[i].classList.remove("opacity-60");
  }

  // 開啟“請完成表單”
  card_notFinish.classList.remove("h-0", "opacity-0", "hidden");
  card_notFinish.classList.add("flex");
  // 關閉“計算結果”
  card_result.classList.add("h-0", "opacity-0", "transition-none");
  card_result.classList.remove("transition-all");
}



/* 頁面 - 貓糧乾物比分析 */
/* ========================== */

let solidDryMath_btn = document.querySelector("#solidDryMath_btn")
let editsolidDryMath_btn = document.querySelector("#editsolidDryMath_btn")

// “開始計算”按鈕
if (solidDryMath_btn) {
  solidDryMath_btn.addEventListener("click", math_solidDry)
}

function math_solidDry() {

  scrollToResult()

  let dry_1Kg_Kcal_value = dry_1Kg_Kcal.value
  let dry_waterPercent_value = dry_waterPercent.value
  let dry_ashPercent_value = dry_ashPercent.value
  let dry_proteinPercent_value = dry_proteinPercent.value
  let dry_fatPercent_value = dry_fatPercent.value
  let dry_fiberPercent_value = dry_fiberPercent.value

  if (dry_1Kg_Kcal_value === "" || dry_waterPercent_value === "" || dry_ashPercent_value === "" || dry_proteinPercent_value === "" || dry_fatPercent_value === "" || dry_fiberPercent_value === "") {
    // 如果“罐頭營養成分”欄位其中一個是空的
    // 提醒卡出現
    document.querySelector(".alert-dryElement").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-dryElement").classList.remove("opacity-0", "h-0");
  } else {

    // 提醒卡隱藏
    document.querySelector(".alert-dryElement").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-dryElement").classList.remove("opacity-1", "h-auto");

    // 把值變成數字
    dry_1Kg_Kcal_value = Number(dry_1Kg_Kcal_value)
    dry_waterPercent_value = Number(dry_waterPercent_value)
    dry_ashPercent_value = Number(dry_ashPercent_value)
    dry_proteinPercent_value = Number(dry_proteinPercent_value)
    dry_fatPercent_value = Number(dry_fatPercent_value)
    dry_fiberPercent_value = Number(dry_fiberPercent_value)

    // “開始計算”按鈕不能編輯
    solidDryMath_btn.disabled = true
    // “清除”按鈕不能編輯
    cleanAllValue_btn.disabled = true
    // 所有欄位不能編輯
    dry_1Kg_Kcal.disabled = true
    dry_proteinPercent.disabled = true
    dry_fatPercent.disabled = true
    dry_fiberPercent.disabled = true
    dry_ashPercent.disabled = true
    dry_waterPercent.disabled = true
    // 所有計算的box都不能編輯
    for (let i = 0; i < mathDoneBoxes.length; i++) {
      mathDoneBoxes[i].classList.add("opacity-60");
    }

    // 計算蛋白質乾物比
    math_protein_solid(dry_proteinPercent_value, dry_waterPercent_value)
    // 計算脂肪乾物比
    math_fat_solid(dry_fatPercent_value, dry_waterPercent_value)
    // 計算纖維乾物比
    math_fiber_solid(dry_fiberPercent_value, dry_waterPercent_value)
    // 計算碳水化合物乾物比
    math_carbohydrate_solid(dry_proteinPercent_value, dry_fatPercent_value, dry_fiberPercent_value, dry_ashPercent_value, dry_waterPercent_value)

    // 把計算結果 乾物比數值 渲染上去
    let dry_solid_block = document.querySelector(".dry_solid_block")
    dry_solid_block.querySelector(".protein_solid_result").textContent = `${(protein_solid).toFixed(1)}%`
    dry_solid_block.querySelector(".fat_solid_result").textContent = `${(fat_solid).toFixed(1)}%`
    dry_solid_block.querySelector(".fiber_solid_result").textContent = `${(fiber_solid).toFixed(1)}%`
    dry_solid_block.querySelector(".carbohydrate_solid_result").textContent = `${(carbohydrate_solid).toFixed(1)}%`;

    let warning_txt_box = dry_solid_block.querySelector(".warning_txt_box");
    let warning_txt = [];

    // 判斷數值是否過多過少

    // 蛋白質
    if (protein_solid >= 45) {
      dry_solid_block.querySelector(".protein_solid_explain").textContent = "符合";
      if (dry_solid_block.querySelector(".protein_solid_explain").textContent === "符合") {
        dry_solid_block.querySelector(".protein_solid_explain").classList.add("color-green")
        dry_solid_block.querySelector(".protein_solid_explain").classList.remove("color-blue")
      }
    } else if (protein_solid < 45) {
      dry_solid_block.querySelector(".protein_solid_explain").textContent = "過少";
      if (dry_solid_block.querySelector(".protein_solid_explain").textContent === "過少") {
        dry_solid_block.querySelector(".protein_solid_explain").classList.add("color-blue")
        dry_solid_block.querySelector(".protein_solid_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 蛋白質不在參考值範圍。</p>`);
    }

    // 脂肪
    if (fat_solid >= 45) {
      dry_solid_block.querySelector(".fat_solid_explain").textContent = "過多";
      if (dry_solid_block.querySelector(".fat_solid_explain").textContent === "過多") {
        dry_solid_block.querySelector(".fat_solid_explain").classList.add("color-red")
        dry_solid_block.querySelector(".fat_solid_explain").classList.remove("color-blue")
        dry_solid_block.querySelector(".fat_solid_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 脂肪不在參考值範圍。</p>`);
    } else if (fat_solid >= 25 && fat_solid < 45) {
      dry_solid_block.querySelector(".fat_solid_explain").textContent = "符合";
      if (dry_solid_block.querySelector(".fat_solid_explain").textContent === "符合") {
        dry_solid_block.querySelector(".fat_solid_explain").classList.add("color-green")
        dry_solid_block.querySelector(".fat_solid_explain").classList.remove("color-blue")
        dry_solid_block.querySelector(".fat_solid_explain").classList.remove("color-red")
      }
    } else if (fat_solid < 25) {
      dry_solid_block.querySelector(".fat_solid_explain").textContent = "過少";
      if (dry_solid_block.querySelector(".fat_solid_explain").textContent === "過少") {
        dry_solid_block.querySelector(".fat_solid_explain").classList.add("color-blue")
        dry_solid_block.querySelector(".fat_solid_explain").classList.remove("color-green")
        dry_solid_block.querySelector(".fat_solid_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 脂肪不在參考值範圍。</p>`);
    }

    // 碳水化合物
    if (carbohydrate_solid >= 25) {
      dry_solid_block.querySelector(".carbohydrate_solid_explain").textContent = "過多";
      if (dry_solid_block.querySelector(".carbohydrate_solid_explain").textContent === "過多") {
        dry_solid_block.querySelector(".carbohydrate_solid_explain").classList.add("color-red")
        dry_solid_block.querySelector(".carbohydrate_solid_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 碳水化合物不在參考值範圍。</p>`);
    } else if (carbohydrate_solid < 25) {
      dry_solid_block.querySelector(".carbohydrate_solid_explain").textContent = "符合";
      if (dry_solid_block.querySelector(".carbohydrate_solid_explain").textContent === "符合") {
        dry_solid_block.querySelector(".carbohydrate_solid_explain").classList.add("color-green")
        dry_solid_block.querySelector(".carbohydrate_solid_explain").classList.remove("color-red")
      }
    }

    // 纖維
    if (fiber_solid >= 5) {
      dry_solid_block.querySelector(".fiber_solid_explain").textContent = "過多";
      if (dry_solid_block.querySelector(".fiber_solid_explain").textContent === "過多") {
        dry_solid_block.querySelector(".fiber_solid_explain").classList.add("color-red")
        dry_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-blue")
        dry_solid_block.querySelector(".fiber_solid_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 纖維不在參考值範圍。</p>`);
    } else if (fiber_solid >= 1 && fiber_solid < 5) {
      dry_solid_block.querySelector(".fiber_solid_explain").textContent = "符合";
      if (dry_solid_block.querySelector(".fiber_solid_explain").textContent === "符合") {
        dry_solid_block.querySelector(".fiber_solid_explain").classList.add("color-green")
        dry_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-blue")
        dry_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-red")
      }
    } else if (fiber_solid < 1) {
      dry_solid_block.querySelector(".fiber_solid_explain").textContent = "過少";
      if (dry_solid_block.querySelector(".fiber_solid_explain").textContent === "過少") {
        dry_solid_block.querySelector(".fiber_solid_explain").classList.add("color-blue")
        dry_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-green")
        dry_solid_block.querySelector(".fiber_solid_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 纖維不在參考值範圍。</p>`);
    }

    warning_txt_box.innerHTML = warning_txt.join('');
    // console.log(warning_txt);


    // 關閉“請完成表單”
    card_notFinish.classList.add("h-0", "opacity-0", "hidden");
    card_notFinish.classList.remove("flex");
    // 開啟“計算結果”
    card_result.classList.remove("h-0", "opacity-0");
  }

}


// “重新計算”按鈕
if (editsolidDryMath_btn) {
  editsolidDryMath_btn.addEventListener("click", editsolidDryMath)
}

function editsolidDryMath() {

  scrollToFill()

  // “開始計算”按鈕可以編輯
  solidDryMath_btn.disabled = false
  // “清除”按鈕可以編輯
  cleanAllValue_btn.disabled = false
  // 所有欄位可以編輯
  dry_1Kg_Kcal.disabled = false
  dry_proteinPercent.disabled = false
  dry_fatPercent.disabled = false
  dry_fiberPercent.disabled = false
  dry_ashPercent.disabled = false
  dry_waterPercent.disabled = false
  // 所有計算的box都可以編輯
  for (let i = 0; i < mathDoneBoxes.length; i++) {
    mathDoneBoxes[i].classList.remove("opacity-60");
  }

  // 開啟“請完成表單”
  card_notFinish.classList.remove("h-0", "opacity-0", "hidden");
  card_notFinish.classList.add("flex");
  // 關閉“計算結果”
  card_result.classList.add("h-0", "opacity-0", "transition-none");
  card_result.classList.remove("transition-all");
}



/* 頁面 - 全濕食的分配 */
/* ========================== */

let fullWetMath_btn = document.querySelector("#fullWetMath_btn");
let editFullWetMath_btn = document.querySelector("#editFullWetMath_btn")
let wetItem = document.querySelector("#wet-item")

// “開始計算”按鈕

if (fullWetMath_btn) {
  fullWetMath_btn.addEventListener("click", math_fullWet)
}

function math_fullWet() {

  scrollToResult()

  // 取得選擇的貓咪狀態，並取得所需卡路里
  for (let i = 0; i < catStatuses.length; i++) {
    if (catStatuses[i].checked) {
      catStatus = catStatuses[i].value;
    }
  }

  if (catWeight_value.value === "") {
    // 如果“貓咪的體重”欄位是空的

    // 提醒卡出現
    document.querySelector(".alert-catWeight").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-catWeight").classList.remove("opacity-0", "h-0");
    catWeight_value.focus();

  } else if (!catStatus) {
    // 如果“貓咪的狀態”欄位是空的
    // 提醒卡出現
    document.querySelector(".alert-catStatus").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.remove("opacity-0", "h-0");
    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");

  } else if (wetGram.value === "" || wet_proteinPercent.value === "" || wet_fatPercent.value === "" || wet_fiberPercent.value === "" || wet_ashPercent.value === "" || wet_waterPercent.value === "") {
    // 如果“罐頭的營養成分”欄位其中一個是空的
    // 提醒卡出現
    document.querySelector(".alert-wetElement").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-wetElement").classList.remove("opacity-0", "h-0");
    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catStatus").classList.remove("opacity-1", "h-auto");

  } else {
    // 一罐頭含碳水化合物％
    let wet_carbohydratePercent = (100 - wet_proteinPercent.value - wet_fatPercent.value - wet_fiberPercent.value - wet_waterPercent.value - wet_ashPercent.value).toFixed(1);
    // 罐頭卡路里 ＆ 營養成分 g
    let wetProtein_g = (wetGram.value * wet_proteinPercent.value / 100).toFixed(1);
    let wetFat_g = (wetGram.value * wet_fatPercent.value / 100).toFixed(1);
    let wetWater_g = (wetGram.value * wet_waterPercent.value / 100).toFixed(1);
    let wetCarbohydrate_g = (wetGram.value * wet_carbohydratePercent / 100).toFixed(1);
    let wetKcal = ((wetProtein_g * 3.5) + (wetFat_g * 8.5) + (wetCarbohydrate_g * 3.5)).toFixed(1);

    catWeight_value.value = Number(catWeight_value.value);

    //  取得貓咪卡路里變數
    check_catStatuses(catStatus);
    // console.log(kg_kcal);

    // 貓咪一天所需卡路里
    daliyKcal = (catWeight_value.value * kg_kcal).toFixed(0);

    // 計算貓咪一天需吃幾顆罐頭
    wetItem.textContent = Number((daliyKcal / wetKcal).toFixed(1))

    // 計算每日蛋白質克數
    daliyProtein_min = ((daliyKcal * 0.46) / 3.5).toFixed(0);
    daliyProtein_max = ((daliyKcal * 0.6) / 3.5).toFixed(0);
    daliyProtein = card_result.querySelector("#daliyProtein");
    daliyProtein.textContent = `${daliyProtein_min} ~ ${daliyProtein_max}g`;

    // 計算每日脂肪克數
    daliyFat_min = ((daliyKcal * 0.09) / 8.5).toFixed(0);
    daliyFat_max = ((daliyKcal * 0.5) / 8.5).toFixed(0);
    daliyFat = card_result.querySelector("#daliyFat");
    daliyFat.textContent = `${daliyFat_min} ~ ${daliyFat_max}g`;

    // 每日飲水量
    daliyWater_min = (catWeight_value.value * 40).toFixed(0);
    daliyWater_max = (catWeight_value.value * 60).toFixed(0);
    daliyWater = card_result.querySelector("#daliyWater");
    daliyWater.textContent = `${daliyWater_min} ~ ${daliyWater_max}ml`;

    // 計算罐頭一天吃n顆的 蛋白質 脂肪 水分 g
    let full_wet_block = document.querySelector(".full_wet_block")
    let protein_fullWet_result = full_wet_block.querySelector(".protein_fullWet_result")
    let fat_fullWet_result = full_wet_block.querySelector(".fat_fullWet_result")
    let water_fullWet_result = full_wet_block.querySelector(".water_fullWet_result")

    protein_fullWet_result.textContent = `${(wetProtein_g * wetItem.textContent).toFixed(1)}g`
    fat_fullWet_result.textContent = `${(wetFat_g * wetItem.textContent).toFixed(1)}g`
    water_fullWet_result.textContent = `${(wetWater_g * wetItem.textContent).toFixed(1)}ml`;

    // 顯示說明
    let warning_txt_box = full_wet_block.querySelector(".warning_txt_box");
    let warning_txt = [];

    // 蛋白質
    if (wetProtein_g * wetItem.textContent > daliyProtein_max) {
      full_wet_block.querySelector(".protein_fullWet_explain").textContent = "過多";
      if (full_wet_block.querySelector(".protein_fullWet_explain").textContent === "過多") {
        full_wet_block.querySelector(".protein_fullWet_explain").classList.add("color-red")
        full_wet_block.querySelector(".protein_fullWet_explain").classList.remove("color-blue")
        full_wet_block.querySelector(".protein_fullWet_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 蛋白質過多，不建議作為主食！</p>`);
    } else if (wetProtein_g * wetItem.textContent >= daliyProtein_min && wetProtein_g * wetItem.textContent <= daliyProtein_max) {
      full_wet_block.querySelector(".protein_fullWet_explain").textContent = "符合";
      if (full_wet_block.querySelector(".protein_fullWet_explain").textContent === "符合") {
        full_wet_block.querySelector(".protein_fullWet_explain").classList.add("color-green")
        full_wet_block.querySelector(".protein_fullWet_explain").classList.remove("color-blue")
        full_wet_block.querySelector(".protein_fullWet_explain").classList.remove("color-red")
      }
    } else if (wetProtein_g * wetItem.textContent < daliyProtein_min) {
      full_wet_block.querySelector(".protein_fullWet_explain").textContent = "過少";
      if (full_wet_block.querySelector(".protein_fullWet_explain").textContent === "過少") {
        full_wet_block.querySelector(".protein_fullWet_explain").classList.add("color-blue")
        full_wet_block.querySelector(".protein_fullWet_explain").classList.remove("color-red")
        full_wet_block.querySelector(".protein_fullWet_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 蛋白質過少，需要額外補充！</p>`);
    }

    // 脂肪
    if (wetFat_g * wetItem.textContent > daliyFat_max) {
      full_wet_block.querySelector(".fat_fullWet_explain").textContent = "過多";
      if (full_wet_block.querySelector(".fat_fullWet_explain").textContent === "過多") {
        full_wet_block.querySelector(".fat_fullWet_explain").classList.add("color-red")
        full_wet_block.querySelector(".fat_fullWet_explain").classList.remove("color-blue")
        full_wet_block.querySelector(".fat_fullWet_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 脂肪過多，不建議作為主食！</p>`);
    } else if (wetFat_g * wetItem.textContent <= daliyFat_max && wetFat_g * wetItem.textContent >= daliyFat_min) {
      full_wet_block.querySelector(".fat_fullWet_explain").textContent = "符合";
      if (full_wet_block.querySelector(".fat_fullWet_explain").textContent === "符合") {
        full_wet_block.querySelector(".fat_fullWet_explain").classList.add("color-green")
        full_wet_block.querySelector(".fat_fullWet_explain").classList.remove("color-blue")
        full_wet_block.querySelector(".fat_fullWet_explain").classList.remove("color-red")
      }
    } else if (wetFat_g * wetItem.textContent < daliyFat_min) {
      full_wet_block.querySelector(".fat_fullWet_explain").textContent = "過少";
      if (full_wet_block.querySelector(".fat_fullWet_explain").textContent === "過少") {
        full_wet_block.querySelector(".fat_fullWet_explain").classList.add("color-blue")
        full_wet_block.querySelector(".fat_fullWet_explain").classList.remove("color-green")
        full_wet_block.querySelector(".fat_fullWet_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 脂肪過少，需要額外補充！</p>`);
    }

    // 水分
    if (wetWater_g * wetItem.textContent > daliyWater_max) {
      full_wet_block.querySelector(".water_fullWet_explain").textContent = "過多";
      if (full_wet_block.querySelector(".water_fullWet_explain").textContent === "過多") {
        full_wet_block.querySelector(".water_fullWet_explain").classList.add("color-red")
        full_wet_block.querySelector(".water_fullWet_explain").classList.remove("color-blue")
        full_wet_block.querySelector(".water_fullWet_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 水分過多！！</p>`);
    } else if (wetWater_g * wetItem.textContent <= daliyWater_max && wetWater_g * wetItem.textContent >= daliyWater_min) {
      full_wet_block.querySelector(".water_fullWet_explain").textContent = "符合";
      if (full_wet_block.querySelector(".water_fullWet_explain").textContent === "符合") {
        full_wet_block.querySelector(".water_fullWet_explain").classList.add("color-green")
        full_wet_block.querySelector(".water_fullWet_explain").classList.remove("color-blue")
        full_wet_block.querySelector(".water_fullWet_explain").classList.remove("color-red")
      }
    } else if (wetWater_g * wetItem.textContent < daliyWater_min) {
      full_wet_block.querySelector(".water_fullWet_explain").textContent = "過少";
      if (full_wet_block.querySelector(".water_fullWet_explain").textContent === "過少") {
        full_wet_block.querySelector(".water_fullWet_explain").classList.add("color-blue")
        full_wet_block.querySelector(".water_fullWet_explain").classList.remove("color-green")
        full_wet_block.querySelector(".water_fullWet_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 水分過少，需要額外補充！</p>`);
    }

    warning_txt_box.innerHTML = warning_txt.join('');


    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catStatus").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-wetElement").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-wetElement").classList.remove("opacity-1", "h-auto");

    // “開始計算”按鈕不能編輯
    fullWetMath_btn.disabled = true
    // “清除”按鈕不能編輯
    cleanAllValue_btn.disabled = true
    // “貓咪的體重”欄位不能編輯
    catWeight_value.disabled = true
    // “貓咪的狀態”欄位不能編輯
    for (let i = 0; i < catStatuses.length; i++) {
      catStatuses[i].disabled = true
    }
    // 所有欄位不能編輯
    wetGram.disabled = true
    wet_proteinPercent.disabled = true
    wet_fatPercent.disabled = true
    wet_fiberPercent.disabled = true
    wet_ashPercent.disabled = true
    wet_waterPercent.disabled = true
    // 所有計算的box都不能編輯
    for (let i = 0; i < mathDoneBoxes.length; i++) {
      mathDoneBoxes[i].classList.add("opacity-60");
    }

    // 關閉“請完成表單”
    card_notFinish.classList.add("h-0", "opacity-0", "hidden");
    card_notFinish.classList.remove("flex");
    // 開啟“計算結果”
    card_result.classList.remove("h-0", "opacity-0");
  }
}

// “重新計算”按鈕
if (editFullWetMath_btn) {
  editFullWetMath_btn.addEventListener("click", edit_fullWetMath)
}
function edit_fullWetMath() {

  scrollToFill()

  // “開始計算”按鈕可以編輯
  fullWetMath_btn.disabled = false
  // “清除”按鈕可以編輯
  cleanAllValue_btn.disabled = false
  // “貓咪的體重”欄位可以編輯
  catWeight_value.disabled = false
  // “貓咪的狀態”欄位可以編輯
  for (let i = 0; i < catStatuses.length; i++) {
    catStatuses[i].disabled = false
  }
  // 所有欄位可以編輯
  wetGram.disabled = false
  wet_proteinPercent.disabled = false
  wet_fatPercent.disabled = false
  wet_fiberPercent.disabled = false
  wet_ashPercent.disabled = false
  wet_waterPercent.disabled = false
  // 所有計算的box都可以編輯
  for (let i = 0; i < mathDoneBoxes.length; i++) {
    mathDoneBoxes[i].classList.remove("opacity-60");
  }

  // 開啟“請完成表單”
  card_notFinish.classList.remove("h-0", "opacity-0", "hidden");
  card_notFinish.classList.add("flex");
  // 關閉“計算結果”
  card_result.classList.add("h-0", "opacity-0", "transition-none");
  card_result.classList.remove("transition-all");
}


/* 頁面 - 全乾食的分配 */
/* ========================== */

let fullDryMath_btn = document.querySelector("#fullDryMath_btn");
let editFullDryMath_btn = document.querySelector("#editFullDryMath_btn")
let dryItem = document.querySelector("#dry-item")

if (fullDryMath_btn) {
  fullDryMath_btn.addEventListener("click", math_fullDry)
}

function math_fullDry() {

  scrollToResult()

  // 取得選擇的貓咪狀態，並取得所需卡路里
  for (let i = 0; i < catStatuses.length; i++) {
    if (catStatuses[i].checked) {
      catStatus = catStatuses[i].value;
    }
  }

  if (catWeight_value.value === "") {
    // 如果“貓咪的體重”欄位是空的
    // 提醒卡出現
    document.querySelector(".alert-catWeight").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-catWeight").classList.remove("opacity-0", "h-0");
    catWeight_value.focus();

  } else if (!catStatus) {
    // 如果“貓咪的狀態”欄位是空的
    // 提醒卡出現
    document.querySelector(".alert-catStatus").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.remove("opacity-0", "h-0");
    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");

  } else if (dry_1Kg_Kcal.value === "" || dry_proteinPercent.value === "" || dry_fatPercent.value === "" || dry_fiberPercent.value === "" || dry_ashPercent.value === "" || dry_waterPercent.value === "") {
    // 如果“乾糧的營養成分”欄位其中一個是空的
    // 提醒卡出現
    document.querySelector(".alert-dryElement").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-dryElement").classList.remove("opacity-0", "h-0");
    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catStatus").classList.remove("opacity-1", "h-auto");

  } else {

    catWeight_value.value = Number(catWeight_value.value);

    //  取得貓咪卡路里變數
    check_catStatuses(catStatus);
    // console.log(kg_kcal);

    // 貓咪一天所需卡路里
    daliyKcal = (catWeight_value.value * kg_kcal).toFixed(0);

    // 計算貓咪一天需吃幾克乾糧
    dryItem.textContent = Number((daliyKcal / (dry_1Kg_Kcal.value / 1000)).toFixed(0))

    // 計算每日蛋白質克數
    daliyProtein_min = ((daliyKcal * 0.46) / 3.5).toFixed(0);
    daliyProtein_max = ((daliyKcal * 0.6) / 3.5).toFixed(0);
    daliyProtein = card_result.querySelector("#daliyProtein");
    daliyProtein.textContent = `${daliyProtein_min} ~ ${daliyProtein_max}g`;

    // 計算每日脂肪克數
    daliyFat_min = ((daliyKcal * 0.09) / 8.5).toFixed(0);
    daliyFat_max = ((daliyKcal * 0.5) / 8.5).toFixed(0);
    daliyFat = card_result.querySelector("#daliyFat");
    daliyFat.textContent = `${daliyFat_min} ~ ${daliyFat_max}g`;

    // 每日飲水量
    daliyWater_min = (catWeight_value.value * 40).toFixed(0);
    daliyWater_max = (catWeight_value.value * 60).toFixed(0);
    daliyWater = card_result.querySelector("#daliyWater");
    daliyWater.textContent = `${daliyWater_min} ~ ${daliyWater_max}ml`;

    // 計算乾糧一天吃n克的 蛋白質 脂肪 水分 g
    let dryProtein_g = Number((dryItem.textContent * dry_proteinPercent.value / 100).toFixed(1));
    let dryFat_g = Number((dryItem.textContent * dry_fatPercent.value / 100).toFixed(1));
    let dryWater_g = Number((dryItem.textContent * dry_waterPercent.value / 100).toFixed(1));

    let full_dry_block = document.querySelector(".full_dry_block")
    let protein_fullDry_result = full_dry_block.querySelector(".protein_fullDry_result")
    let fat_fullDry_result = full_dry_block.querySelector(".fat_fullDry_result")
    let water_fullDry_result = full_dry_block.querySelector(".water_fullDry_result")

    protein_fullDry_result.textContent = `${dryProtein_g}g`
    fat_fullDry_result.textContent = `${dryFat_g}g`
    water_fullDry_result.textContent = `${dryWater_g}ml`;

    // 顯示說明
    let warning_txt_box = full_dry_block.querySelector(".warning_txt_box");
    let warning_txt = [];

    // 蛋白質
    if (dryProtein_g > daliyProtein_max) {
      full_dry_block.querySelector(".protein_fullDry_explain").textContent = "過多";
      if (full_dry_block.querySelector(".protein_fullDry_explain").textContent === "過多") {
        full_dry_block.querySelector(".protein_fullDry_explain").classList.add("color-red")
        full_dry_block.querySelector(".protein_fullDry_explain").classList.remove("color-blue")
        full_dry_block.querySelector(".protein_fullDry_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 蛋白質過多，不建議作為主食！</p>`);
    } else if (dryProtein_g >= daliyProtein_min && dryProtein_g <= daliyProtein_max) {
      full_dry_block.querySelector(".protein_fullDry_explain").textContent = "符合";
      if (full_dry_block.querySelector(".protein_fullDry_explain").textContent === "符合") {
        full_dry_block.querySelector(".protein_fullDry_explain").classList.add("color-green")
        full_dry_block.querySelector(".protein_fullDry_explain").classList.remove("color-blue")
        full_dry_block.querySelector(".protein_fullDry_explain").classList.remove("color-red")
      }
    } else if (dryProtein_g < daliyProtein_min) {
      full_dry_block.querySelector(".protein_fullDry_explain").textContent = "過少";
      if (full_dry_block.querySelector(".protein_fullDry_explain").textContent === "過少") {
        full_dry_block.querySelector(".protein_fullDry_explain").classList.add("color-blue")
        full_dry_block.querySelector(".protein_fullDry_explain").classList.remove("color-red")
        full_dry_block.querySelector(".protein_fullDry_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 蛋白質過少，需要額外補充！</p>`);
    }

    // 脂肪
    if (dryFat_g > daliyFat_max) {
      full_dry_block.querySelector(".fat_fullDry_explain").textContent = "過多";
      if (full_dry_block.querySelector(".fat_fullDry_explain").textContent === "過多") {
        full_dry_block.querySelector(".fat_fullDry_explain").classList.add("color-red")
        full_dry_block.querySelector(".fat_fullDry_explain").classList.remove("color-blue")
        full_dry_block.querySelector(".fat_fullDry_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 脂肪過多，不建議作為主食！</p>`);
    } else if (dryFat_g <= daliyFat_max && dryFat_g >= daliyFat_min) {
      full_dry_block.querySelector(".fat_fullDry_explain").textContent = "符合";
      if (full_dry_block.querySelector(".fat_fullDry_explain").textContent === "符合") {
        full_dry_block.querySelector(".fat_fullDry_explain").classList.add("color-green")
        full_dry_block.querySelector(".fat_fullDry_explain").classList.remove("color-blue")
        full_dry_block.querySelector(".fat_fullDry_explain").classList.remove("color-red")
      }
    } else if (dryFat_g < daliyFat_min) {
      full_dry_block.querySelector(".fat_fullDry_explain").textContent = "過少";
      if (full_dry_block.querySelector(".fat_fullDry_explain").textContent === "過少") {
        full_dry_block.querySelector(".fat_fullDry_explain").classList.add("color-blue")
        full_dry_block.querySelector(".fat_fullDry_explain").classList.remove("color-green")
        full_dry_block.querySelector(".fat_fullDry_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 脂肪過少，需要額外補充！</p>`);
    }

    // 水分
    if (dryWater_g > daliyWater_max) {
      full_dry_block.querySelector(".water_fullDry_explain").textContent = "過多";
      if (full_dry_block.querySelector(".water_fullDry_explain").textContent === "過多") {
        full_dry_block.querySelector(".water_fullDry_explain").classList.add("color-red")
        full_dry_block.querySelector(".water_fullDry_explain").classList.remove("color-blue")
        full_dry_block.querySelector(".water_fullDry_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 水分過多！！</p>`);
    } else if (dryWater_g <= daliyWater_max && dryWater_g >= daliyWater_min) {
      full_dry_block.querySelector(".water_fullDry_explain").textContent = "符合";
      if (full_dry_block.querySelector(".water_fullDry_explain").textContent === "符合") {
        full_dry_block.querySelector(".water_fullDry_explain").classList.add("color-green")
        full_dry_block.querySelector(".water_fullDry_explain").classList.remove("color-blue")
        full_dry_block.querySelector(".water_fullDry_explain").classList.remove("color-red")
      }
    } else if (dryWater_g < daliyWater_min) {
      full_dry_block.querySelector(".water_fullDry_explain").textContent = "過少";
      if (full_dry_block.querySelector(".water_fullDry_explain").textContent === "過少") {
        full_dry_block.querySelector(".water_fullDry_explain").classList.add("color-blue")
        full_dry_block.querySelector(".water_fullDry_explain").classList.remove("color-green")
        full_dry_block.querySelector(".water_fullDry_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 水分過少，需要額外補充！</p>`);
    }

    warning_txt_box.innerHTML = warning_txt.join('');


    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catStatus").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-dryElement").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-dryElement").classList.remove("opacity-1", "h-auto");

    // “開始計算”按鈕不能編輯
    fullDryMath_btn.disabled = true
    // “清除”按鈕不能編輯
    cleanAllValue_btn.disabled = true
    // “貓咪的體重”欄位不能編輯
    catWeight_value.disabled = true
    // “貓咪的狀態”欄位不能編輯
    for (let i = 0; i < catStatuses.length; i++) {
      catStatuses[i].disabled = true
    }
    // 所有欄位不能編輯
    dry_1Kg_Kcal.disabled = true
    dry_proteinPercent.disabled = true
    dry_fatPercent.disabled = true
    dry_fiberPercent.disabled = true
    dry_ashPercent.disabled = true
    dry_waterPercent.disabled = true
    // 所有計算的box都不能編輯
    for (let i = 0; i < mathDoneBoxes.length; i++) {
      mathDoneBoxes[i].classList.add("opacity-60");
    }

    // 關閉“請完成表單”
    card_notFinish.classList.add("h-0", "opacity-0", "hidden");
    card_notFinish.classList.remove("flex");
    // 開啟“計算結果”
    card_result.classList.remove("h-0", "opacity-0");
  }
}

// “重新計算”按鈕
if (editFullDryMath_btn) {
  editFullDryMath_btn.addEventListener("click", editFullDryMath)
}
function editFullDryMath() {

  scrollToFill()

  // “開始計算”按鈕可以編輯
  fullDryMath_btn.disabled = false
  // “清除”按鈕可以編輯
  cleanAllValue_btn.disabled = false
  // “貓咪的體重”欄位可以編輯
  catWeight_value.disabled = false
  // “貓咪的狀態”欄位可以編輯
  for (let i = 0; i < catStatuses.length; i++) {
    catStatuses[i].disabled = false
  }
  // 所有欄位可以編輯
  dry_1Kg_Kcal.disabled = false
  dry_proteinPercent.disabled = false
  dry_fatPercent.disabled = false
  dry_fiberPercent.disabled = false
  dry_ashPercent.disabled = false
  dry_waterPercent.disabled = false
  // 所有計算的box都可以編輯
  for (let i = 0; i < mathDoneBoxes.length; i++) {
    mathDoneBoxes[i].classList.remove("opacity-60");
  }

  // 開啟“請完成表單”
  card_notFinish.classList.remove("h-0", "opacity-0", "hidden");
  card_notFinish.classList.add("flex");
  // 關閉“計算結果”
  card_result.classList.add("h-0", "opacity-0", "transition-none");
  card_result.classList.remove("transition-all");
}


/* 頁面 - 半濕食的分配 */
/* ========================== */
let halfWetDryNext_btn = document.querySelector("#halfWetDryNext_btn");
let halfWetDryPrev_fillIn_btn = document.querySelector("#halfWetDryPrev_fillIn_btn");
let halfWetDryPrev_select_btn = document.querySelector("#halfWetDryPrev_select_btn");
let halfWetDryMath_btn = document.querySelector("#halfWetDryMath_btn");

// 一罐頭含碳水化合物％
let wet_carbohydratePercent = 0
// 罐頭卡路里 ＆ 營養成分 g
let wetProtein_g = 0
let wetFat_g = 0
let wetWater_g = 0
let wetCarbohydrate_g = 0
let wetKcal = 0
// 貓咪一天所需卡路里
let daliyKcal = 0

// 每日所需蛋白質、脂肪、水分 最多與最少
let daliyProtein_min = 0
let daliyProtein_max = 0
let daliyFat_min = 0
let daliyFat_max = 0
let daliyWater_min = 0
let daliyWater_max = 0


// 點擊下一步
if (halfWetDryNext_btn) {
  halfWetDryNext_btn.addEventListener("click", select_daliyFeed)
}

// 點擊上一步到填寫乾濕食欄位
if (halfWetDryPrev_fillIn_btn) {
  halfWetDryPrev_fillIn_btn.addEventListener("click", fillIn_block)
}

// 點擊上一步到選擇乾濕食分配欄位
if (halfWetDryPrev_select_btn) {
  halfWetDryPrev_select_btn.addEventListener("click", select_block)
}

// 點擊開始計算
if (halfWetDryMath_btn) {
  halfWetDryMath_btn.addEventListener("click", math_halfWetDry)
}

function select_daliyFeed() {

  // 取得選擇的貓咪狀態，並取得所需卡路里
  for (let i = 0; i < catStatuses.length; i++) {
    if (catStatuses[i].checked) {
      catStatus = catStatuses[i].value;
    }
  }

  if (catWeight_value.value === "") {
    // 如果“貓咪的體重”欄位是空的
    // 提醒卡出現
    document.querySelector(".alert-catWeight").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-catWeight").classList.remove("opacity-0", "h-0");
    catWeight_value.focus();

  } else if (!catStatus) {
    // 如果“貓咪的狀態”欄位是空的
    // 提醒卡出現
    document.querySelector(".alert-catStatus").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.remove("opacity-0", "h-0");
    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");

  } else if (dry_1Kg_Kcal.value === "" || dry_proteinPercent.value === "" || dry_fatPercent.value === "" || dry_fiberPercent.value === "" || dry_ashPercent.value === "" || dry_waterPercent.value === "" || wetGram.value === "" || wet_proteinPercent.value === "" || wet_fatPercent.value === "" || wet_fiberPercent.value === "" || wet_ashPercent.value === "" || wet_waterPercent.value === "") {
    // 如果“乾糧的營養成分”欄位其中一個是空的
    // 如果“罐頭的營養成分”欄位其中一個是空的
    // 提醒卡出現
    document.querySelector(".alert-wetElement").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-wetElement").classList.remove("opacity-0", "h-0");
    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catStatus").classList.remove("opacity-1", "h-auto");

  } else {

    // 一罐頭含碳水化合物％
    wet_carbohydratePercent = (100 - wet_proteinPercent.value - wet_fatPercent.value - wet_fiberPercent.value - wet_waterPercent.value - wet_ashPercent.value).toFixed(1);
    // 罐頭卡路里 ＆ 營養成分 g
    wetProtein_g = (wetGram.value * wet_proteinPercent.value / 100).toFixed(1);
    wetFat_g = (wetGram.value * wet_fatPercent.value / 100).toFixed(1);
    wetWater_g = (wetGram.value * wet_waterPercent.value / 100).toFixed(1);
    wetCarbohydrate_g = (wetGram.value * wet_carbohydratePercent / 100).toFixed(1);
    wetKcal = ((wetProtein_g * 3.5) + (wetFat_g * 8.5) + (wetCarbohydrate_g * 3.5)).toFixed(1);

    catWeight_value.value = Number(catWeight_value.value);

    //  取得貓咪卡路里變數
    check_catStatuses(catStatus);
    // console.log(kg_kcal);

    // 貓咪一天所需卡路里
    daliyKcal = (catWeight_value.value * kg_kcal).toFixed(0);

    // 計算貓咪一天需吃幾顆罐頭
    let wetItem = Number((daliyKcal / wetKcal).toFixed(1))
    let halfWetDry_choose = [];
    let choose = Array.apply(null, { length: wetItem + 1 }).map(Number.call, Number);
    choose.forEach((i) => {
      if (i < wetItem) {
        halfWetDry_choose.push(i, (i + 0.5));
        if (halfWetDry_choose[halfWetDry_choose.length - 1] >= wetItem) {
          halfWetDry_choose.pop()
        }
      }
    });
    halfWetDry_choose.shift();
    let selectRadios = "";
    halfWetDry_choose.forEach((e, i) => {
      selectRadios +=
        `
        <div class="radio-style-1">
          <label for="wetNum${i}">
            <input id="wetNum${i}" name="half-wet-dry-choose" type="radio" value="${e}">
            <span>每日罐頭 ${e} 顆 ＋ 乾糧</span>
          </label>
        </div>
        `
    })
    document.querySelector(".select-radios").innerHTML =
      `
      <div class="radio-style-1">
        <label for="wetNum__2">
          <input id="wetNum__2" name="half-wet-dry-choose" type="radio" value="0.2">
          <span>每日罐頭 0.2 顆 ＋ 乾糧</span>
        </label>
      </div>
      <div class="radio-style-1">
        <label for="wetNum__25">
          <input id="wetNum__25" name="half-wet-dry-choose" type="radio" value="0.25">
          <span>每日罐頭 0.25 顆 ＋ 乾糧</span>
        </label>
      </div>
      <div class="radio-style-1">
        <label for="wetNum__3">
          <input id="wetNum__3" name="half-wet-dry-choose" type="radio" value="0.3">
          <span>每日罐頭 0.3 顆 ＋ 乾糧</span>
        </label>
      </div>
      ${selectRadios}
      `;

    // 計算每日蛋白質克數
    daliyProtein_min = ((daliyKcal * 0.46) / 3.5).toFixed(0);
    daliyProtein_max = ((daliyKcal * 0.6) / 3.5).toFixed(0);
    daliyProtein = card_result.querySelector("#daliyProtein");
    daliyProtein.textContent = `${daliyProtein_min} ~ ${daliyProtein_max}g`;

    // 計算每日脂肪克數
    daliyFat_min = ((daliyKcal * 0.09) / 8.5).toFixed(0);
    daliyFat_max = ((daliyKcal * 0.5) / 8.5).toFixed(0);
    daliyFat = card_result.querySelector("#daliyFat");
    daliyFat.textContent = `${daliyFat_min} ~ ${daliyFat_max}g`;

    // 每日飲水量
    daliyWater_min = (catWeight_value.value * 40).toFixed(0);
    daliyWater_max = (catWeight_value.value * 60).toFixed(0);
    daliyWater = card_result.querySelector("#daliyWater");
    daliyWater.textContent = `${daliyWater_min} ~ ${daliyWater_max}ml`;


    // 提醒卡隱藏
    document.querySelector(".alert-catWeight").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catWeight").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-catStatus").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-catStatus").classList.remove("opacity-1", "h-auto");
    document.querySelector(".alert-wetElement").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-wetElement").classList.remove("opacity-1", "h-auto");

    // "下一步"按鈕不能編輯
    halfWetDryNext_btn.disabled = true
    // “貓咪的體重”欄位不能編輯
    catWeight_value.disabled = true
    // “清除”按鈕不能編輯
    cleanAllValue_btn.disabled = true
    // “貓咪的狀態”欄位不能編輯
    for (let i = 0; i < catStatuses.length; i++) {
      catStatuses[i].disabled = true
    }
    // 所有欄位不能編輯
    wetGram.disabled = true
    wet_proteinPercent.disabled = true
    wet_fatPercent.disabled = true
    wet_fiberPercent.disabled = true
    wet_ashPercent.disabled = true
    wet_waterPercent.disabled = true
    dry_1Kg_Kcal.disabled = true
    dry_proteinPercent.disabled = true
    dry_fatPercent.disabled = true
    dry_fiberPercent.disabled = true
    dry_ashPercent.disabled = true
    dry_waterPercent.disabled = true
    // 所有計算的box都不能編輯
    for (let i = 0; i < mathDoneBoxes.length; i++) {
      mathDoneBoxes[i].classList.add("opacity-60");
    }

    // 關閉“尚未完成表單 - 勾選每日分配”
    card_notFinish_selectDaliyFeed.classList.add("h-0", "opacity-0", "hidden");
    card_notFinish_selectDaliyFeed.classList.remove("flex");
    // 開啟“計算結果表單 - 勾選每日分配”
    card_result_selectDaliyFeed.classList.remove("h-0", "opacity-0", "w-0");
    card_result_selectDaliyFeed.classList.add("w-full");

  }
}

function fillIn_block() {

  // "下一步"按鈕可以編輯
  halfWetDryNext_btn.disabled = false
  // “貓咪的體重”欄位可以編輯
  catWeight_value.disabled = false
  // “清除”按鈕可以編輯
  cleanAllValue_btn.disabled = false
  // “貓咪的狀態”欄位可以編輯
  for (let i = 0; i < catStatuses.length; i++) {
    catStatuses[i].disabled = false
  }
  // 所有欄位可以編輯
  wetGram.disabled = false
  wet_proteinPercent.disabled = false
  wet_fatPercent.disabled = false
  wet_fiberPercent.disabled = false
  wet_ashPercent.disabled = false
  wet_waterPercent.disabled = false
  dry_1Kg_Kcal.disabled = false
  dry_proteinPercent.disabled = false
  dry_fatPercent.disabled = false
  dry_fiberPercent.disabled = false
  dry_ashPercent.disabled = false
  dry_waterPercent.disabled = false
  // 所有計算的box都可以編輯
  for (let i = 0; i < mathDoneBoxes.length; i++) {
    mathDoneBoxes[i].classList.remove("opacity-60");
  }

  // 開啟“尚未完成表單 - 勾選每日分配”
  card_notFinish_selectDaliyFeed.classList.remove("h-0", "opacity-0", "hidden");
  card_notFinish_selectDaliyFeed.classList.add("flex");
  // 關閉“計算結果表單 - 勾選每日分配”
  card_result_selectDaliyFeed.classList.add("h-0", "opacity-0");
  card_result_selectDaliyFeed.classList.remove("w-full");

}

function math_halfWetDry() {

  // 所有可以勾選的濕食顆數
  let selectDaliyFeedRadio = document.querySelectorAll(".select-radios input");
  let selectDaliyFeedValue = "";

  // 取得選擇的濕食的顆數
  for (let i = 0; i < selectDaliyFeedRadio.length; i++) {
    if (selectDaliyFeedRadio[i].checked) {
      selectDaliyFeedValue = selectDaliyFeedRadio[i].value;
    }
  }

  if (selectDaliyFeedValue == "") {
    // 如果沒有選擇濕食的顆數
    // 提醒卡出現
    document.querySelector(".alert-selectDaliyFeedElement").classList.add("opacity-1", "h-auto");
    document.querySelector(".alert-selectDaliyFeedElement").classList.remove("opacity-0", "h-0");
  } else {

    for (let i = 0; i < selectDaliyFeedRadio.length; i++) {
      // 每日半濕食分配不能編輯
      selectDaliyFeedRadio[i].disabled = true;
    }

    // 半濕食的分配結果
    document.querySelector("#selectDaliyFeedValue_wet").textContent = selectDaliyFeedValue;

    // 還需要從乾糧獲得的熱量 = 每日需要的熱量 - 勾選的n顆罐頭的熱量
    let restKcal = daliyKcal - Number(selectDaliyFeedValue * wetKcal);

    // 剩餘需要吃的n克的乾糧
    selectDaliyNum_dry = Number((restKcal / (dry_1Kg_Kcal.value / 1000)).toFixed(0))
    document.querySelector("#selectDaliyFeedValue_dry").textContent = selectDaliyNum_dry;


    // 計算濕食一天吃n顆的 蛋白質 脂肪 水分 g
    let selectWetProtein_g = Number((selectDaliyFeedValue * wetGram.value * wet_proteinPercent.value / 100).toFixed(1))
    let selectWetFat_g = Number((selectDaliyFeedValue * wetGram.value * wet_fatPercent.value / 100).toFixed(1))
    let selectWetWater_g = Number((selectDaliyFeedValue * wetGram.value * wet_waterPercent.value / 100).toFixed(1))

    // 計算乾糧一天吃n克的 蛋白質 脂肪 水分 g
    let dryProtein_g = Number((selectDaliyNum_dry * dry_proteinPercent.value / 100).toFixed(1))
    let dryFat_g = Number((selectDaliyNum_dry * dry_fatPercent.value / 100).toFixed(1))
    let dryWater_g = Number((selectDaliyNum_dry * dry_waterPercent.value / 100).toFixed(1))

    // 渲染結果
    let half_wetdry_block = document.querySelector(".half_wetdry_block")
    let protein_halfWetDry_result = half_wetdry_block.querySelector(".protein_halfWetDry_result")
    let fat_halfWetDry_result = half_wetdry_block.querySelector(".fat_halfWetDry_result")
    let water_halfWetDry_result = half_wetdry_block.querySelector(".water_halfWetDry_result")
    protein_halfWetDry_result.textContent = `${(selectWetProtein_g + dryProtein_g).toFixed(1)}g`;
    fat_halfWetDry_result.textContent = `${(selectWetFat_g + dryFat_g).toFixed(1)}g`;
    water_halfWetDry_result.textContent = `${(selectWetWater_g + dryWater_g).toFixed(1)}ml`;



    // 顯示說明
    let warning_txt_box = half_wetdry_block.querySelector(".warning_txt_box");
    let warning_txt = [];

    // 蛋白質
    if (selectWetProtein_g + dryProtein_g > daliyProtein_max) {
      half_wetdry_block.querySelector(".protein_halfWetDry_explain").textContent = "過多";
      if (half_wetdry_block.querySelector(".protein_halfWetDry_explain").textContent === "過多") {
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.add("color-red")
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.remove("color-blue")
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 蛋白質過多，不建議作為主食！</p>`);
    } else if (selectWetProtein_g + dryProtein_g >= daliyProtein_min && selectWetProtein_g + dryProtein_g <= daliyProtein_max) {
      half_wetdry_block.querySelector(".protein_halfWetDry_explain").textContent = "符合";
      if (half_wetdry_block.querySelector(".protein_halfWetDry_explain").textContent === "符合") {
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.add("color-green")
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.remove("color-blue")
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.remove("color-red")
      }
    } else if (selectWetProtein_g + dryProtein_g < daliyProtein_min) {
      half_wetdry_block.querySelector(".protein_halfWetDry_explain").textContent = "過少";
      if (half_wetdry_block.querySelector(".protein_halfWetDry_explain").textContent === "過少") {
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.add("color-blue")
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.remove("color-red")
        half_wetdry_block.querySelector(".protein_halfWetDry_explain").classList.remove("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 蛋白質過少，需要額外補充！</p>`);
    }

    // 脂肪
    if (selectWetFat_g + dryFat_g > daliyFat_max) {
      half_wetdry_block.querySelector(".fat_halfWetDry_explain").textContent = "過多";
      if (half_wetdry_block.querySelector(".fat_halfWetDry_explain").textContent === "過多") {
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.add("color-red")
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.remove("color-blue")
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 脂肪過多，不建議作為主食！</p>`);
    } else if (selectWetFat_g + dryFat_g <= daliyFat_max && selectWetFat_g + dryFat_g >= daliyFat_min) {
      half_wetdry_block.querySelector(".fat_halfWetDry_explain").textContent = "符合";
      if (half_wetdry_block.querySelector(".fat_halfWetDry_explain").textContent === "符合") {
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.add("color-green")
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.remove("color-blue")
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.remove("color-red")
      }
    } else if (selectWetFat_g + dryFat_g < daliyFat_min) {
      half_wetdry_block.querySelector(".fat_halfWetDry_explain").textContent = "過少";
      if (half_wetdry_block.querySelector(".fat_halfWetDry_explain").textContent === "過少") {
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.add("color-blue")
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.remove("color-green")
        half_wetdry_block.querySelector(".fat_halfWetDry_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 脂肪過少，需要額外補充！</p>`);
    }

    // 水分
    if (selectWetWater_g + dryWater_g > daliyWater_max) {
      half_wetdry_block.querySelector(".water_halfWetDry_explain").textContent = "過多";
      if (half_wetdry_block.querySelector(".water_halfWetDry_explain").textContent === "過多") {
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.add("color-red")
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.remove("color-blue")
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.add("color-green")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-red">※ 水分過多！！</p>`);
    } else if (selectWetWater_g + dryWater_g <= daliyWater_max && selectWetWater_g + dryWater_g >= daliyWater_min) {
      half_wetdry_block.querySelector(".water_halfWetDry_explain").textContent = "符合";
      if (half_wetdry_block.querySelector(".water_halfWetDry_explain").textContent === "符合") {
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.add("color-green")
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.remove("color-blue")
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.remove("color-red")
      }
    } else if (selectWetWater_g + dryWater_g < daliyWater_min) {
      half_wetdry_block.querySelector(".water_halfWetDry_explain").textContent = "過少";
      if (half_wetdry_block.querySelector(".water_halfWetDry_explain").textContent === "過少") {
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.add("color-blue")
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.remove("color-green")
        half_wetdry_block.querySelector(".water_halfWetDry_explain").classList.remove("color-red")
      }
      warning_txt.push(`<p class="text-sm mb-2 color-blue">※ 水分過少，需要額外補充！</p>`);
    }

    warning_txt_box.innerHTML = warning_txt.join('');


    // 提醒卡隱藏
    document.querySelector(".alert-selectDaliyFeedElement").classList.add("opacity-0", "h-0");
    document.querySelector(".alert-selectDaliyFeedElement").classList.remove("opacity-1", "h-auto");

    // “計算結果表單 - 勾選每日分配”不能編輯
    halfWetDryPrev_fillIn_btn.disabled = true;
    halfWetDryMath_btn.disabled = true;
    card_result_selectDaliyFeed.classList.add("opacity-60");
    card_result_selectDaliyFeed.classList.remove("opacity-0");

    // 關閉“請完成表單”
    card_notFinish.classList.add("h-0", "opacity-0", "hidden");
    card_notFinish.classList.remove("flex");
    // 開啟“計算結果”
    card_result.classList.remove("h-0", "opacity-0");

  }

}

function select_block() {

  // 勾選每日分配可以編輯
  card_result_selectDaliyFeed.classList.remove("opacity-60")
  halfWetDryPrev_fillIn_btn.disabled = false;
  halfWetDryMath_btn.disabled = false;
  // 所有可以勾選的濕食顆數
  let selectDaliyFeedRadio = document.querySelectorAll(".select-radios input");
  for (let i = 0; i < selectDaliyFeedRadio.length; i++) {
    selectDaliyFeedRadio[i].disabled = false;
  }

  // 關閉“請完成表單”
  card_notFinish.classList.remove("h-0", "opacity-0", "hidden");
  card_notFinish.classList.add("flex");
  // 開啟“計算結果”
  card_result.classList.add("h-0", "opacity-0");

}