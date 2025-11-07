// Tag Categories (defined early for use in persistence functions)
const tagCategories = ['composition', 'garment-type', 'style', 'season', 'brand', 'other'];

// Data Persistence Functions
function saveTagsToStorage() {
    const tagsData = {};
    tagCategories.forEach(category => {
        const container = document.querySelector(`#add-product-screen [data-category="${category}"]`);
        if (container) {
            tagsData[category] = Array.from(container.querySelectorAll('.tag-btn')).map(btn => ({
                tag: btn.dataset.tag,
                text: btn.textContent.replace('✎', '').replace('×', '').trim()
            }));
        }
    });
    localStorage.setItem('pinweiTags', JSON.stringify(tagsData));
}

function loadTagsFromStorage() {
    const savedTags = localStorage.getItem('pinweiTags');
    if (savedTags) {
        try {
            const tagsData = JSON.parse(savedTags);
            tagCategories.forEach(category => {
                const container = document.querySelector(`#add-product-screen [data-category="${category}"]`);
                if (container && tagsData[category]) {
                    container.innerHTML = '';
                    tagsData[category].forEach(tagInfo => {
                        const btn = document.createElement('button');
                        btn.type = 'button';
                        btn.className = 'tag-btn';
                        btn.dataset.tag = tagInfo.tag;
                        btn.innerHTML = `${tagInfo.text} <span class="tag-edit-btn" style="display: none;">✎</span> <span class="tag-delete-btn" style="display: none;">×</span>`;
                        container.appendChild(btn);
                    });
                }
            });
            return true;
        } catch (e) {
            console.error('Error loading tags from storage:', e);
        }
    }
    return false;
}

function saveFabricDataToStorage() {
    localStorage.setItem('pinweiFabricData', JSON.stringify(fabricData));
}

function loadFabricDataFromStorage() {
    const savedData = localStorage.getItem('pinweiFabricData');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            if (parsed.recent && Array.isArray(parsed.recent)) {
                fabricData.recent = parsed.recent;
            }
            if (parsed.favorites && Array.isArray(parsed.favorites)) {
                fabricData.favorites = parsed.favorites;
            }
            // matched is always calculated, so we don't need to load it
            return true;
        } catch (e) {
            console.error('Error loading fabric data from storage:', e);
        }
    }
    return false;
}

// Language Management
let currentLang = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateAllText();
    
    // Update language toggle button
    const langText = document.getElementById('lang-text');
    langText.textContent = lang === 'en' ? '中文' : 'English';
}

function t(key) {
    return translations[currentLang][key] || translations.en[key] || key;
}

function updateAllText() {
    // Update all elements with data-key attribute
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        if (key && translations[currentLang][key]) {
            if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
                el.placeholder = t(key);
            } else {
                el.textContent = t(key);
            }
        }
    });
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach((btn, index) => {
        const keys = ['navHome', 'navAddProduct', 'navMatches', 'navFavorites', 'navSettings'];
        if (keys[index]) {
            btn.textContent = t(keys[index]);
        }
    });
    
    // Re-render all fabric cards with new language
    renderHomeCards();
    renderMatchesCards();
    
    // Update product entry form labels
    updateFormLabels();
}

function updateFormLabels() {
    const labels = {
        'product-name-en': t('productNameLabel'),
        'product-name-zh': t('productNameCnLabel'),
        'product-price': t('productPriceLabel'),
        'product-origin-name': t('productOriginLabel'),
        'product-desc-en': t('productDescriptionEnLabel'),
        'product-desc-zh': t('productDescriptionCnLabel'),
    };
    
    Object.keys(labels).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.textContent = labels[id];
            }
            if (input.placeholder) {
                // Update placeholders based on language
                if (id === 'product-name-en') {
                    input.placeholder = currentLang === 'zh' ? '输入产品英文名称' : 'Enter product name in English';
                } else if (id === 'product-name-zh') {
                    input.placeholder = currentLang === 'zh' ? '输入产品中文名称' : 'Enter product name in Chinese';
                } else if (id === 'product-origin-name') {
                    input.placeholder = currentLang === 'zh' ? '输入产品開發信息' : 'Enter product development information';
                } else if (id === 'product-desc-en') {
                    input.placeholder = currentLang === 'zh' ? '输入产品英文描述' : 'Enter product description in English';
                } else if (id === 'product-desc-zh') {
                    input.placeholder = currentLang === 'zh' ? '输入产品中文描述' : 'Enter product description in Chinese';
                }
            }
        }
    });
    
    // Update origin image label
    const originImageLabel = document.querySelector('label[data-key="productOriginImageLabel"]');
    if (originImageLabel) {
        originImageLabel.textContent = t('productOriginImageLabel');
    }
    
    // Update upload area text
    const uploadText = document.querySelector('#upload-placeholder span[data-key="uploadText"]');
    const uploadHint = document.querySelector('#upload-placeholder span[data-key="uploadHint"]');
    if (uploadText) uploadText.textContent = t('uploadText');
    if (uploadHint) uploadHint.textContent = t('uploadHint');
    
    const originUploadText = document.querySelector('#origin-upload-placeholder span[data-key="uploadText"]');
    const originUploadHint = document.querySelector('#origin-upload-placeholder span[data-key="uploadHint"]');
    if (originUploadText) originUploadText.textContent = t('uploadText');
    if (originUploadHint) originUploadHint.textContent = t('uploadHint');
    
    // Update custom tag input placeholder
    const customTagInput = document.getElementById('custom-tag-input');
    if (customTagInput) {
        customTagInput.placeholder = currentLang === 'zh' ? '输入自定义标签并按回车' : 'Type to add custom tag and press Enter';
    }
    
    // Update selected tags label
    const selectedTagsLabel = document.querySelector('.selected-tags-label');
    if (selectedTagsLabel) {
        selectedTagsLabel.textContent = t('selectedTags');
    }
    
    // Update add tag button
    const addTagBtn = document.getElementById('add-custom-tag-btn');
    if (addTagBtn) {
        addTagBtn.textContent = t('addTag');
    }
}

// Language Toggle
document.getElementById('lang-toggle').addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
});

// Navigation
const navButtons = document.querySelectorAll('.nav-btn');
const screens = document.querySelectorAll('.screen');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetScreen = btn.dataset.screen;
        
        // Check if sales team tries to access add-product screen
        if (targetScreen === 'add-product' && !isAdmin()) {
            alert('只有管理员可以访问此页面');
            return;
        }
        
        // Update active nav button
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show target screen
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById(`${targetScreen}-screen`).classList.add('active');
        
        // If matches screen is opened, load all products and initialize search/sort
        if (targetScreen === 'matches') {
            // Load all products from recent into matched
            fabricData.matched = [...fabricData.recent];
            renderMatchesCards();
            // Initialize search and sort buttons when matches screen is shown
            setTimeout(() => initializeMatchesSearchAndSort(), 150);
        }
        
        // Update UI based on role after navigation
        updateUIForUserRole();
    });
});

// Chip Selection
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chip.classList.toggle('selected');
    });
});

// Get localized fabric data
function getFabricName(fabric) {
    return typeof fabric.name === 'object' ? fabric.name[currentLang] : fabric.name;
}

function getFabricTags(fabric) {
    if (typeof fabric.tags === 'object' && fabric.tags[currentLang]) {
        return fabric.tags[currentLang];
    }
    return Array.isArray(fabric.tags) ? fabric.tags : [];
}

function getFabricDescription(fabric) {
    return typeof fabric.description === 'object' ? fabric.description[currentLang] : fabric.description;
}

function getFabricPros(fabric) {
    return typeof fabric.pros === 'object' ? fabric.pros[currentLang] : fabric.pros;
}

function getFabricCons(fabric) {
    return typeof fabric.cons === 'object' ? fabric.cons[currentLang] : fabric.cons;
}

