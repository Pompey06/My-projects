// Loader
const chatOverlay = document.querySelector(".chat-overlay");
const closeButton = document.querySelector(".cancel");
const loadingRect = document.querySelector("rect[data-loading]");

function openLoadingModal() {
   chatOverlay.classList.add("active");
   document.body.classList.add("no-scroll");
}

function closeLoadingModal() {
   chatOverlay.classList.remove("active");
   document.body.classList.remove("no-scroll");
}

// openLoadingModal();

closeButton.addEventListener("click", closeLoadingModal);

chatOverlay.addEventListener("click", (e) => {
   if (e.target === chatOverlay) {
      closeLoadingModal();
   }
});

// Data
// async function getAppData() {
//   return {
//     "token_data": {
//       "indicator_data": {
//         "high": {
//           "count": 5,
//           "details": [
//             {
//               "text": "Previous scams by owner's wallet found",
//               "is_scam": true
//             },
//             {
//               "text": "Mintable risks found",
//               "is_scam": false
//             },
//             {
//               "text": "Freeze risks found",
//               "is_scam": true
//             },
//             {
//               "text": "Token transferability risks found",
//               "is_scam": true
//             },
//             {
//               "text": "A private wallet owns a significant share of the supply",
//               "is_scam": false
//             },
//             {
//               "text": "Tokens auto-freeze risks found",
//               "is_scam": true
//             },
//             {
//               "text": "Significant ownership by top 10 wallets",
//               "is_scam": false
//             },
//             {
//               "text": "Significant ownership by top 20 wallets",
//               "is_scam": false
//             },
//             {
//               "text": "Permanent control risks found",
//               "is_scam": true
//             },
//             {
//               "text": "Presence of token metadata",
//               "is_scam": true
//             },
//             {
//               "text": "High locked supply risks found",
//               "is_scam": false
//             },
//             {
//               "text": "Sufficient liquidity detected",
//               "is_scam": true
//             },
//             {
//               "text": "Very low liquidity",
//               "is_scam": true
//             }
//           ]
//         },
//         "moderate": {
//           "count": 1,
//           "details": [
//             {
//               "text": "Token metadata are immutable",
//               "is_scam": false
//             },
//             {
//               "text": "Token operates without custom fees",
//               "is_scam": true
//             },
//             {
//               "text": "Token has recent user activity",
//               "is_scam": true
//             },
//             {
//               "text": "Unknown liquidity pools",
//               "is_scam": true
//             },
//             {
//               "text": "Low count of LP providers",
//               "is_scam": true
//             }
//           ]
//         },
//         "low": {
//           "count": 0,
//           "details": [
//             {
//               "text": "Contract was not recently deployed",
//               "is_scam": true
//             }
//           ]
//         },
//         "specific": {
//           "count": 0,
//           "details": [
//             {
//               "text": "Recent interaction within the last 30 days",
//               "is_scam": true
//             }
//           ]
//         }
//       },
//       "token_overview": {
//         "deployer": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//         "mint": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//         "address": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//         "type": "spl-token"
//       },
//       "token_name": "Wrapped Ethereum (Sollet)",
//       "token_symbol": "ETH",
//       "token_img": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk/logo.png",
//       "address": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//       "score": 65,
//       "deploy_time": "2023-01-01T00:00:00Z",
//       "market_cap": 247268964.57,
//       "externals": {
//         "website": "https://www.ethereum.org/",
//         "coingecko_coin_id": "wrapped-ethereum-sollet",
//         "discord_url": "https://discord.com/invite/CetY6Y4",
//         "twitter_handle": "ethereum"
//       },
//       "liquidity_list": [
//         {
//           "orca": {
//             "address": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//             "amount": 55306.72,
//             "lp_pair": "SOL"
//           },
//           "raydiun": {
//             "address": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//             "amount": 55306.72,
//             "lp_pair": "SOL"
//           },
//           "fluxbeam": {
//             "address": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//             "amount": 55306.72,
//             "lp_pair": "SOL"
//           }
//         }
//       ],
//       "owners_list": [
//         {
//           "address": "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
//           "amount": 108.54,
//           "percentage": "0.02"
//         }
//       ],
//       "audit_risk": {
//         "mint_disabled": false,
//         "freeze_disabled": true,
//         "lp_burned": false,
//         "top10holders": false
//       }
//     },
//     "token_info": {
//       "price": 1.23,
//       "supply_amount": 1000000.0,
//       "mkt_cap": 1230000.0
//     }
//   };
// }

