import { readdir, copyFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyPublicFiles() {
  const publicDir = join(__dirname, '../frontend/public');
  const distDir = join(__dirname, '../frontend/dist');

  try {
    // Read all files from public directory
    const files = await readdir(publicDir);
    
    console.log('📁 Copying public files to dist...');
    console.log(`Source: ${publicDir}`);
    console.log(`Destination: ${distDir}`);
    
    // Copy each file to dist directory
    for (const file of files) {
      const srcPath = join(publicDir, file);
      const destPath = join(distDir, file);
      
      await copyFile(srcPath, destPath);
      console.log(`✅ Copied: ${file}`);
    }
    
    console.log('✨ All public files copied successfully!');
  } catch (error) {
    console.error('❌ Error copying public files:', error.message);
    process.exit(1);
  }
}

copyPublicFiles();