// Render Fabric Cards
function renderFabricCard(fabric, container, showEditDelete = false) {
    const card = document.createElement('div');
    card.className = 'fabric-card';
    const name = getFabricName(fabric);
    const tags = getFabricTags(fabric);
    const origin = fabric.origin || '';
    const productCode = fabric.productCode || '';
    
    card.innerHTML = `
        <img src="${fabric.image}" alt="${name}" onerror="this.src='https://via.placeholder.com/400x200?text=Fabric'">
        <div class="fabric-card-content">
            ${productCode ? `<div class="fabric-card-code">${productCode}</div>` : ''}
            <div class="fabric-card-name">${name}</div>
            <div class="fabric-card-tags">
                ${tags.map(tag => `<span class="fabric-card-tag">${tag}</span>`).join('')}
            </div>
            ${origin ? `<div class="fabric-card-origin">產品開發：${origin}</div>` : ''}
            <div class="fabric-card-price">${fabric.price}</div>
            ${showEditDelete ? `<button class="edit-product-btn" data-product-id="${fabric.id}" title="编辑产品">✎</button>` : ''}
            ${showEditDelete ? `<button class="delete-product-btn" data-product-id="${fabric.id}" title="删除产品">🗑</button>` : ''}
        </div>
    `;
    
    if (showEditDelete) {
        const deleteBtn = card.querySelector('.delete-product-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteProduct(fabric.id);
            });
        }
        
        const editBtn = card.querySelector('.edit-product-btn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Show modal with product details first, then switch to edit mode
                showProductDetail(fabric);
                modal.classList.add('active');
                // Trigger edit button click after a short delay to ensure modal is visible
                setTimeout(() => {
                    document.getElementById('edit-product-btn').click();
                }, 100);
            });
        }
    }
    
    card.addEventListener('click', () => showProductDetail(fabric));
    container.appendChild(card);
}

// Render cards for home screen
function renderHomeCards() {
    const container = document.querySelector('#home-screen .fabric-cards.horizontal');
    container.innerHTML = '';
    fabricData.recent.forEach(fabric => renderFabricCard(fabric, container, false));
}

// Render cards for matches screen
// Search functionality for matches page
let currentSearchQuery = '';

function searchProducts(query) {
    const searchQuery = query ? query.toLowerCase().trim() : '';
    currentSearchQuery = searchQuery;
    
    // Get all products from recent
    const allProducts = [...fabricData.recent];
    
    if (!currentSearchQuery) {
        // If search is empty, check if there are tag filters
        if (selectedInquiryTags.length > 0) {
            filterMatchesByTags();
        } else {
            // No search, no tags - show all products
            fabricData.matched = [...allProducts];
            // Apply current sort if any
            if (currentSortOption) {
                sortProducts(currentSortOption);
            } else {
                renderMatchesCards();
            }
        }
        return;
    }
    
    // Search through all products
    const searchResults = allProducts.filter(product => {
        // Search in product code
        const productCode = (product.productCode || '').toLowerCase();
        if (productCode.includes(currentSearchQuery)) return true;
        
        // Search in product name (both languages)
        const nameZh = (product.name?.zh || '').toLowerCase();
        const nameEn = (product.name?.en || '').toLowerCase();
        if (nameZh.includes(currentSearchQuery) || nameEn.includes(currentSearchQuery)) return true;
        
        // Search in tags
        const tagsZh = product.tags?.zh || [];
        const tagsEn = product.tags?.en || [];
        const allTags = [...tagsZh, ...tagsEn].map(tag => tag.toLowerCase());
        if (allTags.some(tag => tag.includes(currentSearchQuery))) return true;
        
        // Search in composition
        const composition = (product.composition || '').toLowerCase();
        if (composition.includes(currentSearchQuery)) return true;
        
        // Search in description
        const descZh = (product.description?.zh || '').toLowerCase();
        const descEn = (product.description?.en || '').toLowerCase();
        if (descZh.includes(currentSearchQuery) || descEn.includes(currentSearchQuery)) return true;
        
        // Search in origin (product development)
        const origin = (product.origin || '').toLowerCase();
        if (origin.includes(currentSearchQuery)) return true;
        
        return false;
    });
    
    fabricData.matched = searchResults;
    
    // Apply current sort if any
    if (currentSortOption) {
        sortProducts(currentSortOption);
    } else {
        renderMatchesCards();
    }
}

function renderMatchesCards() {
    const container = document.querySelector('#matches-screen .fabric-cards.grid');
    container.innerHTML = '';
    
    if (fabricData.matched.length === 0) {
        const message = currentSearchQuery 
            ? `没有找到与 "${currentSearchQuery}" 匹配的产品`
            : '没有找到匹配的产品';
        const suggestion = currentSearchQuery
            ? '请尝试其他搜索关键词'
            : '请尝试选择其他标签进行搜索';
        container.innerHTML = `
            <div class="empty-state">
                <h3>${message}</h3>
                <p>${suggestion}</p>
            </div>
        `;
    } else {
        // Only show edit/delete buttons if user is admin
        fabricData.matched.forEach(fabric => renderFabricCard(fabric, container, isAdmin()));
    }
}


// Product Detail Modal
const modal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');

function showProductDetail(fabric) {
    const name = getFabricName(fabric);
    const description = getFabricDescription(fabric);
    const pros = getFabricPros(fabric);
    const cons = getFabricCons(fabric);
    const origin = fabric.origin || '';
    const originImages = fabric.originImages && Array.isArray(fabric.originImages) ? fabric.originImages : (fabric.originImage ? [fabric.originImage] : []);
    
    // Display images - support both single image and multiple images
    // Make sure modal-image element exists (in case it was removed)
    let modalImageEl = document.getElementById('modal-image');
    if (!modalImageEl) {
        // Recreate if missing
        const modalViewMode = document.getElementById('modal-view-mode');
        const newImg = document.createElement('img');
        newImg.id = 'modal-image';
        newImg.className = 'modal-image';
        newImg.alt = 'Fabric';
        newImg.src = '';
        modalViewMode.insertBefore(newImg, modalViewMode.firstChild);
        modalImageEl = newImg;
    }
    
    const modalImageContainer = modalImageEl.parentElement;
    const images = fabric.images && Array.isArray(fabric.images) ? fabric.images : (fabric.image ? [fabric.image] : []);
    
    // Clear previous gallery if exists
    const existingGallery = modalImageContainer.querySelector('.modal-product-images-gallery');
    if (existingGallery) {
        existingGallery.remove();
    }
    
    // Show images in modal
    if (images.length > 1) {
        // Multiple images - create gallery below main image
        const gallery = document.createElement('div');
        gallery.className = 'modal-product-images-gallery';
        gallery.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; margin-top: 12px;';
        
        images.forEach((img, idx) => {
            const imgEl = document.createElement('img');
            imgEl.src = img;
            imgEl.alt = `Product image ${idx + 1}`;
            imgEl.style.cssText = 'width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s;';
            imgEl.addEventListener('click', () => {
                document.getElementById('modal-image').src = img;
                // Update active state
                gallery.querySelectorAll('img').forEach(i => i.style.borderColor = 'transparent');
                imgEl.style.borderColor = 'var(--accent)';
            });
            imgEl.addEventListener('mouseenter', () => {
                if (imgEl.style.borderColor !== 'var(--accent)') {
                    imgEl.style.borderColor = 'rgba(184, 169, 137, 0.5)';
                }
            });
            imgEl.addEventListener('mouseleave', () => {
                if (imgEl.style.borderColor !== 'var(--accent)') {
                    imgEl.style.borderColor = 'transparent';
                }
            });
            gallery.appendChild(imgEl);
        });
        
        modalImageContainer.appendChild(gallery);
        document.getElementById('modal-image').src = images[0];
        // Set first image as active
        if (gallery.firstChild) {
            gallery.firstChild.style.borderColor = 'var(--accent)';
        }
    } else if (images.length === 1) {
        // Single image
        document.getElementById('modal-image').src = images[0];
    } else {
        document.getElementById('modal-image').src = 'https://via.placeholder.com/400x200?text=No+Image';
    }
    
    // Product Code (shown first, above name)
    if (fabric.productCode) {
        document.getElementById('modal-code').innerHTML = `<strong>产品编号：</strong>${fabric.productCode}`;
        document.getElementById('modal-code').style.display = 'block';
    } else {
        document.getElementById('modal-code').style.display = 'none';
    }
    
    // Product Name (shown after code)
    document.getElementById('modal-name').textContent = name;
    
    // Description
    let descriptionHtml = description || '';
    document.getElementById('modal-description').innerHTML = descriptionHtml ? `<strong>产品介绍：</strong><br>${descriptionHtml}` : '';
    
    // Composition
    if (fabric.composition) {
        document.getElementById('modal-composition').innerHTML = `<strong>成分：</strong><br>${fabric.composition}`;
        document.getElementById('modal-composition').style.display = 'block';
    } else {
        document.getElementById('modal-composition').style.display = 'none';
    }
    
    // Characteristics
    if (fabric.characteristics) {
        document.getElementById('modal-characteristics').innerHTML = `<strong>面料特点：</strong><br>${fabric.characteristics}`;
        document.getElementById('modal-characteristics').style.display = 'block';
    } else {
        document.getElementById('modal-characteristics').style.display = 'none';
    }
    
    // Specifications
    let specsHtml = '';
    if (fabric.specs) specsHtml += `<strong>规格：</strong>${fabric.specs}<br>`;
    if (fabric.yield) specsHtml += `<strong>出米数：</strong>${fabric.yield}`;
    if (specsHtml) {
        document.getElementById('modal-specs').innerHTML = specsHtml;
        document.getElementById('modal-specs').style.display = 'block';
    } else {
        document.getElementById('modal-specs').style.display = 'none';
    }
    
    // Care Instructions
    if (fabric.care) {
        document.getElementById('modal-care').innerHTML = `<strong>洗护建议：</strong><br>${fabric.care}`;
        document.getElementById('modal-care').style.display = 'block';
    } else {
        document.getElementById('modal-care').style.display = 'none';
    }
    
    // Warm Tips
    if (fabric.warmTips) {
        document.getElementById('modal-warm-tips').innerHTML = `<strong>温馨提示：</strong><br>${fabric.warmTips}`;
        document.getElementById('modal-warm-tips').style.display = 'block';
    } else {
        document.getElementById('modal-warm-tips').style.display = 'none';
    }
    
    // Selling Point
    const sellingPointDiv = document.getElementById('modal-selling-point');
    if (fabric.sellingPoint) {
        sellingPointDiv.innerHTML = `<strong>卖点：</strong><br>${fabric.sellingPoint}`;
        sellingPointDiv.style.display = 'block';
    } else {
        sellingPointDiv.style.display = 'none';
    }
    
    // Origin (Product Development)
    if (origin) {
        let originHtml = `<strong>產品開發：</strong>${origin}`;
        if (originImages.length > 0) {
            originHtml += `<br><div class="modal-origin-images" style="margin-top: 8px; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px;">`;
            originImages.forEach((img, idx) => {
                originHtml += `<img src="${img}" alt="Origin image ${idx + 1}" style="max-width: 100%; max-height: 200px; border-radius: 8px; object-fit: cover;">`;
            });
            originHtml += `</div>`;
        }
        document.getElementById('modal-description').innerHTML += (descriptionHtml ? '<br><br>' : '') + originHtml;
    }
    
    // Store current product ID for editing
    modal.dataset.productId = fabric.id;
    
    const prosDiv = document.getElementById('modal-pros');
    prosDiv.innerHTML = `
        <h3>${t('pros')}</h3>
        <ul>${pros.map(p => `<li>• ${p}</li>`).join('')}</ul>
    `;
    
    const consDiv = document.getElementById('modal-cons');
    consDiv.innerHTML = `
        <h3>${t('cons')}</h3>
        <ul>${cons.map(c => `<li>• ${c}</li>`).join('')}</ul>
    `;
    
    document.getElementById('modal-price').textContent = fabric.price;
    modal.classList.add('active');
    
    // Update add to proposal button text
    document.getElementById('add-to-proposal-btn').textContent = t('addToProposal');
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.getElementById('modal-view-mode').style.display = 'block';
    document.getElementById('modal-edit-mode').style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.getElementById('modal-view-mode').style.display = 'block';
        document.getElementById('modal-edit-mode').style.display = 'none';
    }
});

