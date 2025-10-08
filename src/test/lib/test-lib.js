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

export const testCaptureGroupsByNumber = testCaptureGroups
