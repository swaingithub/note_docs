# Build the VitePress site into docs/.vitepress/dist
# Usage (PowerShell):  .\deploy.ps1
# Then upload docs/.vitepress/dist to any static host, or push to GitHub Pages (see .github/workflows/deploy.yml).
node node_modules/vitepress/bin/vitepress.js build docs
if ($LASTEXITCODE -eq 0) {
  Write-Host "Build complete -> docs/.vitepress/dist" -ForegroundColor Green
} else {
  Write-Host "Build failed" -ForegroundColor Red
  exit $LASTEXITCODE
}
