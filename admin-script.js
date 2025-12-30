// admin-script.js - Fully Functional Version
const STORAGE_KEY = "diabloshd_traders_list";

// Start with EMPTY data (no defaults)
let tradersData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    sellers: [],
    middlemen: [],
    scammers: []
};


// ========== SAVE & RENDER DATA ==========
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tradersData));
    renderAllSections();
}

function renderSellers() {
    const container = document.querySelector(".seller-section .grid");
    container.innerHTML = "";

    if (tradersData.sellers.length === 0) {
        container.innerHTML = `<p class="text-gray-500 col-span-full text-center py-8">No Verified Sellers Added Yet</p>`;
        return;
    }

    tradersData.sellers.forEach(seller => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow-md p-6 card-hover border-t-4 border-seller";
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold">${seller.name}</h3>
                <span class="flex items-center text-sm bg-green-100 text-seller px-3 py-1 rounded-full">
                    <span class="w-2 h-2 bg-seller rounded-full mr-1 animate-pulse"></span> Online
                </span>
            </div>
            <p class="text-gray-600 mb-3">
                <i class="fas fa-paperclip text-gray-400 mr-2"></i> Telegram: <a href="https://t.me/${seller.telegram.replace('@', '')}" class="text-primary hover:underline">${seller.telegram}</a>
            </p>
            <p class="text-gray-600 mb-3">
                <i class="fas fa-gamepad text-gray-400 mr-2"></i> Services: ${seller.services}
            </p>
            <p class="text-gray-600 mb-4">
                <i class="fas fa-credit-card text-gray-400 mr-2"></i> Payments: ${seller.payments}
            </p>
            <a href="https://t.me/${seller.telegram.replace('@', '')}" class="block w-full text-center bg-seller hover:bg-seller/90 text-white font-medium py-2 rounded-lg transition-colors">
                <i class="fas fa-comments mr-1"></i> Contact Seller
            </a>
        `;
        container.appendChild(card);
    });
}

function renderMiddlemen() {
    const container = document.querySelector(".middleman-section .grid");
    container.innerHTML = "";

    if (tradersData.middlemen.length === 0) {
        container.innerHTML = `<p class="text-gray-500 col-span-full text-center py-8">No Verified Middlemen Added Yet</p>`;
        return;
    }

    tradersData.middlemen.forEach(middleman => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow-md p-6 card-hover border-t-4 border-middleman";
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold">${middleman.name}</h3>
                <span class="flex items-center text-sm bg-green-100 text-middleman px-3 py-1 rounded-full">
                    <span class="w-2 h-2 bg-middleman rounded-full mr-1 animate-pulse"></span> Online
                </span>
            </div>
            <p class="text-gray-600 mb-3">
                <i class="fas fa-paperclip text-gray-400 mr-2"></i> Telegram: <a href="https://t.me/${middleman.telegram.replace('@', '')}" class="text-primary hover:underline">${middleman.telegram}</a>
            </p>
            <p class="text-gray-600 mb-3">
                <i class="fas fa-gamepad text-gray-400 mr-2"></i> Covers: ${middleman.services}
            </p>
            <p class="text-gray-600 mb-4">
                <i class="fas fa-tag text-gray-400 mr-2"></i> Fee: ${middleman.fees}
            </p>
            <a href="https://t.me/${middleman.telegram.replace('@', '')}" class="block w-full text-center bg-middleman hover:bg-middleman/90 text-white font-medium py-2 rounded-lg transition-colors">
                <i class="fas fa-comments mr-1"></i> Contact Middleman
            </a>
        `;
        container.appendChild(card);
    });
}

function renderScammers() {
    const container = document.querySelector(".scammer-section .grid");
    container.innerHTML = "";

    if (tradersData.scammers.length === 0) {
        container.innerHTML = `<p class="text-gray-500 col-span-full text-center py-8">No Scammers/Trollers Added Yet</p>`;
        return;
    }

    tradersData.scammers.forEach(scammer => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow-md p-6 card-hover border-t-4 border-scammer";
        card.innerHTML = `
            <h3 class="text-xl font-bold text-scammer mb-3">${scammer.name}</h3>
            <p class="text-gray-600 mb-2">
                <i class="fas fa-paperclip text-gray-400 mr-2"></i> Telegram: <span class="text-scammer">${scammer.telegram}</span> (Blocked)
            </p>
            <p class="text-gray-600 mb-2">
                <i class="fas fa-user-secret text-gray-400 mr-2"></i> Aliases: ${scammer.aliases}
            </p>
            <p class="text-gray-600 mb-2">
                <i class="fas fa-exclamation-circle text-gray-400 mr-2"></i> Reported For: ${scammer.reportedFor}
            </p>
            <p class="text-gray-600">
                <i class="fas fa-calendar-alt text-gray-400 mr-2"></i> Last Report: ${new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long' })}
            </p>
        `;
        container.appendChild(card);
    });
}

function renderAllSections() {
    renderSellers();
    renderMiddlemen();
    renderScammers();
}


