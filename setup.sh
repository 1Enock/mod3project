#!/bin/bash
# setup.sh - Complete setup script for deployment and versioning
# This script automates the initial setup after the configuration files are created

set -e

echo "🚀 Starting Deployment & Versioning Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install root dependencies
echo -e "${BLUE}Step 1: Installing root dependencies...${NC}"
if npm install; then
    echo -e "${GREEN}✓ Root dependencies installed${NC}"
else
    echo -e "${YELLOW}✗ Failed to install root dependencies${NC}"
    exit 1
fi
echo ""

# Step 2: Install app dependencies
echo -e "${BLUE}Step 2: Installing app dependencies...${NC}"
if npm install --prefix my-app; then
    echo -e "${GREEN}✓ App dependencies installed${NC}"
else
    echo -e "${YELLOW}✗ Failed to install app dependencies${NC}"
    exit 1
fi
echo ""

# Step 3: Run linting
echo -e "${BLUE}Step 3: Running linting checks...${NC}"
if npm run lint --prefix my-app; then
    echo -e "${GREEN}✓ Linting passed${NC}"
else
    echo -e "${YELLOW}✗ Linting failed - fix issues before proceeding${NC}"
fi
echo ""

# Step 4: Run tests
echo -e "${BLUE}Step 4: Running tests...${NC}"
if npm run test --prefix my-app; then
    echo -e "${GREEN}✓ Tests passed${NC}"
else
    echo -e "${YELLOW}⚠ Some tests failed - review and fix${NC}"
fi
echo ""

# Step 5: Build application
echo -e "${BLUE}Step 5: Building application...${NC}"
if npm run build --prefix my-app; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${YELLOW}✗ Build failed - fix issues before proceeding${NC}"
    exit 1
fi
echo ""

# Step 6: Setup git hooks (optional)
echo -e "${BLUE}Step 6: Setting up git hooks (optional)...${NC}"
if command -v husky &> /dev/null; then
    echo "Husky already installed"
else
    read -p "Install husky for git hooks? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install husky --save-dev
        npx husky install
        npx husky add .husky/pre-commit "npm run lint --prefix my-app"
        npx husky add .husky/commit-msg "npx --no -- commitlint --edit \$1"
        echo -e "${GREEN}✓ Git hooks configured${NC}"
    fi
fi
echo ""

# Step 7: Summary
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo "  1. Read SETUP_COMPLETE.md"
echo "  2. Update package.json with your repository URL"
echo "  3. Add deployment commands to .github/workflows/deploy.yml"
echo "  4. Add GitHub secrets for deployment credentials"
echo "  5. Make your first commit using conventional format"
echo ""
echo "🚀 Quick Start:"
echo "  npm run dev           # Start development server"
echo "  npm run build         # Build for production"
echo "  npm run test          # Run tests"
echo "  npm run lint          # Run linter"
echo ""
echo "📚 Documentation:"
echo "  - SETUP_COMPLETE.md         (Start here!)"
echo "  - DEPLOYMENT_QUICKSTART.md  (5-minute guide)"
echo "  - DEPLOYMENT.md             (Complete reference)"
echo "  - VERSIONING.md             (Commit format guide)"
echo "  - ARCHITECTURE.md           (Technical design)"
echo ""
echo "Happy deploying! 🎉"
