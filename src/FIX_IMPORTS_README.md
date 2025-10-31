# Import Version Fix

All imports with `@version` syntax need to be converted to standard npm imports.

## Pattern to fix:
```
from "package@1.2.3" → from "package"
```

## Files to fix:
All `/components/ui/*.tsx` files

## Command to run locally:
```bash
# Use sed to remove @version from all imports
find components/ui -name "*.tsx" -exec sed -i '' 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//g' {} \;
```

Or on Linux:
```bash
find components/ui -name "*.tsx" -exec sed -i 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//g' {} \;
```
