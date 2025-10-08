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

export const validNPMPackageNames = ['ansi-escapes', 'foo.com', '@acme/foo']

export const invalidNPMPackageNames = ['excited!', '.start-with-a-peried', '@acme/!foo']

export const npmPackageNameCaptureGroupInputs = [
  'ansi-escapes',
  '@acme/foo',
  'foo.com',
]

export const npmPackageNameCaptureGroupMatches = [
  [undefined, 'ansi-escapes'],
  ['@acme/', 'foo'],
  [undefined, 'foo.com'],
]
