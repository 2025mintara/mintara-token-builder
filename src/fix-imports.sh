#!/bin/bash

# Fix all versioned imports in UI components
# This script removes @version from import statements

echo "🔧 Fixing versioned imports..."

# Define files to fix (all .tsx files in components/ui)
files=(
  "components/ui/accordion.tsx"
  "components/ui/alert-dialog.tsx"
  "components/ui/alert.tsx"
  "components/ui/aspect-ratio.tsx"
  "components/ui/avatar.tsx"
  "components/ui/badge.tsx"
  "components/ui/breadcrumb.tsx"
  "components/ui/button.tsx"
  "components/ui/calendar.tsx"
  "components/ui/carousel.tsx"
  "components/ui/chart.tsx"
  "components/ui/checkbox.tsx"
  "components/ui/collapsible.tsx"
  "components/ui/command.tsx"
  "components/ui/context-menu.tsx"
  "components/ui/dialog.tsx"
  "components/ui/drawer.tsx"
  "components/ui/dropdown-menu.tsx"
  "components/ui/form.tsx"
  "components/ui/hover-card.tsx"
  "components/ui/input-otp.tsx"
  "components/ui/label.tsx"
  "components/ui/menubar.tsx"
  "components/ui/navigation-menu.tsx"
  "components/ui/pagination.tsx"
  "components/ui/popover.tsx"
  "components/ui/progress.tsx"
  "components/ui/radio-group.tsx"
  "components/ui/resizable.tsx"
  "components/ui/scroll-area.tsx"
  "components/ui/select.tsx"
  "components/ui/separator.tsx"
  "components/ui/sheet.tsx"
  "components/ui/sidebar.tsx"
  "components/ui/slider.tsx"
  "components/ui/switch.tsx"
  "components/ui/tabs.tsx"
  "components/ui/textarea.tsx"
  "components/ui/toggle-group.tsx"
  "components/ui/toggle.tsx"
  "components/ui/tooltip.tsx"
)

# Fix each file
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  Fixing $file..."
    # Remove @version from all imports using sed
    sed -i 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//' "$file" 2>/dev/null || \
    sed -i '' 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//' "$file" 2>/dev/null
  fi
done

echo "✅ Import fix complete!"