// Selected tags for edit modal
let selectedEditTags = [];
let editUploadedImageData = []; // Changed to array for multiple images
let editUploadedOriginImageData = []; // Changed to array for multiple origin images

// Populate edit modal tag containers from add product page
function populateEditModalTags() {
    tagCategories.forEach(category => {
        const addProductContainer = document.querySelector(`#add-product-screen [data-category="${category}"]`);
        const editContainer = document.querySelector(`#modal-edit-mode [data-category="${category}"]`);
        
        if (addProductContainer && editContainer) {
            editContainer.innerHTML = '';
            
            // Copy all tags from add product page to edit modal
            addProductContainer.querySelectorAll('.tag-btn').forEach(addBtn => {
                const tag = addBtn.dataset.tag;
                const tagText = addBtn.textContent.replace('✎', '').replace('×', '').trim();
                
                const editBtn = document.createElement('button');
                editBtn.type = 'button';
                editBtn.className = 'tag-btn';
                editBtn.dataset.tag = tag;
                editBtn.innerHTML = `${tagText} <span class="tag-edit-btn" style="display: none;">✎</span> <span class="tag-delete-btn" style="display: none;">×</span>`;
                
                if (selectedEditTags.includes(tag)) {
                    editBtn.classList.add('selected');
                }
                
                editContainer.appendChild(editBtn);
            });
        }
    });
    
    // Initialize tag buttons for edit modal
    initializeEditModalTagButtons();
}

// Initialize tag buttons for edit modal
function initializeEditModalTagButtons() {
    tagCategories.forEach(category => {
        const container = document.querySelector(`#modal-edit-mode [data-category="${category}"]`);
        if (!container) return;
        
        container.querySelectorAll('.tag-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                if (e.target.classList.contains('tag-edit-btn') || e.target.classList.contains('tag-delete-btn')) {
                    return;
                }
                const tag = newBtn.dataset.tag;
                toggleEditTag(tag);
            });
            
            const editBtn = newBtn.querySelector('.tag-edit-btn');
            const deleteBtn = newBtn.querySelector('.tag-delete-btn');
            
            newBtn.addEventListener('mouseenter', () => {
                if (editBtn) editBtn.style.display = 'inline';
                if (deleteBtn) deleteBtn.style.display = 'inline';
            });
            
            newBtn.addEventListener('mouseleave', () => {
                if (editBtn) editBtn.style.display = 'none';
                if (deleteBtn) deleteBtn.style.display = 'none';
            });
        });
    });
    
    // Initialize custom tag inputs for edit modal
    document.querySelectorAll('#modal-edit-mode .custom-tag-input-field').forEach(input => {
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
        
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tag = newInput.value.trim();
                const category = newInput.dataset.category;
                
                if (tag) {
                    const container = document.querySelector(`#modal-edit-mode [data-category="${category}"]`);
                    const existingTags = Array.from(container.querySelectorAll('.tag-btn')).map(btn => btn.dataset.tag);
                    
                    if (existingTags.includes(tag)) {
                        alert('此标签已存在');
                        return;
                    }
                    
                    const newBtn = document.createElement('button');
                    newBtn.type = 'button';
                    newBtn.className = 'tag-btn';
                    newBtn.dataset.tag = tag;
                    newBtn.innerHTML = `${tag} <span class="tag-edit-btn" style="display: none;">✎</span> <span class="tag-delete-btn" style="display: none;">×</span>`;
                    
                    container.appendChild(newBtn);
                    newInput.value = '';
                    
                    newBtn.addEventListener('click', () => toggleEditTag(tag));
                    
                    // Also add to add product page
                    const addProductContainer = document.querySelector(`#add-product-screen [data-category="${category}"]`);
                    if (addProductContainer && !Array.from(addProductContainer.querySelectorAll('.tag-btn')).some(b => b.dataset.tag === tag)) {
                        const syncBtn = document.createElement('button');
                        syncBtn.type = 'button';
                        syncBtn.className = 'tag-btn';
                        syncBtn.dataset.tag = tag;
                        syncBtn.innerHTML = `${tag} <span class="tag-edit-btn" style="display: none;">✎</span> <span class="tag-delete-btn" style="display: none;">×</span>`;
                        addProductContainer.appendChild(syncBtn);
                        initializeTagButtons();
                        syncInquiryTags();
                        
                        // Save tags to localStorage
                        saveTagsToStorage();
                    }
                }
            }
        });
    });
    
    updateEditSelectedTagsDisplay();
}

function toggleEditTag(tag) {
    const index = selectedEditTags.indexOf(tag);
    if (index > -1) {
        selectedEditTags.splice(index, 1);
    } else {
        selectedEditTags.push(tag);
    }
    updateEditTagButtons();
    updateEditSelectedTagsDisplay();
}

function updateEditTagButtons() {
    document.querySelectorAll('#modal-edit-mode .tag-btn').forEach(btn => {
        if (selectedEditTags.includes(btn.dataset.tag)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function updateEditSelectedTagsDisplay() {
    const container = document.getElementById('edit-selected-tags-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    selectedEditTags.forEach(tag => {
        const tagItem = document.createElement('div');
        tagItem.className = 'selected-tag-item';
        tagItem.innerHTML = `
            <span>${tag}</span>
            <button type="button" class="remove-tag" data-tag="${tag}">×</button>
        `;
        container.appendChild(tagItem);
    });
    
    container.querySelectorAll('.remove-tag').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tag = btn.dataset.tag;
            toggleEditTag(tag);
        });
    });
}

