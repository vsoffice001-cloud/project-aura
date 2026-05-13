#!/bin/bash
# Fetch and persist design system from GitHub repo

REPO_URL="https://github.com/vsoffice001-cloud/Design-System-vs-26.git"
DEST_DIR="design-system/core"

echo "======================================"
echo " Fetching Local Design System"
echo "======================================"

if [ -d "$DEST_DIR" ]; then
    echo "Design system directory '$DEST_DIR' already exists. Pulling latest changes..."
    cd "$DEST_DIR" || exit
    git pull
    cd ../..
else
    echo "Cloning design system repository into '$DEST_DIR'..."
    git clone "$REPO_URL" "$DEST_DIR"
fi

# Ensure references directory exists in the design-system skill
mkdir -p skills/design-system/references/

# Extract design system reference file
if [ -f "$DEST_DIR/DESIGN_SYSTEM_AI_CONTEXT.md" ]; then
    cp "$DEST_DIR/DESIGN_SYSTEM_AI_CONTEXT.md" skills/design-system/references/design-system-v26.md
    echo "Successfully updated skills/design-system/references/design-system-v26.md"
elif [ -f "$DEST_DIR/design-system.md" ]; then
    cp "$DEST_DIR/design-system.md" skills/design-system/references/design-system-v26.md
    echo "Successfully updated skills/design-system/references/design-system-v26.md"
else
    echo "Warning: DESIGN_SYSTEM_AI_CONTEXT.md / design-system.md not found in the repository."
fi

echo "======================================"
echo " Design system is now available locally in the '$DEST_DIR' directory."
echo "======================================"