async function getAppData() {
   let address = localStorage.getItem("address");
   let data = {};
   openLoadingModal();

   let width = 0;
   const targetWidth = 215;
   const increment = 5;

   const increaseWidth = () => {
      return new Promise((resolve) => {
         const interval = setInterval(() => {
            if (width < targetWidth) {
               width += increment;
               loadingRect.setAttribute("width", width);
            } else {
               clearInterval(interval);
               resolve();
            }
         }, 50);
      });
   };

   const loadingPromise = increaseWidth();

   await fetch("https://77.91.87.74/docs", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "api-key": "7qVhdTgs7zBgLGgeuvGG",
      },
      body: JSON.stringify({ address }),
   })
      .then((res) => res.json())
      .then((res) => {
         data = res;
      });

   await loadingPromise;

   closeLoadingModal();

   return data;
}

// Data Preview
function getElBySelector(selector) {
   return document.querySelector(selector);
}

function setHtmlContent(selector, html) {
   const el = getElBySelector(selector);
   el.innerHTML = html;
}

function setDataCopy(selector, value) {
   const el = getElBySelector(selector);
   el.setAttribute("data-copy", value);
}

const setDataPreview = async () => {
   const data = await getAppData();
   // Set Project info
   const logo = getElBySelector(".project__info img");
   if (logo) logo.src = data.token_data.token_img;

   setHtmlContent(".project__info .name", data.token_data.token_name);
   setHtmlContent(".project__info .subname", data.token_data.token_symbol);
   setHtmlContent(".ca span", data.token_data.address);
   setHtmlContent(".supply span", data.token_info.supply_amount);
   setDataCopy(".link-1", data.token_data.externals.website);
   setDataCopy(".link-3", data.explorer_link);

   setHtmlContent(".market-cap", "$ " + data.token_data.market_cap);
   setHtmlContent(".token-price", "$ " + data.token_info.price);
   setHtmlContent(".tax-value", "-");

   // Set Liquidity
   const openLiquidity = getElBySelector(".open__liquidity");
   const lockLiquidity = getElBySelector(".lock__liquidity");
   const total_liquidity = data.token_data.total_liquidity;
   if (total_liquidity) {
      openLiquidity.classList.remove("none");
      lockLiquidity.classList.add("none");
      setHtmlContent(".liquidity__dollar", total_liquidity);
   } else {
      openLiquidity.classList.add("none");
      lockLiquidity.classList.remove("none");
   }

   const passed = getElBySelector(".passed");
   if (data.is_risk) {
      passed.classList.remove("none");
      passed.textContent = data.is_risk ? "HONEYPOT" : "PASSED";
   }

   // Set Tabs data

   // Tab Scan
   const levels = ["high", "moderate", "low", "specific"];
   const buttonsHtml = levels
      .map((level) => {
         const count = data.token_data.indicator_data[level].count;
         const color =
            level === "high" ? "#ff0000" : level === "moderate" ? "#ffa500" : level === "low" ? "#90a500" : "#008000";
         return generateBurnBtnHtml(level.charAt(0).toUpperCase() + level.slice(1), color, count);
      })
      .join("");
   setHtmlContent(".tabs__left_buttons", buttonsHtml);
   setBurnItems();
   addFilterInBurnBtns();
   setTabsHeight();

   // Tab Tools
   setHtmlContent(".deploy-time", new Date(data.token_data.deploy_time).toDateString());

   // Tab Top Holders
   const ownersList = data.token_data.owners_list;
   const table = document.querySelector(".table");
   const rowsWrap = document.querySelector(".table__rows");
   const rows = table.querySelectorAll(".table__row");
   rows.forEach((row) => row.remove());

   ownersList.forEach((owner) => {
      const row = document.createElement("div");
      row.className = "table__row";

      row.innerHTML = `
      <div class="col-3" data-copy>
        ${owner.address}
      </div>
      <div class="col-3">
        ${owner.amount}
      </div>
      <div class="col-3">
        ${owner.percentage}
      </div>
    `;

      rowsWrap.appendChild(row);
   });

   function setBurnItems() {
      const burnContainer = getElBySelector(".tabs__burn");
      const rightContainer = getElBySelector(".tabs__right");

      const burnHtml = [];
      const rightHtml = [];

      let count = 0;

      levels.forEach((level) => {
         const details = data.token_data.indicator_data[level].details;
         details.forEach((detail, index) => {
            const itemHtml = generateBurnItemHtml(detail.text, detail.is_scam, level);
            if (count < 4) {
               burnHtml.push(itemHtml);
            } else {
               rightHtml.push(itemHtml);
            }
            count++;
         });
      });

      burnContainer.innerHTML = burnHtml.join("");
      rightContainer.innerHTML = rightHtml.join("");
   }

   function generateBurnItemHtml(text, isScam, type) {
      return `
      <div class="tabs__left_burn" data-burn-type="${type}">
        <p class="burn__text">${text}</p>
        <div class="${isScam ? "yes" : "no"}">
          ${isScam ? "YES" : "NO"}
        </div>
      </div>
    `;
   }

   function generateBurnBtnHtml(text, color, count) {
      return `
      <div class="tabs__left_button tabs-filter-btn" data-filter-btn="${text.toLowerCase()}">
        <span class="circle" style="background-color: ${color};"></span> ${text} (${count})
      </div>
    `;
   }

   function addFilterInBurnBtns() {
      const btns = document.querySelectorAll("[data-filter-btn]");
      const items = document.querySelectorAll("[data-burn-type]");

      btns.forEach((btn) => {
         btn.addEventListener("click", () => {
            btns.forEach((e) => e.classList.remove("_active"));
            btn.classList.add("_active");
            const btnType = btn.getAttribute("data-filter-btn");

            items.forEach((item) => {
               item.classList.remove("none");

               const itemType = item.getAttribute("data-burn-type");
               if (itemType !== btnType) {
                  item.classList.add("none");
               }
            });
         });
      });
   }

   function setTabsHeight() {
      const tabLefts = document.querySelectorAll(".tabs__left");
      const tabRights = document.querySelectorAll(".tabs__right");
      tabLefts.forEach((tabLeft, index) => {
         const tabRight = tabRights[index];
         if (tabRight) tabRight.style.maxHeight = tabLeft.clientHeight + "px";
      });
   }

   initCopied();
};

