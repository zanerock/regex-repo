#!/usr/bin/env bash
# Extract all exported regex constants from source files and generate expected-exports.json

set -e

# Create output directory if it doesn't exist
mkdir -p test-staging

# Initialize JSON structure
echo '{' > test-staging/expected-exports.json

first_file=true

# Find all .js and .mjs files in src/ (excluding index.js and test files)
for file in src/*.js src/*.mjs; do
  # Skip index.js and test files
  if [[ "$file" == "src/index.js" ]] || [[ "$file" == *test* ]]; then
    continue
  fi

  # Extract module name from filename (remove src/ prefix and extension)
  module_name=$(basename "$file" | sed -E 's/\.(js|mjs)$//')

  # Find all exports matching the pattern (export const xxxRe or export const xxxReString)
  exports=$(grep -E '^export const \w+(Re|ReString) =' "$file" | sed -E 's/^export const ([a-zA-Z0-9_]+)(Re|ReString) =.*/\1\2/' || true)

  # Skip if no exports found
  if [[ -z "$exports" ]]; then
    continue
  fi

  # Add comma before this entry if not the first
  if [[ "$first_file" == false ]]; then
    echo ',' >> test-staging/expected-exports.json
  fi
  first_file=false

  # Convert to JSON array format
  echo -n "  \"$module_name\": [" >> test-staging/expected-exports.json

  first_export=true
  while IFS= read -r export_name; do
    if [[ -n "$export_name" ]]; then
      if [[ "$first_export" == false ]]; then
        echo -n ', ' >> test-staging/expected-exports.json
      fi
      first_export=false
      echo -n "\"$export_name\"" >> test-staging/expected-exports.json
    fi
  done <<< "$exports"

  echo -n ']' >> test-staging/expected-exports.json
done

# Close JSON structure
echo '' >> test-staging/expected-exports.json
echo '}' >> test-staging/expected-exports.json

echo "Generated test-staging/expected-exports.json"
