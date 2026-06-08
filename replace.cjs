const fs = require('fs');
const path = require('path');

const replacements = {
  // Accents
  'a78bfa': '00E5FF',
  'A78BFA': '00E5FF',
  '818cf8': '38BDF8',
  '818CF8': '38BDF8',
  'c4b5fd': '22D3EE',
  'C4B5FD': '22D3EE',
  
  // Backgrounds
  '050608': '050816',
  '0a0c10': '0A1029', // Slight variation for depth where 0a0c10 was used
  '0f1218': '111836', // Slight variation for bg-2

  // Text
  'f4f6fa': 'F8FAFC',
  'cdd3df': 'E2E8F0', // intermediate
  '8a93a6': '94A3B8', // ink-2
};

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.svg') || fullPath.endsWith('.json')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        for (const [oldVal, newVal] of Object.entries(replacements)) {
          const regex = new RegExp(oldVal, 'g');
          if (regex.test(content)) {
            content = content.replace(regex, newVal);
            modified = true;
          }
        }
        
        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated: ${fullPath}`);
        }
      }
    }
  }
}

walkDir('./src');
walkDir('./public');
