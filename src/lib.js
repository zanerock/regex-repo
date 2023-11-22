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

/* globals test, expect */

export const lockdownRe = (str, flags) =>
  Array.isArray(str)
    ? new RegExp(`^\\s*(?:${str.join('|')})\\s*$`, flags)
    : new RegExp(`^\\s*${str}\\s*$`, flags)

const groupTestHelper = (re, data, isValid, desc) =>
  data.forEach((datum) =>
    test(`${desc ? desc + ' should ' : ''}${isValid ? 'pass' : 'fail'} '${datum}'`, () => {
      expect(re.test(datum)).toBe(isValid)
    })
  )

export const groupTest = (re, validData, invalidData, desc) => {
  groupTestHelper(re, validData, true, desc)
  groupTestHelper(re, invalidData, false, desc)
}
