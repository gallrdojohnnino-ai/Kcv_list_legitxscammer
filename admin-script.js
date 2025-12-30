// ========== ADMIN FORM HANDLERS ==========
function setupAdminHandlers() {
    // --- ADD SELLER ---
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
        updateManageDropdowns(); // Refresh edit/delete lists
        alert("✅ Seller Added Successfully!");
    });

    // --- ADD MIDDLEMAN ---
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
        updateManageDropdowns(); // Refresh edit/delete lists
        alert("✅ Middleman Added Successfully!");
    });

    // --- ADD SCAMMER ---
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
        updateManageDropdowns(); // Refresh edit/delete lists
        alert("✅ Scammer Added Successfully!");
    });

    // --- EDIT/DELETE DROPDOWN SETUP ---
    const editTypeSel = document.getElementById("edit-type");
    const editEntrySel = document.getElementById("edit-entry");
    const editBtn = document.getElementById("edit-btn");

    const deleteTypeSel = document.getElementById("delete-type");
    const deleteEntrySel = document.getElementById("delete-entry");
    const deleteBtn = document.getElementById("delete-btn");

    // Refresh dropdown lists when data changes
    function updateManageDropdowns() {
        // Reset all dropdowns
        editEntrySel.innerHTML = "<option value=''>Select Entry First</option>";
        editEntrySel.disabled = true;
        editBtn.disabled = true;

        deleteEntrySel.innerHTML = "<option value=''>Select Entry First</option>";
        deleteEntrySel.disabled = true;
        deleteBtn.disabled = true;
    }

    // Populate edit entries when type is selected
    editTypeSel.addEventListener("change", () => {
        const type = editTypeSel.value;
        editEntrySel.innerHTML = "<option value=''>Select Entry</option>";
        
        if (!type || tradersData[type].length === 0) {
            editEntrySel.disabled = true;
            editBtn.disabled = true;
            return;
        }

        // Add entries to dropdown (show name + index)
        tradersData[type].forEach((item, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${index + 1}. ${item.name} (${item.telegram})`;
            editEntrySel.appendChild(option);
        });

        editEntrySel.disabled = false;
    });

    // Enable edit button when entry is selected
    editEntrySel.addEventListener("change", () => {
        editBtn.disabled = (editEntrySel.value === "");
    });

    // EDIT BUTTON ACTION
    editBtn.addEventListener("click", () => {
        const type = editTypeSel.value;
        const index = parseInt(editEntrySel.value);
        const entry = tradersData[type][index];

        if (type === "sellers") {
            entry.name = prompt("Enter New Name:", entry.name) || entry.name;
            entry.telegram = prompt("Enter New Telegram:", entry.telegram) || entry.telegram;
            entry.services = prompt("Enter New Services:", entry.services) || entry.services;
            entry.payments = prompt("Enter New Payments:", entry.payments) || entry.payments;
        } else if (type === "middlemen") {
            entry.name = prompt("Enter New Name:", entry.name) || entry.name;
            entry.telegram = prompt("Enter New Telegram:", entry.telegram) || entry.telegram;
            entry.services = prompt("Enter New Covered Services:", entry.services) || entry.services;
            entry.fees = prompt("Enter New Fees:", entry.fees) || entry.fees;
        } else if (type === "scammers") {
            entry.name = prompt("Enter New Name/Alias:", entry.name) || entry.name;
            entry.telegram = prompt("Enter New Telegram:", entry.telegram) || entry.telegram;
            entry.aliases = prompt("Enter New Aliases:", entry.aliases) || entry.aliases;
            entry.reportedFor = prompt("Enter New Report Reason:", entry.reportedFor) || entry.reportedFor;
        }

        saveData();
        updateManageDropdowns(); // Refresh lists
        alert("✅ Entry Updated Successfully!");
    });

    // Populate delete entries when type is selected
    deleteTypeSel.addEventListener("change", () => {
        const type = deleteTypeSel.value;
        deleteEntrySel.innerHTML = "<option value=''>Select Entry</option>";
        
        if (!type || tradersData[type].length === 0) {
            deleteEntrySel.disabled = true;
            deleteBtn.disabled = true;
            return;
        }

        // Add entries to dropdown (show name + index)
        tradersData[type].forEach((item, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${index + 1}. ${item.name} (${item.telegram})`;
            deleteEntrySel.appendChild(option);
        });

        deleteEntrySel.disabled = false;
    });

    // Enable delete button when entry is selected
    deleteEntrySel.addEventListener("change", () => {
        deleteBtn.disabled = (deleteEntrySel.value === "");
    });

    // DELETE BUTTON ACTION
    deleteBtn.addEventListener("click", () => {
        const type = deleteTypeSel.value;
        const index = parseInt(deleteEntrySel.value);
        const entryName = tradersData[type][index].name;

        if (confirm(`❓ Are you sure you want to delete ${entryName}? This cannot be undone!`)) {
            tradersData[type].splice(index, 1);
            saveData();
            updateManageDropdowns(); // Refresh lists
            alert("✅ Entry Deleted Successfully!");
        }
    });

    // Initialize dropdowns on load
    updateManageDropdowns();
}
