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

import { groupTest, groupTestPartial } from './lib/test-lib'
import * as regex from '../semver'

const validSemver2 = [
  '0.0.0',
  '0.0.1',
  '0.1.0',
  '1.0.0',
  '1.2.3',
  '10.20.30',
  '999.999.999',
  '1.0.0-alpha',
  '1.0.0-alpha.1',
  '1.0.0-0.3.7',
  '1.0.0-x.7.z.92',
  '1.0.0-x-y-z.--',
  '1.0.0-alpha+001',
  '1.0.0+20130313144700',
  '1.0.0-beta+exp.sha.5114f85',
  '1.0.0+21AF26D3----117B344092BD',
  '1.0.0-alpha.beta',
  '1.0.0-alpha.beta.1',
  '1.0.0-alpha.1.beta.2',
  '1.0.0-rc.1+build.1',
  '2.0.0-rc.1+build.123',
]

const invalidSemver2 = [
  '',
  '1',
  '1.2',
  '01.1.1',
  '1.01.1',
  '1.1.01',
  'v1.0.0',
  '1.0.0-',
  '1.0.0-+invalid',
  '1.0.0-alpha_beta',
  '1.0.0-alpha..beta',
  '1.0.0-01',
  '1.0.0-alpha.01',
  '1.0.0+',
  '1.0.0+invalid_meta',
  '1.0.0-alpha+',
  '+invalid',
  '-invalid',
  'a.b.c',
  '1.0.0-alpha!beta',
]

groupTest(regex.semver2Re, validSemver2, invalidSemver2, 'semver2')
groupTestPartial(regex.semver2ReString, validSemver2, invalidSemver2, 'semver2')
