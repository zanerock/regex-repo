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
/* globals expect test */

const groupTestHelper = (re, data, isValid, desc) => {
  desc += ` (${re.toString()})`
  data.forEach((datum) => {
    test(`${desc} should ${isValid ? 'pass' : 'fail'} '${datum}'`, () => {
      expect(re.test(datum)).toBe(isValid)
    })
  })
}

export const groupTest = (re, validData, invalidData, desc) => {
  groupTestHelper(re, validData, true, desc)
  groupTestHelper(re, invalidData, false, desc)
}

export const groupTestPartial = (reString, validData, invalidData, desc, prefix = 'Hi! ', suffix = ' Bye!', flags) => {
  const re = new RegExp('(?:^|\\s+)' + reString + '(?:$|\\s+)', flags)
  groupTestHelper(re, validData.map((d) => prefix + d + suffix), true, desc + ' partial match')
  groupTestHelper(re, invalidData.map((d) => prefix + d + suffix), false, desc + ' partial match')
}

/**
 * Tests that a regular expression correctly extracts capture groups from input strings.
 *
 * This function supports two modes:
 * 1. Sequential mode: Tests capture groups 1, 2, 3, ... in order (when groupNumbers is omitted)
 * 2. Numbered mode: Tests specific capture group numbers (when groupNumbers is provided)
 *
 * The numbered mode is useful for regexes with internal non-capturing groups, backreferences,
 * or alternations that create sparse or non-sequential capture group numbering.
 *
 * @param {RegExp} re - The regular expression to test
 * @param {string[]} inputs - Array of input strings to test against the regex
 * @param {Array<Array<string|undefined>>} expectedMatches - Array of expected capture group values for each input.
 *        Each inner array contains the expected values for the capture groups being tested.
 * @param {number[]} [groupNumbers] - Optional array of capture group numbers to test.
 *        If omitted, tests groups 1, 2, 3, ... sequentially.
 * @param {string} desc - Description of the test (shown in test output)
 *
 * @example
 * // Sequential mode (tests groups 1, 2, 3)
 * testCaptureGroups(
 *   /(\d{4})-(\d{2})-(\d{2})/,
 *   ['2024-01-15'],
 *   [['2024', '01', '15']],
 *   'date capture groups'
 * )
 *
 * @example
 * // Numbered mode (tests specific group numbers: 1, 3, 5)
 * testCaptureGroups(
 *   /^(https?):\/\/((?:\w+\.)*\w+)(:\d+)?(\/.*)?$/,
 *   ['https://example.com:8080/path'],
 *   [['https', 'example.com', ':8080', '/path']],
 *   [1, 2, 3, 4], // explicitly specify which groups to test
 *   'URL capture groups'
 * )
 */
export const testCaptureGroups = (re, inputs, expectedMatches, groupNumbers, desc) => {
  // Handle optional groupNumbers parameter
  // If groupNumbers is a string, it's actually the desc parameter
  if (typeof groupNumbers === 'string' && desc === undefined) {
    desc = groupNumbers
    groupNumbers = undefined
  }

  desc += ` (${re.toString()})`
  inputs.forEach((input, index) => {
    const expected = expectedMatches[index]
    test(`${desc} should extract capture groups from '${input}'`, () => {
      const match = re.exec(input)
      expect(match).not.toBeNull()
      if (match) {
        // Test capture groups by number if provided, otherwise sequentially
        expected.forEach((expectedValue, arrayIndex) => {
          const groupNumber = groupNumbers ? groupNumbers[arrayIndex] : arrayIndex + 1
          const actualValue = match[groupNumber]
          expect(actualValue).toBe(expectedValue)
        })
      }
    })
  })
}

// Backward compatibility alias
export const testCaptureGroupsByNumber = testCaptureGroups
