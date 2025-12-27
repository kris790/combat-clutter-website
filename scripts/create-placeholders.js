// scripts/create-placeholders.js
const fs = require('fs');
const path = require('path');

// Ensure directories exist
const directories = [
  'public/images/hero',
  'public/images/portfolio',
  'public/videos'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create SVG-based hero placeholder (no canvas dependency needed)
function createHeroImage() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1A1A1A"/>
      <stop offset="100%" style="stop-color:#2A2A2A"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <text x="960" y="480" text-anchor="middle" fill="#F5F5F0" font-family="Arial" font-size="80" font-weight="bold">COMBAT CLUTTER</text>
  <text x="960" y="560" text-anchor="middle" fill="#F5F5F0" font-family="Arial" font-size="40">Hero Image Placeholder</text>
  <text x="960" y="630" text-anchor="middle" fill="#D4AF37" font-family="Arial" font-size="30">Replace with professional photography</text>
</svg>`;

  fs.writeFileSync('public/images/hero-background.svg', svg);
  console.log('✓ Created: public/images/hero-background.svg');
  
  // Also create a simple HTML that can be screenshot for JPG
  const html = `<!DOCTYPE html>
<html>
<head><style>
body{margin:0;background:linear-gradient(135deg,#1A1A1A,#2A2A2A);width:1920px;height:1080px;display:flex;align-items:center;justify-content:center;font-family:Arial}
.content{text-align:center;color:#F5F5F0}
h1{font-size:80px;margin-bottom:20px}
p{font-size:40px;margin:10px 0}
.gold{color:#D4AF37;font-size:30px}
</style></head>
<body><div class="content">
<h1>COMBAT CLUTTER</h1>
<p>Hero Image Placeholder</p>
<p class="gold">Replace with professional photography</p>
</div></body>
</html>`;
  fs.writeFileSync('public/images/hero-background.html', html);
  console.log('✓ Created: public/images/hero-background.html (open in browser, screenshot for JPG)');
}

// Create portfolio placeholder SVGs
function createPortfolioImages() {
  const images = [
    { name: 'pantry-before', label: 'PANTRY BEFORE' },
    { name: 'pantry-after', label: 'PANTRY AFTER' },
    { name: 'closet-before', label: 'CLOSET BEFORE' },
    { name: 'closet-after', label: 'CLOSET AFTER' },
    { name: 'garage-before', label: 'GARAGE BEFORE' },
    { name: 'garage-after', label: 'GARAGE AFTER' }
  ];

  images.forEach(({ name, label }) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#F5F5F0"/>
  <rect x="10" y="10" width="780" height="580" fill="none" stroke="#E0E0E0" stroke-width="2"/>
  <text x="400" y="280" text-anchor="middle" fill="#1A1A1A" font-family="Arial" font-size="40" font-weight="bold">${label}</text>
  <text x="400" y="330" text-anchor="middle" fill="#6B6B6B" font-family="Arial" font-size="20">Portfolio Image Placeholder</text>
  <text x="400" y="360" text-anchor="middle" fill="#D4AF37" font-family="Arial" font-size="16">800 × 600px</text>
</svg>`;

    fs.writeFileSync(`public/images/portfolio/${name}.svg`, svg);
    console.log(`✓ Created: public/images/portfolio/${name}.svg`);
  });
}

// Create video captions file
function createCaptionsFile() {
  const captions = `WEBVTT

1
00:00:00.000 --> 00:00:05.000
Combat Clutter transforms chaotic spaces
into organized, functional environments.

2
00:00:05.000 --> 00:00:10.000
Serving Atlanta homeowners since 2023.

3
00:00:10.000 --> 00:00:15.000
Reclaim your space. Restore your calm.`;

  fs.writeFileSync('public/videos/captions.vtt', captions);
  console.log('✓ Created: public/videos/captions.vtt');
}

// Create video placeholder instructions
function createVideoPlaceholder() {
  const message = `VIDEO PLACEHOLDER
==================

Replace this file with: hero-background.mp4

Specifications:
- Duration: 10-15 second seamless loop
- Resolution: 1920x1080 (Full HD)
- File size: Under 2MB for fast loading
- Format: MP4 (H.264 codec)
- Audio: None (video is muted)
- Content: Organized spaces, calm movements

Also create hero-background.webm for better compression.

Stock video sources:
- Pexels.com (free)
- Unsplash.com (free)
- Artgrid.io (paid, high quality)
- Storyblocks.com (paid)

Search terms:
"organized home", "minimal interior", "clean space", "tidy room"
`;
  
  fs.writeFileSync('public/videos/README.txt', message);
  console.log('✓ Created: public/videos/README.txt (video instructions)');
}

// Run all
console.log('\n🎨 Creating development placeholder assets...\n');
createHeroImage();
createPortfolioImages();
createCaptionsFile();
createVideoPlaceholder();

console.log('\n✅ All placeholder assets created!\n');
console.log('📝 Next Steps:');
console.log('1. Replace SVGs with actual JPG/PNG images');
console.log('2. Add real portfolio photos to public/images/portfolio/');
console.log('3. Add hero video to public/videos/hero-background.mp4');
console.log('4. Update Hero.tsx to use .jpg instead of .svg if needed\n');