// Edit Product Button
document.getElementById('edit-product-btn').addEventListener('click', () => {
    // Check if user is admin
    if (!isAdmin()) {
        alert('只有管理员可以编辑产品');
        return;
    }
    
    const productId = modal.dataset.productId;
    if (!productId) return;
    
    // Find product
    const product = [...fabricData.recent, ...fabricData.matched].find(p => p.id === productId);
    if (!product) return;
    
    // Switch to edit mode
    document.getElementById('modal-view-mode').style.display = 'none';
    document.getElementById('modal-edit-mode').style.display = 'block';
    
    // Populate edit form
    document.getElementById('edit-product-code').value = product.productCode || '';
    document.getElementById('edit-product-name-zh').value = product.name?.zh || '';
    document.getElementById('edit-product-price').value = product.price || '';
    document.getElementById('edit-product-origin').value = product.origin || '';
    document.getElementById('edit-product-composition').value = product.composition || '';
    document.getElementById('edit-product-characteristics').value = product.characteristics || '';
    document.getElementById('edit-product-specs').value = product.specs || '';
    document.getElementById('edit-product-yield').value = product.yield || '';
    document.getElementById('edit-product-care').value = product.care || '';
    document.getElementById('edit-product-warm-tips').value = product.warmTips || '';
    document.getElementById('edit-product-description').value = product.description?.zh || '';
    document.getElementById('edit-product-selling-point').value = product.sellingPoint || '';
    
    // Populate Pros and Cons
    const pros = product.pros?.zh || [];
    const cons = product.cons?.zh || [];
    document.getElementById('edit-product-pros').value = pros.join('\n');
    document.getElementById('edit-product-cons').value = cons.join('\n');
    
    // Populate images
    const editUploadPlaceholder = document.getElementById('edit-upload-placeholder');
    
    // Load existing images (support both old single image and new multiple images)
    if (product.images && Array.isArray(product.images)) {
        editUploadedImageData = [...product.images];
    } else if (product.image) {
        editUploadedImageData = [product.image];
    } else {
        editUploadedImageData = [];
    }
    
    updateImageGallery('edit-product-images-gallery', editUploadedImageData);
    editUploadPlaceholder.style.display = editUploadedImageData.length > 0 ? 'none' : 'flex';
    
    const editOriginUploadPlaceholder = document.getElementById('edit-origin-upload-placeholder');
    
    // Load existing origin images (support both old single image and new multiple images)
    if (product.originImages && Array.isArray(product.originImages)) {
        editUploadedOriginImageData = [...product.originImages];
    } else if (product.originImage) {
        editUploadedOriginImageData = [product.originImage];
    } else {
        editUploadedOriginImageData = [];
    }
    
    updateImageGallery('edit-origin-images-gallery', editUploadedOriginImageData);
    editOriginUploadPlaceholder.style.display = editUploadedOriginImageData.length > 0 ? 'none' : 'flex';
    
    // Initialize selected tags for edit
    selectedEditTags = [...(product.tags?.zh || [])];
    
    // Populate tag containers from add product page
    populateEditModalTags();
    
    // Update selected state
    updateEditTagButtons();
    updateEditSelectedTagsDisplay();
});

// Cancel Edit
document.getElementById('cancel-edit-btn').addEventListener('click', () => {
    // Don't clear edit data on cancel - reload from product to reset
    const productId = modal.dataset.productId;
    if (productId) {
        const product = [...fabricData.recent, ...fabricData.matched].find(p => p.id === productId);
        if (product) {
            // Reload edit form with original product data to reset changes
            document.getElementById('edit-product-code').value = product.productCode || '';
            document.getElementById('edit-product-name-zh').value = product.name?.zh || '';
            document.getElementById('edit-product-price').value = product.price || '';
            document.getElementById('edit-product-origin').value = product.origin || '';
            document.getElementById('edit-product-composition').value = product.composition || '';
            document.getElementById('edit-product-characteristics').value = product.characteristics || '';
            document.getElementById('edit-product-specs').value = product.specs || '';
            document.getElementById('edit-product-yield').value = product.yield || '';
            document.getElementById('edit-product-care').value = product.care || '';
            document.getElementById('edit-product-warm-tips').value = product.warmTips || '';
            document.getElementById('edit-product-description').value = product.description?.zh || '';
            document.getElementById('edit-product-selling-point').value = product.sellingPoint || '';
            
            // Reload images
            if (product.images && Array.isArray(product.images)) {
                editUploadedImageData = [...product.images];
            } else if (product.image) {
                editUploadedImageData = [product.image];
            } else {
                editUploadedImageData = [];
            }
            updateImageGallery('edit-product-images-gallery', editUploadedImageData);
            const editUploadPlaceholder = document.getElementById('edit-upload-placeholder');
            if (editUploadPlaceholder) {
                editUploadPlaceholder.style.display = editUploadedImageData.length > 0 ? 'none' : 'flex';
            }
            
            // Reload origin images
            if (product.originImages && Array.isArray(product.originImages)) {
                editUploadedOriginImageData = [...product.originImages];
            } else if (product.originImage) {
                editUploadedOriginImageData = [product.originImage];
            } else {
                editUploadedOriginImageData = [];
            }
            updateImageGallery('edit-origin-images-gallery', editUploadedOriginImageData);
            const editOriginUploadPlaceholder = document.getElementById('edit-origin-upload-placeholder');
            if (editOriginUploadPlaceholder) {
                editOriginUploadPlaceholder.style.display = editUploadedOriginImageData.length > 0 ? 'none' : 'flex';
            }
            
            // Reload tags
            selectedEditTags = [...(product.tags?.zh || [])];
            updateEditTagButtons();
            updateEditSelectedTagsDisplay();
        }
    }
    
    // Switch back to view mode
    document.getElementById('modal-view-mode').style.display = 'block';
    document.getElementById('modal-edit-mode').style.display = 'none';
});

// Save Edit
document.getElementById('save-edit-btn').addEventListener('click', () => {
    const productId = modal.dataset.productId;
    if (!productId) return;
    
    // Find product in all arrays
    let product = fabricData.recent.find(p => p.id === productId);
    let productIndex = -1;
    let productArray = fabricData.recent;
    
    if (!product) {
        product = fabricData.matched.find(p => p.id === productId);
        if (product) {
            productIndex = fabricData.matched.findIndex(p => p.id === productId);
            productArray = fabricData.matched;
        }
    } else {
        productIndex = fabricData.recent.findIndex(p => p.id === productId);
    }
    
    if (!product) return;
    
    // Validate required fields
    const productCode = document.getElementById('edit-product-code').value.trim();
    const productName = document.getElementById('edit-product-name-zh').value.trim();
    
    if (!productCode) {
        alert('产品编号是必填项');
        return;
    }
    
    if (!productName) {
        alert('产品名称是必填项');
        return;
    }
    
    // Update product data
    product.productCode = productCode;
    product.name.zh = productName;
    product.price = document.getElementById('edit-product-price').value.trim();
    product.origin = document.getElementById('edit-product-origin').value.trim();
    product.composition = document.getElementById('edit-product-composition').value.trim();
    product.characteristics = document.getElementById('edit-product-characteristics').value.trim();
    product.specs = document.getElementById('edit-product-specs').value.trim();
    product.yield = document.getElementById('edit-product-yield').value.trim();
    product.care = document.getElementById('edit-product-care').value.trim();
    product.warmTips = document.getElementById('edit-product-warm-tips').value.trim();
    product.description.zh = document.getElementById('edit-product-description').value.trim();
    product.sellingPoint = document.getElementById('edit-product-selling-point').value.trim();
    
    // Update Pros and Cons
    const prosText = document.getElementById('edit-product-pros').value.trim();
    const consText = document.getElementById('edit-product-cons').value.trim();
    if (!product.pros) product.pros = {};
    if (!product.cons) product.cons = {};
    product.pros.zh = prosText ? prosText.split('\n').filter(p => p.trim()) : [];
    product.cons.zh = consText ? consText.split('\n').filter(c => c.trim()) : [];
    
    // Update tags from selected tags
    product.tags.zh = [...selectedEditTags];
    
    // Clear edit tags selection
    selectedEditTags = [];
    
    // Update product images - always update (even if empty, to allow deletion)
    if (editUploadedImageData.length > 0) {
        product.image = editUploadedImageData[0]; // First image as primary
        product.images = [...editUploadedImageData]; // All images (copy array)
    } else {
        product.image = null;
        product.images = [];
    }
    
    // Update origin images - always update (even if empty, to allow deletion)
    if (editUploadedOriginImageData.length > 0) {
        product.originImage = editUploadedOriginImageData[0]; // First image as primary
        product.originImages = [...editUploadedOriginImageData]; // All origin images (copy array)
    } else {
        product.originImage = null;
        product.originImages = [];
    }
    
    // Clear edit image data
    editUploadedImageData = [];
    editUploadedOriginImageData = [];
    
    // Save fabric data to localStorage
    saveFabricDataToStorage();
    
    // Refresh displays
    renderHomeCards();
    renderMatchesCards();
    
    // Switch back to view mode
    document.getElementById('modal-view-mode').style.display = 'block';
    document.getElementById('modal-edit-mode').style.display = 'none';
    
    // Close the modal
    modal.classList.remove('active');
    
    alert('产品已更新！');
});

