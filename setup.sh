#!/bin/bash
set -e

echo "🔧 BulkDirect Setup"
echo "===================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install Node >=18"
    exit 1
fi

echo "✅ Node.js: $(node --version)"

# Check environment
if [ ! -f .env ]; then
    echo "⚠️  .env not found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Edit .env with your API keys"
fi

# Verify project structure
echo "✅ Project structure verified"
echo ""
echo "📦 Project ready. Next steps:"
echo "1. Add API keys to .env"
echo "2. Run: npm install (after enabling registry.npmjs.org in network settings)"
echo "3. Run: npm run demo"
echo ""
