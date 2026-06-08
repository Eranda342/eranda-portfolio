const fs = require('fs');
const path = require('path');

const replacements = {
  // #a78bfa
  '167, 139, 250': '0, 229, 255',
  '167,139,250': '0,229,255',
  
  // #818cf8
  '129, 140, 248': '56, 189, 248',
  '129,140,248': '56,189,248',
  
  // #c4b5fd
  '196, 181, 253': '34, 211, 238',
  '196,181,253': '34,211,238',
  
  // Also we should ensure no `#5eead4` (teal) clashes negatively, but wait, the prompt only said "Replace: Purple accents, Amethyst glows, Purple-tinted particles With: Deep Navy + Electric Cyan". The teals might be fine or can be mapped to `#00E5FF`. Let's just map #5eead4 to #00E5FF.
  '5eead4': '00E5FF',
  '5EEAD4': '00E5FF',
  '94, 234, 212': '0, 229, 255',
  '94,234,212': '0,229,255',
  
  // `#7dd3fc` sky blue -> `#38BDF8`
  '7dd3fc': '38BDF8',
  '7DD3FC': '38BDF8',
  '125, 211, 252': '56, 189, 248',
  '125,211,252': '56,189,248',
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
