#!/bin/bash

# Combat Clutter LLC - Project Setup Script
# Automates the initial setup of the Combat Clutter website project

set -e  # Exit on any error

echo "🎯 Setting up Combat Clutter LLC Website Project..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Create folder structure
echo -e "${BLUE}📁 Creating folder structure...${NC}"
mkdir -p src/app
mkdir -p src/components/brand
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui
mkdir -p src/lib/brand
mkdir -p src/types
mkdir -p public/images
mkdir -p public/videos
mkdir -p public/fonts
mkdir -p .vscode
mkdir -p scripts
mkdir -p tests
echo -e "${GREEN}✓ Folder structure created${NC}"
echo ""

# Step 2: Initialize package.json if it doesn't exist
if [ ! -f "package.json" ]; then
  echo -e "${BLUE}📦 Creating package.json...${NC}"
  cat > package.json << 'EOF'
{
  "name": "combat-clutter-website",
  "version": "1.0.0",
  "description": "Official website for Combat Clutter LLC - Professional home organization services in Atlanta, GA",
  "author": "Combat Clutter LLC",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "validate-brand": "node scripts/validate-brand.js",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "react-hook-form": "^7.50.0",
    "@sanity/client": "^6.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "class-variance-authority": "^0.7.0",
    "@radix-ui/react-slot": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
EOF
  echo -e "${GREEN}✓ package.json created${NC}"
else
  echo -e "${YELLOW}⚠ package.json already exists, skipping${NC}"
fi
echo ""

# Step 3: Create VS Code snippets (already generated in artifact)
echo -e "${BLUE}🔧 VS Code snippets ready (see .vscode/combat-clutter.code-snippets)${NC}"
echo ""

# Step 4: Create git pre-commit hook
if [ -d ".git" ]; then
  echo -e "${BLUE}🪝 Setting up git pre-commit hook...${NC}"
  mkdir -p .git/hooks
  cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running Combat Clutter brand validation..."
node scripts/validate-brand.js
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Brand validation failed. Commit aborted."
  echo "Fix brand violations and try again."
  exit 1
fi
EOF
  chmod +x .git/hooks/pre-commit
  echo -e "${GREEN}✓ Git pre-commit hook installed${NC}"
else
  echo -e "${YELLOW}⚠ Not a git repository, skipping pre-commit hook${NC}"
fi
echo ""

# Step 5: Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
  echo -e "${BLUE}📝 Creating .gitignore...${NC}"
  cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build
/dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
EOF
  echo -e "${GREEN}✓ .gitignore created${NC}"
else
  echo -e "${YELLOW}⚠ .gitignore already exists, skipping${NC}"
fi
echo ""

# Step 6: Create TypeScript config if it doesn't exist
if [ ! -f "tsconfig.json" ]; then
  echo -e "${BLUE}⚙️  Creating tsconfig.json...${NC}"
  cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
  echo -e "${GREEN}✓ tsconfig.json created${NC}"
else
  echo -e "${YELLOW}⚠ tsconfig.json already exists, skipping${NC}"
fi
echo ""

# Step 7: Create Tailwind config if it doesn't exist
if [ ! -f "tailwind.config.ts" ]; then
  echo -e "${BLUE}🎨 Creating tailwind.config.ts...${NC}"
  cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',      // Charcoal
        secondary: '#F5F5F0',    // Off-white
        accent: '#D4AF37',       // Gold
        neutral: {
          600: '#6B6B6B',
          200: '#E0E0E0',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
EOF
  echo -e "${GREEN}✓ tailwind.config.ts created${NC}"
else
  echo -e "${YELLOW}⚠ tailwind.config.ts already exists, skipping${NC}"
fi
echo ""

# Step 8: Summary
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Run: ${YELLOW}npm install${NC}"
echo "2. Add brand constants: ${YELLOW}src/lib/brand/constants.ts${NC} (see artifact)"
echo "3. Add VS Code snippets: ${YELLOW}.vscode/combat-clutter.code-snippets${NC} (see artifact)"
echo "4. Add validation script: ${YELLOW}scripts/validate-brand.js${NC} (see artifact)"
echo "5. Create Hero component: ${YELLOW}src/components/sections/Hero.tsx${NC} (see artifact)"
echo "6. Create Button component: ${YELLOW}src/components/ui/Button.tsx${NC} (see artifact)"
echo "7. Create utilities: ${YELLOW}src/lib/utils.ts${NC} (see artifact)"
echo "8. Run dev server: ${YELLOW}npm run dev${NC}"
echo ""
echo -e "${BLUE}Validate branding anytime with:${NC} ${YELLOW}npm run validate-brand${NC}"
echo ""
echo "🎉 Ready to build Combat Clutter LLC's website!"