// Authentication System
let currentUser = null;
const ADMIN_USERNAME = 'pinweiadmin';
const ADMIN_PASSWORD = 'pinwei8888';

function checkAuth() {
    const savedUser = sessionStorage.getItem('pinweiUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
        return true;
    }
    return false;
}

function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        currentUser = { role: 'admin', username: username };
        sessionStorage.setItem('pinweiUser', JSON.stringify(currentUser));
        showMainApp();
        return true;
    }
    return false;
}

function guestLogin() {
    currentUser = { role: 'sales', username: '銷售專員' };
    sessionStorage.setItem('pinweiUser', JSON.stringify(currentUser));
    showMainApp();
}

function logout() {
    currentUser = null;
    sessionStorage.removeItem('pinweiUser');
    showLoginScreen();
}

function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}

function showLoginScreen() {
    document.getElementById('login-screen').classList.add('active');
    document.querySelectorAll('.screen:not(#login-screen)').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('lang-toggle').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'none';
    document.querySelector('.bottom-nav').style.display = 'none';
}

function showMainApp() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
    document.getElementById('lang-toggle').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'block';
    document.querySelector('.bottom-nav').style.display = 'flex';
    
    // Update UI based on user role
    updateUIForUserRole();
}

function updateUIForUserRole() {
    if (isAdmin()) {
        // Show admin features
        document.getElementById('nav-add-product').style.display = 'block';
        document.querySelectorAll('.edit-product-btn, .delete-product-btn, #edit-product-btn, #delete-product-btn').forEach(btn => {
            if (btn) btn.style.display = 'block';
        });
    } else {
        // Hide admin features for sales team
        document.getElementById('nav-add-product').style.display = 'none';
        document.querySelectorAll('.edit-product-btn, .delete-product-btn').forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
        const editBtn = document.getElementById('edit-product-btn');
        const deleteBtn = document.getElementById('delete-product-btn');
        if (editBtn) editBtn.style.display = 'none';
        if (deleteBtn) deleteBtn.style.display = 'none';
        
        // If sales team is on add-product screen, redirect to home
        const addProductScreen = document.getElementById('add-product-screen');
        if (addProductScreen && addProductScreen.classList.contains('active')) {
            navButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-screen="home"]').classList.add('active');
            screens.forEach(s => s.classList.remove('active'));
            document.getElementById('home-screen').classList.add('active');
        }
    }
    
    // Re-render cards to update edit/delete buttons visibility
    renderHomeCards();
    renderMatchesCards();
}

// Login Event Listeners
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    if (!username || !password) {
        alert('请输入用户名和密码');
        return;
    }
    
    if (login(username, password)) {
        alert('登录成功！');
    } else {
        alert('用户名或密码错误');
    }
});

document.getElementById('guest-login-btn').addEventListener('click', () => {
    guestLogin();
});

// Logout Button
document.getElementById('logout-btn').addEventListener('click', () => {
    if (confirm('确定要登出吗？')) {
        logout();
    }
});

// Allow Enter key to submit login
document.getElementById('login-password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('login-btn').click();
    }
});

// Delete Product Function
function deleteProduct(productId) {
    // Check if user is admin
    if (!isAdmin()) {
        alert('只有管理员可以删除产品');
        return;
    }
    
    const product = [...fabricData.recent, ...fabricData.matched, ...fabricData.favorites].find(p => p.id === productId);
    if (!product) return;
    
    const productName = getFabricName(product);
    const confirmMessage = currentLang === 'zh' 
        ? `确定要删除产品 "${productName}" 吗？此操作无法撤销。`
        : `Are you sure you want to delete product "${productName}"? This action cannot be undone.`;
    
    if (confirm(confirmMessage)) {
        // Remove from recent
        const recentIndex = fabricData.recent.findIndex(p => p.id === productId);
        if (recentIndex > -1) {
            fabricData.recent.splice(recentIndex, 1);
        }
        
        // Remove from matched
        const matchedIndex = fabricData.matched.findIndex(p => p.id === productId);
        if (matchedIndex > -1) {
            fabricData.matched.splice(matchedIndex, 1);
        }
        
        // Remove from favorites
        const favoritesIndex = fabricData.favorites.findIndex(p => p.id === productId);
        if (favoritesIndex > -1) {
            fabricData.favorites.splice(favoritesIndex, 1);
        }
        
        // Close modal if it's open for this product
        if (modal.dataset.productId === productId) {
            modal.classList.remove('active');
        }
        
        // Refresh displays
        renderHomeCards();
        renderMatchesCards();
        
        // Save fabric data to localStorage
        saveFabricDataToStorage();
        
        const successMessage = currentLang === 'zh' 
            ? `产品 "${productName}" 已删除`
            : `Product "${productName}" has been deleted`;
        alert(successMessage);
    }
}

// Delete Product Button (in modal)
document.getElementById('delete-product-btn').addEventListener('click', () => {
    const productId = modal.dataset.productId;
    if (productId) {
        deleteProduct(productId);
    }
});

// Image Upload Functionality
const imageInput = document.getElementById('product-image-input');
const uploadArea = document.getElementById('image-upload-area');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const imagePreview = document.getElementById('uploaded-image-preview');
const removeImageBtn = document.getElementById('remove-image-btn');

// Origin Image Upload
const originImageInput = document.getElementById('origin-image-input');
const originUploadArea = document.getElementById('origin-upload-area');
const originUploadPlaceholder = document.getElementById('origin-upload-placeholder');
const originImagePreview = document.getElementById('origin-image-preview');
const removeOriginImageBtn = document.getElementById('remove-origin-image-btn');

let uploadedImageData = []; // Changed to array for multiple images
let uploadedOriginImageData = []; // Changed to array for multiple origin images
let selectedTags = [];

// Initialize tag selection for all categories (tagCategories already defined at top)

// Click to upload
uploadArea.addEventListener('click', () => {
    imageInput.click();
});

// File input change - handle multiple files
imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });
    // Reset input to allow selecting same file again
    imageInput.value = '';
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    files.forEach(file => {
        handleImageUpload(file);
    });
});

function handleImageUpload(file) {
    if (file.size > 5 * 1024 * 1024) {
        alert(currentLang === 'zh' ? '图片大小不能超过 5MB' : 'Image size must be less than 5MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImageData.push(e.target.result);
        updateImageGallery('product-images-gallery', uploadedImageData);
        uploadPlaceholder.style.display = uploadedImageData.length > 0 ? 'none' : 'flex';
    };
    reader.readAsDataURL(file);
}

function updateImageGallery(galleryId, images) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    images.forEach((imageData, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'gallery-image-item';
        imageItem.innerHTML = `
            <img src="${imageData}" alt="Product image ${index + 1}" class="gallery-image">
            <button type="button" class="remove-gallery-image-btn" data-index="${index}">✕</button>
        `;
        gallery.appendChild(imageItem);
    });
    
    // Add delete handlers - determine which array to modify based on galleryId
    gallery.querySelectorAll('.remove-gallery-image-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index);
            
            // Determine which array and placeholder to use based on gallery ID
            let targetArray;
            let placeholderElement;
            
            if (galleryId === 'product-images-gallery') {
                targetArray = uploadedImageData;
                placeholderElement = uploadPlaceholder;
            } else if (galleryId === 'origin-images-gallery') {
                targetArray = uploadedOriginImageData;
                placeholderElement = originUploadPlaceholder;
            } else if (galleryId === 'edit-product-images-gallery') {
                targetArray = editUploadedImageData;
                placeholderElement = editUploadPlaceholder;
            } else if (galleryId === 'edit-origin-images-gallery') {
                targetArray = editUploadedOriginImageData;
                placeholderElement = editOriginUploadPlaceholder;
            } else {
                return; // Unknown gallery
            }
            
            // Remove the image at the specified index
            targetArray.splice(index, 1);
            
            // Update the gallery display
            updateImageGallery(galleryId, targetArray);
            
            // Update placeholder visibility - query by ID if element not directly accessible
            let placeholderEl = placeholderElement;
            if (!placeholderEl) {
                if (galleryId === 'product-images-gallery') {
                    placeholderEl = document.getElementById('upload-placeholder');
                } else if (galleryId === 'origin-images-gallery') {
                    placeholderEl = document.getElementById('origin-upload-placeholder');
                } else if (galleryId === 'edit-product-images-gallery') {
                    placeholderEl = document.getElementById('edit-upload-placeholder');
                } else if (galleryId === 'edit-origin-images-gallery') {
                    placeholderEl = document.getElementById('edit-origin-upload-placeholder');
                }
            }
            if (placeholderEl) {
                placeholderEl.style.display = targetArray.length > 0 ? 'none' : 'flex';
            }
        });
    });
}

