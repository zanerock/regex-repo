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

export const validUuid = [
  '00000000-0000-1000-8000-000000000000',
  '00000000-0000-1000-8000-000000abcdef',
  '00000000-0000-1000-8000-000000ABCDEF',
]

export const invalidUuid = [
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-00000000000G',
  '00000000-0000-0000-0000-00000000000g',
]

export const validSsn = ['100-00-0001', '123-45-6789', '123-45-0001', '123456789']

export const invalidSsn = ['000-45-6789', '666-45-6789', '900-45-6789', '123-45-0000', '123-45-678']

export const ssnCaptureGroupInputs = [
  '100-00-0001',
  '123-45-6789',
  '123456789',
]

export const ssnCaptureGroupMatches = [
  ['100', '00', '0001'],
  ['123', '45', '6789'],
  ['123', '45', '6789'],
]

export const validEin = ['01-3456789', '59-3456789', '123456789']

export const invalidEin = ['07-3456789', '49-3456789', '12-345678']