// ========== ADMIN FORM HANDLERS ==========
function setupAdminHandlers() {
    // ADD SELLER
    const sellerForm = document.querySelector(".admin-only > div:nth-child(2)");
    const sellerInputs = sellerForm.querySelectorAll("input");
    const addSellerBtn = sellerForm.querySelector("button");
    
    addSellerBtn.addEventListener("click", () => {
        const newSeller = {
            name: sellerInputs[0].value.trim(),
            telegram: sellerInputs[1].value.trim(),
            services: sellerInputs[2].value.trim(),
            payments: sellerInputs[3].value.trim()
        };

        if (!newSeller.name || !newSeller.telegram) {
            alert("⚠️ Please fill in NAME and TELEGRAM HANDLE at minimum!");
            return;
        }

        tradersData.sellers.push(newSeller);
        saveData();
        sellerInputs.forEach(input => input.value = "");
        alert("✅ Seller Added Successfully!");
    });

    // ADD MIDDLEMAN
    const middlemanForm = document.querySelector(".admin-only > div:nth-child(3)");
    const middlemanInputs = middlemanForm.querySelectorAll("input");
    const addMiddlemanBtn = middlemanForm.querySelector("button");
    
    addMiddlemanBtn.addEventListener("click", () => {
        const newMiddleman = {
            name: middlemanInputs[0].value.trim(),
            telegram: middlemanInputs[1].value.trim(),
            services: middlemanInputs[2].value.trim(),
            fees: middlemanInputs[3].value.trim()
        };

        if (!newMiddleman.name || !newMiddleman.telegram) {
            alert("⚠️ Please fill in NAME and TELEGRAM HANDLE at minimum!");
            return;
        }

        tradersData.middlemen.push(newMiddleman);
        saveData();
        middlemanInputs.forEach(input => input.value = "");
        alert("✅ Middleman Added Successfully!");
    });

    // ADD SCAMMER
    const scammerForm = document.querySelector(".admin-only > div:nth-child(4)");
    const scammerInputs = scammerForm.querySelectorAll("input");
    const addScammerBtn = scammerForm.querySelector("button");
    
    addScammerBtn.addEventListener("click", () => {
        const newScammer = {
            name: scammerInputs[0].value.trim(),
            telegram: scammerInputs[1].value.trim(),
            aliases: scammerInputs[2].value.trim(),
            reportedFor: scammerInputs[3].value.trim()
        };

        if (!newScammer.name || !newScammer.telegram) {
            alert("⚠️ Please fill in NAME and TELEGRAM HANDLE at minimum!");
            return;
        }

        tradersData.scammers.push(newScammer);
        saveData();
        scammerInputs.forEach(input => input.value = "");
        alert("✅ Scammer Added Successfully!");
    });

    // EDIT ENTRIES
    const editBtn = document.querySelector(".admin-only > div:nth-child(5) button:first-child");
    editBtn.addEventListener("click", () => {
        const type = prompt("Enter type to edit (sellers/middlemen/scammers):").toLowerCase();
        const index = parseInt(prompt("Enter entry INDEX (starts at 0):"));

        if (!tradersData[type] || isNaN(index) || index < 0 || index >= tradersData[type].length) {
            alert("⚠️ Invalid type or index!");
            return;
        }

        const entry = tradersData[type][index];
        if (type === "sellers") {
            entry.name = prompt("New Name:", entry.name) || entry.name;
            entry.telegram = prompt("New Telegram:", entry.telegram) || entry.telegram;
            entry.services = prompt("New Services:", entry.services) || entry.services;
            entry.payments = prompt("New Payments:", entry.payments) || entry.payments;
        } else if (type === "middlemen") {
            entry.name = prompt("New Name:", entry.name) || entry.name;
            entry.telegram = prompt("New Telegram:", entry.telegram) || entry.telegram;
            entry.services = prompt("New Covers:", entry.services) || entry.services;
            entry.fees = prompt("New Fees:", entry.fees) || entry.fees;
        } else if (type === "scammers") {
            entry.name = prompt("New Name:", entry.name) || entry.name;
            entry.telegram = prompt("New Telegram:", entry.telegram) || entry.telegram;
            entry.aliases = prompt("New Aliases:", entry.aliases) || entry.aliases;
            entry.reportedFor = prompt("New Report Reason:", entry.reportedFor) || entry.reportedFor;
        }

        saveData();
        alert("✅ Entry Updated!");
    });

    // DELETE ENTRIES
    const deleteBtn = document.querySelector(".admin-only > div:nth-child(5) button:last-child");
    deleteBtn.addEventListener("click", () => {
        const type = prompt("Enter type to delete from (sellers/middlemen/scammers):").toLowerCase();
        const index = parseInt(prompt("Enter entry INDEX (starts at 0):"));

        if (!tradersData[type] || isNaN(index) || index < 0 || index >= tradersData[type].length) {
            alert("⚠️ Invalid type or index!");
            return;
        }

        if (confirm(`❓ Delete ${tradersData[type][index].name}?`)) {
            tradersData[type].splice(index, 1);
            saveData();
            alert("✅ Entry Deleted!");
        }
    });
}


// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
    renderAllSections();
    setupAdminHandlers();
});
