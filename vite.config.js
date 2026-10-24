import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

function getDetectedResumeFile() {
  const resumeDir = path.resolve(process.cwd(), 'public/resume');
  if (fs.existsSync(resumeDir)) {
    const files = fs.readdirSync(resumeDir).filter(
      f => !f.startsWith('.') && (f.endsWith('.pdf') || f.endsWith('.docx') || f.endsWith('.doc'))
    );
    if (files.length > 0) {
      return files[0];
    }
  }
  return '';
}

function resumeAutoDetectPlugin() {
  return {
    name: 'resume-auto-detect',
    config(config) {
      const filename = getDetectedResumeFile();
      const base = config.base || '/Portfolio/';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;
      const resumeUrl = filename 
        ? `${cleanBase}resume/${encodeURIComponent(filename)}` 
        : `${cleanBase}resume/Dharun-Resume.pdf`;
      return {
        define: {
          __DETECTED_RESUME_URL__: JSON.stringify(resumeUrl)
        }
      };
    },
    configureServer(server) {
      const resumeDir = path.resolve(process.cwd(), 'public/resume');
      if (fs.existsSync(resumeDir)) {
        server.watcher.add(resumeDir);
        server.watcher.on('all', (event, filePath) => {
          if (filePath.includes(path.join('public', 'resume'))) {
            server.restart();
          }
        });
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), tailwindcss(), resumeAutoDetectPlugin()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1600
  }
});
