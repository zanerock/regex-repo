/*
Copyright 2023 Liquid Labs LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * This test verifies that all expected regex exports are available from the main
 * index. It catches cases where a module defines exports but the index.js file
 * doesn't re-export them.
 *
 * The expected exports are dynamically extracted from source files by the
 * scripts/extract-exports.sh script, which generates test-staging/expected-exports.json
 */

import * as allExports from '../index'
import { readFileSync } from 'fs'

// Load expected exports from generated JSON file
// When Jest runs, it executes from the test-staging directory after Babel compilation
const expectedExports = JSON.parse(readFileSync('expected-exports.json', 'utf-8'))

// Flatten all expected exports into a single array
const allExpectedExports = Object.values(expectedExports).flat()

describe('Package exports verification', () => {
  test.each(allExpectedExports)('export "%s" should be available from index', (exportName) => {
    expect(allExports[exportName]).toBeDefined()

    // Also verify it's the correct type (RegExp for *Re, string for *ReString)
    if (exportName.endsWith('Re') && !exportName.endsWith('ReString')) {
      expect(allExports[exportName]).toBeInstanceOf(RegExp)
    }
    else if (exportName.endsWith('ReString')) {
      expect(typeof allExports[exportName]).toBe('string')
    }
  })

  // Group tests by module to make it easier to identify which module is missing
  describe.each(Object.entries(expectedExports))('%s module exports', (moduleName, exports) => {
    test(`all ${moduleName} exports should be available`, () => {
      const missingExports = exports.filter((exportName) => allExports[exportName] === undefined)

      if (missingExports.length > 0) {
        throw new Error(`Missing exports from ${moduleName}: ${missingExports.join(', ')}`)
      }

      expect(missingExports).toHaveLength(0)
    })
  })
})