// Origin Image Upload - Multiple images support
originUploadArea.addEventListener('click', () => {
    originImageInput.click();
});

originImageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (file && file.type.startsWith('image/')) {
            handleOriginImageUpload(file);
        }
    });
    originImageInput.value = '';
});

originUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    originUploadArea.classList.add('dragover');
});

originUploadArea.addEventListener('dragleave', () => {
    originUploadArea.classList.remove('dragover');
});

originUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    originUploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    files.forEach(file => {
        handleOriginImageUpload(file);
    });
});

function handleOriginImageUpload(file) {
    if (file.size > 5 * 1024 * 1024) {
        alert(currentLang === 'zh' ? '图片大小不能超过 5MB' : 'Image size must be less than 5MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedOriginImageData.push(e.target.result);
        updateImageGallery('origin-images-gallery', uploadedOriginImageData);
        originUploadPlaceholder.style.display = uploadedOriginImageData.length > 0 ? 'none' : 'flex';
    };
    reader.readAsDataURL(file);
}

// Edit Modal Image Upload Functionality
const editImageInput = document.getElementById('edit-product-image-input');
const editUploadArea = document.getElementById('edit-image-upload-area');
const editUploadPlaceholder = document.getElementById('edit-upload-placeholder');

const editOriginImageInput = document.getElementById('edit-origin-image-input');
const editOriginUploadArea = document.getElementById('edit-origin-upload-area');
const editOriginUploadPlaceholder = document.getElementById('edit-origin-upload-placeholder');
const editOriginImagePreview = document.getElementById('edit-origin-image-preview');
const editRemoveOriginImageBtn = document.getElementById('edit-remove-origin-image-btn');

// Click to upload product image
editUploadArea.addEventListener('click', () => {
    editImageInput.click();
});

// File input change for product image - handle multiple files
editImageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (file && file.type.startsWith('image/')) {
            handleEditImageUpload(file);
        }
    });
    editImageInput.value = '';
});

// Drag and drop for product image
editUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    editUploadArea.classList.add('dragover');
});

editUploadArea.addEventListener('dragleave', () => {
    editUploadArea.classList.remove('dragover');
});

editUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    editUploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    files.forEach(file => {
        handleEditImageUpload(file);
    });
});

function handleEditImageUpload(file) {
    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        editUploadedImageData.push(e.target.result);
        updateImageGallery('edit-product-images-gallery', editUploadedImageData);
        editUploadPlaceholder.style.display = editUploadedImageData.length > 0 ? 'none' : 'flex';
    };
    reader.readAsDataURL(file);
}

// Origin Image Upload for edit modal - Multiple images support
editOriginUploadArea.addEventListener('click', () => {
    editOriginImageInput.click();
});

editOriginImageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (file && file.type.startsWith('image/')) {
            handleEditOriginImageUpload(file);
        }
    });
    editOriginImageInput.value = '';
});

editOriginUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    editOriginUploadArea.classList.add('dragover');
});

editOriginUploadArea.addEventListener('dragleave', () => {
    editOriginUploadArea.classList.remove('dragover');
});

editOriginUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    editOriginUploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    files.forEach(file => {
        handleEditOriginImageUpload(file);
    });
});

function handleEditOriginImageUpload(file) {
    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        editUploadedOriginImageData.push(e.target.result);
        updateImageGallery('edit-origin-images-gallery', editUploadedOriginImageData);
        editOriginUploadPlaceholder.style.display = editUploadedOriginImageData.length > 0 ? 'none' : 'flex';
    };
    reader.readAsDataURL(file);
}

// Tag Selection and Edit/Delete Functionality - all categories
function initializeTagButtons() {
    tagCategories.forEach(category => {
        const containers = document.querySelectorAll(`[data-category="${category}"]`);
        containers.forEach(container => {
            const isEditable = container.dataset.editable === 'true';
            
            container.querySelectorAll('.tag-btn').forEach(btn => {
                // Remove existing listeners
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                // Tag selection
                newBtn.addEventListener('click', (e) => {
                    // Don't toggle if clicking edit/delete buttons
                    if (e.target.classList.contains('tag-edit-btn') || e.target.classList.contains('tag-delete-btn')) {
                        return;
                    }
                    const tag = newBtn.dataset.tag;
                    toggleTag(tag);
                });
                
                // Show edit/delete buttons on hover (if editable)
                if (isEditable) {
                    const editBtn = newBtn.querySelector('.tag-edit-btn');
                    const deleteBtn = newBtn.querySelector('.tag-delete-btn');
                    
                    newBtn.addEventListener('mouseenter', () => {
                        if (editBtn) editBtn.style.display = 'inline';
                        if (deleteBtn) deleteBtn.style.display = 'inline';
                    });
                    
                    newBtn.addEventListener('mouseleave', () => {
                        if (editBtn) editBtn.style.display = 'none';
                        if (deleteBtn) deleteBtn.style.display = 'none';
                    });
                    
                    // Edit functionality
                    if (editBtn) {
                        editBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            editTag(newBtn, container);
                        });
                    }
                    
                    // Delete functionality
                    if (deleteBtn) {
                        deleteBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            deleteTag(newBtn, container);
                        });
                    }
                }
            });
        });
    });
}

function editTag(btn, container) {
    const oldTag = btn.dataset.tag;
    const oldText = btn.textContent.replace('✎', '').replace('×', '').trim();
    const newText = prompt('编辑标签名称:', oldText);
    
    if (newText && newText.trim() && newText.trim() !== oldTag) {
        const newTag = newText.trim();
        
        // Update button
        btn.dataset.tag = newTag;
        btn.innerHTML = `${newTag} <span class="tag-edit-btn" style="display: none;">✎</span> <span class="tag-delete-btn" style="display: none;">×</span>`;
        
        // Update selected tags if this tag was selected
        const index = selectedTags.indexOf(oldTag);
        if (index > -1) {
            selectedTags[index] = newTag;
        }
        
        // Update selected tags in inquiry if needed (check all category prefixes)
        selectedInquiryTags.forEach((tagKey, index) => {
            const [category, tag] = tagKey.split(':');
            if (tag === oldTag) {
                selectedInquiryTags[index] = `${category}:${newTag}`;
            }
        });
        
        // Update all products that use this tag
        [...fabricData.recent, ...fabricData.matched, ...fabricData.favorites].forEach(product => {
            if (product.tags && product.tags.zh) {
                const tagIndex = product.tags.zh.indexOf(oldTag);
                if (tagIndex > -1) {
                    product.tags.zh[tagIndex] = newTag;
                }
            }
        });
        
        // Update button in all containers with same category
        const category = container.dataset.category;
        document.querySelectorAll(`[data-category="${category}"]`).forEach(catContainer => {
            catContainer.querySelectorAll('.tag-btn').forEach(b => {
                if (b.dataset.tag === oldTag) {
                    b.dataset.tag = newTag;
                    const isEditable = catContainer.dataset.editable === 'true';
                    b.innerHTML = `${newTag}${isEditable ? ' <span class="tag-edit-btn" style="display: none;">✎</span> <span class="tag-delete-btn" style="display: none;">×</span>' : ''}`;
                }
            });
        });
        
        // Sync inquiry tags
        syncInquiryTags();
        
        // Re-initialize to update event listeners
        initializeTagButtons();
        updateTagButtons();
        updateSelectedTagsDisplay();
        updateInquirySelectedTagsDisplay();
        renderHomeCards();
        renderMatchesCards();
        
        // Save tags to localStorage
        saveTagsToStorage();
    }
}

function deleteTag(btn, container) {
    const tag = btn.dataset.tag;
    if (confirm(`确定要删除标签 "${tag}" 吗？`)) {
        // Remove from selected tags
        const index = selectedTags.indexOf(tag);
        if (index > -1) {
            selectedTags.splice(index, 1);
        }
        
        // Remove from inquiry selected tags (check all category prefixes)
        selectedInquiryTags = selectedInquiryTags.filter(tagKey => {
            const [, tagName] = tagKey.split(':');
            return tagName !== tag;
        });
        
        // Remove button from all containers with same category
        const category = container.dataset.category;
        document.querySelectorAll(`[data-category="${category}"]`).forEach(catContainer => {
            catContainer.querySelectorAll('.tag-btn').forEach(b => {
                if (b.dataset.tag === tag) {
                    b.remove();
                }
            });
        });
        
        // Sync inquiry tags
        syncInquiryTags();
        
        // Re-initialize
        initializeTagButtons();
        updateTagButtons();
        updateSelectedTagsDisplay();
        updateInquirySelectedTagsDisplay();
        renderHomeCards();
        renderMatchesCards();
        
        // Save tags to localStorage
        saveTagsToStorage();
    }
}