setDataPreview();

function setDefaultDataPreview() {
   const logo = getElBySelector(".project__info img");
   if (logo) logo.src = "./image/app/icon.svg";

   setHtmlContent(".project__info .name", "Name");
   setHtmlContent(".project__info .subname", "Name");
   setHtmlContent(".ca span", "CA:000000000000");
   setHtmlContent(".supply span", "1B");
   setDataCopy(".link-1", "#");
   setDataCopy(".link-3", "#");

   setHtmlContent(".market-cap", "$ " + "0 000 000");
   setHtmlContent(".token-price", "$ " + "0,000000");
   setHtmlContent(".tabs__left_buttons", "");
   setHtmlContent(".tabs__right", "");
   setHtmlContent(".tabs__burn", "");
   setHtmlContent(".liquidity__dollar", "");

   setHtmlContent(".tabs__full_1", "");
   setHtmlContent(".tabs__full_2", "");
   setHtmlContent(".tax-value", "-");

   // Set Liquidity
   const openLiquidity = getElBySelector(".open__liquidity");
   const lockLiquidity = getElBySelector(".lock__liquidity");

   openLiquidity.classList.add("none");
   lockLiquidity.classList.remove("none");

   const passed = getElBySelector(".passed");
   if (data.is_risk) {
      passed.classList.add("none");
   }
}

const refreshBtn = document.querySelector(".refresh");
refreshBtn.addEventListener("click", setDefaultDataPreview);
