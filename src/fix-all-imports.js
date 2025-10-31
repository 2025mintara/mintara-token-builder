// Node.js script to fix all versioned imports
const fs = require('fs');
const path = require('path');

const uiComponentsDir = path.join(__dirname, 'components', 'ui');

// Function to remove version from import statements
function fixImports(content) {
  // Remove @X.Y.Z from all imports
  return content.replace(/@\d+\.\d+\.\d+/g, '');
}

// Get all .tsx files in components/ui
const files = fs.readdirSync(uiComponentsDir)
  .filter(file => file.endsWith('.tsx'))
  .map(file => path.join(uiComponentsDir, file));

console.log(`🔧 Fixing ${files.length} UI component files...`);

files.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixImports(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`  ✅ Fixed: ${path.basename(filePath)}`);
    } else {
      console.log(`  ⏭️  Skipped: ${path.basename(filePath)} (no changes needed)`);
    }
  } catch (error) {
    console.error(`  ❌ Error fixing ${path.basename(filePath)}:`, error.message);
  }
});

console.log('\n✅ All imports fixed!');