// Initialize tag buttons
initializeTagButtons();

// Custom tag input for each category
function initializeCustomTagInputs() {
    document.querySelectorAll('.custom-tag-input-field').forEach(input => {
        // Remove existing listeners
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
        
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tag = newInput.value.trim();
                const category = newInput.dataset.category;
                
                if (tag) {
                    // Check if tag already exists in this category - specifically in the add-product-screen
                    const container = document.querySelector(`#add-product-screen [data-category="${category}"]`);
                    if (!container) {
                        alert('无法找到标签容器');
                        return;
                    }
                    
                    const existingTags = Array.from(container.querySelectorAll('.tag-btn')).map(btn => btn.dataset.tag);
                    
                    if (existingTags.includes(tag)) {
                        alert('此标签已存在');
                        return;
                    }
                    
                    // Add new tag button
                    const isEditable = container.dataset.editable === 'true';
                    const newBtn = document.createElement('button');
                    newBtn.type = 'button';
                    newBtn.className = 'tag-btn';
                    newBtn.dataset.tag = tag;
                    newBtn.innerHTML = `${tag}${isEditable ? ' <span class="tag-edit-btn" style="display: none;">✎</span> <span class="tag-delete-btn" style="display: none;">×</span>' : ''}`;
                    
                    container.appendChild(newBtn);
                    newInput.value = '';
                    
                    // Sync inquiry tags after adding new tag
                    syncInquiryTags();
                    
                    // Re-initialize to add event listeners
                    initializeTagButtons();
                    
                    // Save tags to localStorage
                    saveTagsToStorage();
                }
            }
        });
    });
}

// Initialize custom tag inputs
initializeCustomTagInputs();

// Sync inquiry tags from add product page (read-only, only for filtering)
function syncInquiryTags() {
    tagCategories.forEach(category => {
        const addProductContainer = document.querySelector(`#add-product-screen [data-category="${category}"]`);
        const inquiryContainer = document.querySelector(`#home-screen [data-category="${category}"]`);
        
        if (addProductContainer && inquiryContainer) {
            inquiryContainer.innerHTML = '';
            
            // Copy all tags from add product page to inquiry page (read-only)
            addProductContainer.querySelectorAll('.tag-btn').forEach(addBtn => {
                const tag = addBtn.dataset.tag;
                const tagText = addBtn.textContent.replace('✎', '').replace('×', '').trim();
                
                const inquiryBtn = document.createElement('button');
                inquiryBtn.type = 'button';
                inquiryBtn.className = 'tag-btn inquiry-tag';
                inquiryBtn.dataset.tag = tag;
                inquiryBtn.textContent = tagText;
                
                // Preserve selection state (check with category prefix)
                const tagKey = `${category}:${tag}`;
                if (selectedInquiryTags.includes(tagKey)) {
                    inquiryBtn.classList.add('selected');
                }
                
                // Only allow clicking for filtering (no edit/delete)
                // Store category info on the button
                inquiryBtn.dataset.category = category;
                inquiryBtn.addEventListener('click', (e) => {
                    toggleInquiryTag(tag, category);
                });
                
                inquiryContainer.appendChild(inquiryBtn);
            });
        }
    });
    
    // Update inquiry tag display after sync
    updateInquirySelectedTagsDisplay();
}

function toggleTag(tag) {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
        selectedTags.splice(index, 1);
    } else {
        selectedTags.push(tag);
    }
    updateTagButtons();
    updateSelectedTagsDisplay();
}

function updateTagButtons() {
    document.querySelectorAll('.tag-buttons-container .tag-btn').forEach(btn => {
        if (selectedTags.includes(btn.dataset.tag)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function updateSelectedTagsDisplay() {
    const container = document.getElementById('selected-tags-list');
    container.innerHTML = '';
    
    selectedTags.forEach(tag => {
        const tagItem = document.createElement('div');
        tagItem.className = 'selected-tag-item';
        tagItem.innerHTML = `
            <span>${tag}</span>
            <button type="button" class="remove-tag" data-tag="${tag}">×</button>
        `;
        container.appendChild(tagItem);
    });
    
    // Add remove handlers
    document.querySelectorAll('.remove-tag').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tag = btn.dataset.tag;
            toggleTag(tag);
        });
    });
}

// Custom tag input handlers are already set up above

// Save Product
document.getElementById('save-product-btn').addEventListener('click', () => {
    // Check if user is admin
    if (!isAdmin()) {
        alert('只有管理员可以添加产品');
        return;
    }
    
    const nameZh = document.getElementById('product-name-zh').value.trim();
    const price = document.getElementById('product-price').value.trim();
    const originName = document.getElementById('product-origin-name').value.trim();
    const productCode = document.getElementById('product-code').value.trim();
    const composition = document.getElementById('product-composition').value.trim();
    const characteristics = document.getElementById('product-characteristics').value.trim();
    const specs = document.getElementById('product-specs').value.trim();
    const yield_ = document.getElementById('product-yield').value.trim();
    const care = document.getElementById('product-care').value.trim();
    const warmTips = document.getElementById('product-warm-tips').value.trim();
    const descZh = document.getElementById('product-desc-zh').value.trim();
    const sellingPoint = document.getElementById('selling-point').value.trim();
    const prosText = document.getElementById('product-pros').value.trim();
    const consText = document.getElementById('product-cons').value.trim();
    
    if (!productCode || !nameZh) {
        alert('请填写产品编号和产品名称');
        return;
    }
    
    if (!uploadedImageData || uploadedImageData.length === 0) {
        alert('请上传至少一张产品图片');
        return;
    }
    
    if (selectedTags.length === 0) {
        alert('请至少选择一个标签');
        return;
    }
    
    const tagsZh = selectedTags;
    
    // Parse pros and cons from textarea (each line is one item)
    const pros = prosText ? prosText.split('\n').filter(p => p.trim()) : [];
    const cons = consText ? consText.split('\n').filter(c => c.trim()) : [];
    
    const newProduct = {
        id: Date.now().toString(),
        productCode: productCode,
        name: {
            zh: nameZh
        },
        price: price || '$0 / m',
        image: uploadedImageData[0], // First image as primary
        images: uploadedImageData, // All images array
        origin: originName || '未指定',
        originImage: uploadedOriginImageData.length > 0 ? uploadedOriginImageData[0] : null, // First image as primary
        originImages: uploadedOriginImageData, // All origin images array
        tags: {
            zh: tagsZh
        },
        composition: composition || '',
        characteristics: characteristics || '',
        specs: specs || '',
        yield: yield_ || '',
        care: care || '',
        warmTips: warmTips || '',
        sellingPoint: sellingPoint || '',
        description: {
            zh: descZh || '暂无描述。'
        },
        pros: {
            zh: pros.length > 0 ? pros : ['新产品']
        },
        cons: {
            zh: cons.length > 0 ? cons : ['暂无缺点信息']
        }
    };
    
    // Add to recent fabrics
    fabricData.recent.unshift(newProduct);
    if (fabricData.recent.length > 10) {
        fabricData.recent = fabricData.recent.slice(0, 10);
    }
    
    // Clear form
    document.getElementById('product-code').value = '';
    document.getElementById('product-name-zh').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-origin-name').value = '';
    document.getElementById('product-composition').value = '';
    document.getElementById('product-characteristics').value = '';
    document.getElementById('product-specs').value = '';
    document.getElementById('product-yield').value = '';
    document.getElementById('product-care').value = '';
    document.getElementById('product-warm-tips').value = '';
    document.getElementById('product-desc-zh').value = '';
    document.getElementById('selling-point').value = '';
    document.getElementById('product-pros').value = '';
    document.getElementById('product-cons').value = '';
    
    // Clear all custom tag inputs
    document.querySelectorAll('.custom-tag-input-field').forEach(input => {
        input.value = '';
    });
    
    // Clear images
    uploadedImageData = [];
    imageInput.value = '';
    updateImageGallery('product-images-gallery', []);
    uploadPlaceholder.style.display = 'flex';
    
    uploadedOriginImageData = [];
    originImageInput.value = '';
    updateImageGallery('origin-images-gallery', []);
    originUploadPlaceholder.style.display = 'flex';
    
    // Clear tags
    selectedTags = [];
    updateTagButtons();
    updateSelectedTagsDisplay();
    
    // Refresh cards and sync inquiry tags
    renderHomeCards();
    renderMatchesCards();
    syncInquiryTags();
    
    // Re-initialize tag buttons
    initializeTagButtons();
    initializeCustomTagInputs();
    
    // Save fabric data to localStorage
    saveFabricDataToStorage();
    
    alert('产品已保存！');
});

