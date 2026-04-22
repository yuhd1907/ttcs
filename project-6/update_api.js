const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/app/(pages)/user-manage/profile/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'IntroSection.tsx');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace fetch URL
  content = content.replace(/fetch\("http:\/\/localhost:5000\/user"/g, 'fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv-profile`');

  // Replace method and uncomment credentials
  content = content.replace(/method: "PATCH",\s*\/\/ credentials: "include",/g, 'method: "PUT",\n      credentials: "include",');
  
  // Also handle cases where credentials might not be commented or missing
  // Actually all of them have // credentials: "include", let's check my grep output. Yes, they seem to have it.

  // Replace body: JSON.stringify({ key: updatedList })
  // We need to inject ...infoUser
  // Look for body: JSON.stringify({ something: something })
  content = content.replace(/body: JSON\.stringify\(\{\s*(\w+):\s*([^}]+)\s*\}\)/g, 'body: JSON.stringify({ ...infoUser, $1: $2 })');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});
