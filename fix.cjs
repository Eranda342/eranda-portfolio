const fs = require('fs');
const files = [
  'src/components/ui/alert-dialog.tsx',
  'src/components/ui/calendar.tsx',
  'src/components/ui/carousel.tsx',
  'src/components/ui/pagination.tsx',
  'src/components/ui/sidebar.tsx'
];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/from ["']\.\/button["']/g, 'from "../../app/components/ui/button"');
  fs.writeFileSync(file, content);
}
let btnContent = fs.readFileSync('src/app/components/ui/button.tsx', 'utf8');
btnContent = btnContent.replace(/from ["']\.\/utils["']/g, 'from "../../utils/cn"');
fs.writeFileSync('src/app/components/ui/button.tsx', btnContent);
