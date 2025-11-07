/**
 * Excel Import Script for PinWei Sales Tools
 * 
 * This script reads an Excel file and converts it to the data format
 * used by the website. Place your Excel file in the root directory
 * and name it "products.xlsx"
 * 
 * Expected Excel columns:
 * - Product Code (产品编号)
 * - Product Name (产品名称)
 * - Price (价格)
 * - Origin (产品開發)
 * - Composition (成分)
 * - Characteristics (面料特点)
 * - Specs (规格)
 * - Yield (出米数)
 * - Care (洗护建议)
 * - Warm Tips (温馨提示)
 * - Description (产品介绍)
 * - Selling Point (卖点)
 * - Pros (优点) - separated by newlines or semicolons
 * - Cons (缺点) - separated by newlines or semicolons
 * - Composition Tags (成分标签) - comma separated
 * - Garment Type Tags (服装类型标签) - comma separated
 * - Style Tags (风格标签) - comma separated
 * - Season Tags (季节标签) - comma separated
 * - Brand Tags (大牌開發标签) - comma separated
 * - Other Tags (自主開發标签) - comma separated
 * - Product Images (产品图片) - URLs or file paths, comma separated
 * - Origin Images (来源图片) - URLs or file paths, comma separated
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Configuration
// Try Product_Data_From_Text.xlsx first, then fall back to products.xlsx
const EXCEL_FILE_OPTIONS = [
    path.join(__dirname, '..', 'Product_Data_From_Text.xlsx'),
    path.join(__dirname, '..', 'products.xlsx')
];
let EXCEL_FILE = null;
for (const file of EXCEL_FILE_OPTIONS) {
    if (fs.existsSync(file)) {
        EXCEL_FILE = file;
        break;
    }
}
const OUTPUT_FILE = path.join(__dirname, '..', 'data-imported.js');
const IMAGES_DIR = path.join(__dirname, '..', 'images');

// Column mapping (flexible - will try to match these column names)
const COLUMN_MAPPING = {
    productCode: ['产品编号', 'Product Code', 'productCode', 'code', '编号'],
    productName: ['产品名称', 'Product Name', 'productName', 'name', '名称'],
    price: ['价格', 'Price', 'price'],
    origin: ['产品開發', 'Origin', 'origin', '開發'],
    composition: ['成分', 'Composition', 'composition'],
    characteristics: ['面料特点', 'Characteristics', 'characteristics', '特点'],
    specs: ['规格', 'Specs', 'specs', '规格'],
    yield: ['出米数', 'Yield', 'yield'],
    care: ['洗护建议', 'Care', 'care', '洗护'],
    warmTips: ['温馨提示', 'Warm Tips', 'warmTips', '提示'],
    description: ['产品介绍', 'Description', 'description', '介绍'],
    sellingPoint: ['卖点', 'Selling Point', 'sellingPoint', '卖点'],
    pros: ['优点', 'Pros', 'pros', '优点'],
    cons: ['缺点', 'Cons', 'cons', '缺点'],
    compositionTags: ['成分标签', 'Composition Tags', 'compositionTags', '成分'],
    garmentTypeTags: ['服装类型标签', 'Garment Type Tags', 'garmentTypeTags', '服装类型', '类型'],
    styleTags: ['风格标签', 'Style Tags', 'styleTags', '风格'],
    seasonTags: ['季节标签', 'Season Tags', 'seasonTags', '季节'],
    brandTags: ['大牌開發标签', 'Brand Tags', 'brandTags', '大牌', '品牌'],
    otherTags: ['自主開發标签', 'Other Tags', 'otherTags', '自主開發', '其他'],
    productImages: ['产品图片', 'Product Images', 'productImages', '产品图', '图片'],
    originImages: ['来源图片', 'Origin Images', 'originImages', '来源图', '來源圖片']
};

function findColumnIndex(headers, possibleNames) {
    for (let i = 0; i < headers.length; i++) {
        const header = String(headers[i] || '').trim();
        for (const name of possibleNames) {
            if (header.toLowerCase() === name.toLowerCase() || 
                header.includes(name) || 
                name.includes(header)) {
                return i;
            }
        }
    }
    return -1;
}

function parseTags(tagString) {
    if (!tagString) return [];
    return String(tagString)
        .split(/[,，;；\n]/)
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
}

function parseList(listString) {
    if (!listString) return [];
    return String(listString)
        .split(/[,，;；\n]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
}

function processImages(imageString, productCode) {
    if (!imageString) return [];
    
    const images = parseList(imageString);
    return images.map(img => {
        // If it's a URL, use it directly
        if (img.startsWith('http://') || img.startsWith('https://')) {
            return img;
        }
        // If it's a file path, convert to relative path
        if (img.startsWith('/') || img.includes('\\')) {
            return img.replace(/\\/g, '/');
        }
        // If it's just a filename, assume it's in the images directory
        return `images/${productCode}/${img}`;
    });
}

function convertRowToProduct(row, columnMap, rowIndex) {
    const getValue = (key) => {
        const colIndex = columnMap[key];
        if (colIndex === -1) return '';
        return row[colIndex] || '';
    };

    const productCode = String(getValue('productCode')).trim();
    const productName = String(getValue('productName')).trim();

    if (!productCode || !productName) {
        console.warn(`Row ${rowIndex + 2}: Skipping - missing product code or name`);
        return null;
    }

    // Parse tags from different columns
    const compositionTags = parseTags(getValue('compositionTags'));
    const garmentTypeTags = parseTags(getValue('garmentTypeTags'));
    const styleTags = parseTags(getValue('styleTags'));
    const seasonTags = parseTags(getValue('seasonTags'));
    const brandTags = parseTags(getValue('brandTags'));
    const otherTags = parseTags(getValue('otherTags'));

    // Combine all tags
    const allTags = [
        ...compositionTags,
        ...garmentTypeTags,
        ...styleTags,
        ...seasonTags,
        ...brandTags,
        ...otherTags
    ];

    // Parse pros and cons
    const prosText = getValue('pros');
    const consText = getValue('cons');
    const pros = prosText ? parseList(prosText) : [];
    const cons = consText ? parseList(consText) : [];

    // Process images
    const productImages = processImages(getValue('productImages'), productCode);
    const originImages = processImages(getValue('originImages'), productCode);

    const product = {
        id: `excel-${rowIndex + 1}`,
        productCode: productCode,
        name: {
            zh: productName
        },
        price: getValue('price') || '$0 / m',
        image: productImages[0] || null,
        images: productImages,
        origin: getValue('origin') || '未指定',
        originImage: originImages[0] || null,
        originImages: originImages,
        tags: {
            zh: allTags
        },
        composition: getValue('composition') || '',
        characteristics: getValue('characteristics') || '',
        specs: getValue('specs') || '',
        yield: getValue('yield') || '',
        care: getValue('care') || '',
        warmTips: getValue('warmTips') || '',
        sellingPoint: getValue('sellingPoint') || '',
        description: {
            zh: getValue('description') || '暂无描述。'
        },
        pros: {
            zh: pros.length > 0 ? pros : ['新产品']
        },
        cons: {
            zh: cons.length > 0 ? cons : ['暂无缺点信息']
        }
    };

    return product;
}

function importExcel() {
    console.log('Starting Excel import...');
    console.log(`Looking for Excel file: ${EXCEL_FILE}`);

    // Check if Excel file exists
    if (!EXCEL_FILE || !fs.existsSync(EXCEL_FILE)) {
        console.error(`Error: Excel file not found.`);
        console.log('Looking for: Product_Data_From_Text.xlsx or products.xlsx');
        console.log('Please create an Excel file in the root directory.');
        process.exit(1);
    }
    
    console.log(`Using Excel file: ${path.basename(EXCEL_FILE)}`);

    // Read Excel file
    const workbook = XLSX.readFile(EXCEL_FILE);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

    if (data.length < 2) {
        console.error('Error: Excel file must have at least a header row and one data row');
        process.exit(1);
    }

    // Get headers (first row)
    const headers = data[0];

    // Map columns
    const columnMap = {};
    for (const [key, possibleNames] of Object.entries(COLUMN_MAPPING)) {
        columnMap[key] = findColumnIndex(headers, possibleNames);
        if (columnMap[key] === -1) {
            console.warn(`Warning: Column "${key}" not found. Tried: ${possibleNames.join(', ')}`);
        }
    }

    // Check required columns
    if (columnMap.productCode === -1 || columnMap.productName === -1) {
        console.error('Error: Required columns "Product Code" and "Product Name" not found');
        process.exit(1);
    }

    // Process rows
    const products = [];
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const product = convertRowToProduct(row, columnMap, i - 1);
        if (product) {
            products.push(product);
        }
    }

    console.log(`Successfully imported ${products.length} products`);

    // Generate data file
    const dataContent = `// Auto-generated from Excel import
// Last updated: ${new Date().toISOString()}
// Source: ${EXCEL_FILE}

const fabricData = {
    recent: ${JSON.stringify(products, null, 4)},
    matched: [],
    favorites: [],
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = fabricData;
}
`;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, dataContent, 'utf8');
    console.log(`Data written to: ${OUTPUT_FILE}`);

    return products;
}

// Run if called directly
if (require.main === module) {
    try {
        importExcel();
        console.log('Import completed successfully!');
    } catch (error) {
        console.error('Error during import:', error);
        process.exit(1);
    }
}

module.exports = { importExcel };