// Get Matches Button (home screen)
document.getElementById('get-matches-btn').addEventListener('click', () => {
    // Filter by selected tags
    filterMatchesByTags();
    
    // Switch to matches screen
    navButtons.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-screen="matches"]').classList.add('active');
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById('matches-screen').classList.add('active');
});

// Get Matches Button (inquiry screen)
const getMatchesBtn2 = document.getElementById('get-matches-btn-2');
if (getMatchesBtn2) {
    getMatchesBtn2.addEventListener('click', () => {
        // Switch to matches screen
        navButtons.forEach(b => b.classList.remove('active'));
        document.querySelector('[data-screen="matches"]').classList.add('active');
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById('matches-screen').classList.add('active');
    });
}

// Sort Button
// Sort functionality - inline buttons instead of popup
let currentSortOption = null;

function sortProducts(sortType) {
    // Remove active class from all sort buttons
    document.querySelectorAll('.sort-option-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'var(--white)';
        btn.style.borderColor = 'var(--border)';
        btn.style.color = 'var(--text-color)';
    });
    
    // Add active class to selected button
    const selectedBtn = document.querySelector(`.sort-option-btn[data-sort="${sortType}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
        selectedBtn.style.background = 'var(--accent)';
        selectedBtn.style.borderColor = 'var(--accent)';
        selectedBtn.style.color = 'var(--white)';
    }
    
    currentSortOption = sortType;
    
    // Create a copy to sort (don't modify original array)
    const productsToSort = [...fabricData.matched];
    
    // Sort based on type
    if (sortType === 'price-low') {
        // Sort by price low to high
        productsToSort.sort((a, b) => {
            const priceA = parseFloat((a.price || '').replace(/[^0-9.]/g, '')) || 0;
            const priceB = parseFloat((b.price || '').replace(/[^0-9.]/g, '')) || 0;
            return priceA - priceB;
        });
    } else if (sortType === 'price-high') {
        // Sort by price high to low
        productsToSort.sort((a, b) => {
            const priceA = parseFloat((a.price || '').replace(/[^0-9.]/g, '')) || 0;
            const priceB = parseFloat((b.price || '').replace(/[^0-9.]/g, '')) || 0;
            return priceB - priceA;
        });
    } else if (sortType === 'name-az') {
        // Sort by name A-Z
        productsToSort.sort((a, b) => {
            const nameA = getFabricName(a) || '';
            const nameB = getFabricName(b) || '';
            return nameA.localeCompare(nameB, 'zh-CN');
        });
    }
    
    // Update matched array with sorted results
    fabricData.matched = productsToSort;
    
    // Re-render matches
    renderMatchesCards();
}

// Initialize sort buttons - called when matches screen is shown
function initializeSortButtons() {
    document.querySelectorAll('.sort-option-btn').forEach(btn => {
        // Remove existing listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', () => {
            const sortType = newBtn.dataset.sort;
            sortProducts(sortType);
        });
        
        // Add hover effects
        newBtn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'var(--bg-light)';
                this.style.borderColor = 'var(--accent)';
            }
        });
        
        newBtn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'var(--white)';
                this.style.borderColor = 'var(--border)';
            }
        });
    });
}

// Settings screen - no actions needed for demo version

// Selected tags for inquiry
let selectedInquiryTags = [];

// Update inquiry selected tags display
function updateInquirySelectedTagsDisplay() {
    const container = document.getElementById('inquiry-selected-tags-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Extract tag names from category:tag format for display (though display is hidden on home page)
    selectedInquiryTags.forEach(tagKey => {
        const [category, tagName] = tagKey.split(':');
        const tagItem = document.createElement('div');
        tagItem.className = 'selected-tag-item';
        tagItem.innerHTML = `
            <span>${tagName}</span>
            <button type="button" class="remove-tag" data-tag-key="${tagKey}">×</button>
        `;
        container.appendChild(tagItem);
    });
    
    // Add remove handlers
    container.querySelectorAll('.remove-tag').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tagKey = btn.dataset.tagKey;
            const [category, tag] = tagKey.split(':');
            toggleInquiryTag(tag, category);
        });
    });
}

function toggleInquiryTag(tag, category) {
    // Create a unique key combining tag and category to make selections independent
    const tagKey = `${category}:${tag}`;
    const index = selectedInquiryTags.indexOf(tagKey);
    
    // First, deselect all other tags in the same category (single select per category)
    if (index === -1) {
        // If this tag is not selected, first remove any other selected tags in the same category
        selectedInquiryTags = selectedInquiryTags.filter(selectedTag => !selectedTag.startsWith(`${category}:`));
        // Then add the new selection
        selectedInquiryTags.push(tagKey);
    } else {
        // If already selected, deselect it
        selectedInquiryTags.splice(index, 1);
    }
    
    // Update tag buttons in inquiry section - only for the specific category
    document.querySelectorAll(`#home-screen [data-category="${category}"] .tag-btn`).forEach(btn => {
        const btnTagKey = `${category}:${btn.dataset.tag}`;
        if (selectedInquiryTags.includes(btnTagKey)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    updateInquirySelectedTagsDisplay();
    
    // Auto-filter matches when tags are selected or deselected
    filterMatchesByTags();
}

function filterMatchesByTags() {
    // Don't filter if there's an active search query
    if (currentSearchQuery) {
        // Search takes priority, but we can combine with tag filtering if needed
        return;
    }
    
    // Get all products from recent
    const allProducts = [...fabricData.recent];
    
    if (selectedInquiryTags.length === 0) {
        // If no tags selected, show all products
        fabricData.matched = allProducts;
    } else {
        // Extract tag names from category:tag format
        const selectedTagNames = selectedInquiryTags.map(tagKey => tagKey.split(':')[1]);
        
        // Filter products that have at least one of the selected tags
        const filtered = allProducts.filter(product => {
            const productTags = getFabricTags(product);
            // Product must have at least one of the selected tags
            return selectedTagNames.some(selectedTag => productTags.includes(selectedTag));
        });
        fabricData.matched = filtered;
    }
    renderMatchesCards();
}

// Initialize
setLanguage('zh'); // Default to Simplified Chinese

// Check if user is already logged in
if (!checkAuth()) {
    // Show login screen if not authenticated
    showLoginScreen();
} else {
    // User is logged in, show main app
    showMainApp();
}

// Load saved data from localStorage
loadFabricDataFromStorage();
if (loadTagsFromStorage()) {
    // Tags were loaded from storage, re-initialize
    initializeTagButtons();
    initializeCustomTagInputs();
    syncInquiryTags();
} else {
    // Use default tags from HTML
    initializeTagButtons();
    initializeCustomTagInputs();
    syncInquiryTags();
}

updateInquirySelectedTagsDisplay();
renderHomeCards();
renderMatchesCards();

// Matches page search and sort functionality - initialize after DOM is ready
function initializeMatchesSearchAndSort() {
    const matchesSearchInput = document.getElementById('matches-search-input');
    const matchesSearchBtn = document.getElementById('matches-search-btn');
    const matchesClearSearchBtn = document.getElementById('matches-clear-search-btn');

    if (!matchesSearchInput || !matchesSearchBtn || !matchesClearSearchBtn) {
        // Elements not found yet, try again later
        setTimeout(initializeMatchesSearchAndSort, 100);
        return;
    }

    // Ensure input is visible and functional
    matchesSearchInput.style.display = 'block';
    matchesSearchInput.style.visibility = 'visible';
    matchesSearchInput.style.opacity = '1';
    matchesSearchInput.style.width = 'auto';

    // Remove any existing event listeners by cloning
    const newSearchBtn = matchesSearchBtn.cloneNode(true);
    matchesSearchBtn.parentNode.replaceChild(newSearchBtn, matchesSearchBtn);
    
    const newClearBtn = matchesClearSearchBtn.cloneNode(true);
    matchesClearSearchBtn.parentNode.replaceChild(newClearBtn, matchesClearSearchBtn);

    // Search button click handler
    newSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const query = matchesSearchInput.value || '';
        searchProducts(query);
    });

    // Search input Enter key handler
    matchesSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = matchesSearchInput.value || '';
            searchProducts(query);
        }
    });

    // Clear search button handler
    newClearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        matchesSearchInput.value = '';
        currentSearchQuery = '';
        // Clear sort selection
        document.querySelectorAll('.sort-option-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'var(--white)';
            btn.style.borderColor = 'var(--border)';
            btn.style.color = 'var(--text-color)';
        });
        currentSortOption = null;
        // Show all products when clearing search
        fabricData.matched = [...fabricData.recent];
        renderMatchesCards();
    });

    // Initialize sort buttons
    initializeSortButtons();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeMatchesSearchAndSort, 100);
    });
} else {
    setTimeout(initializeMatchesSearchAndSort, 100);
}

