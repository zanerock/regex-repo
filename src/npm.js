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

import { lockdownRe } from './lib/lockdown-re'
import { semver2RangeReString } from './semver'

export const npmPackageNameReString = '(@[a-z0-9-~][a-z0-9-._~]*/)?([a-z0-9-~][a-z0-9-._~]*)'

/**
 * Matches an NPM package name. Provides matching groups 1 (org name,
 * if any) and 2 (package basename).
 * @category NPM
 */
export const npmPackageNameRe = lockdownRe(npmPackageNameReString)

export const npmPackageTagReString = `(?!${semver2RangeReString})`

/**
 * Matches an NPM package tag. A tag can, in theory, be anything that cannot be confused with a semver range.
 * @category NPM
 */
export const npmPackageTagRe = lockdownRe(npmPackageTagReString)

// In practice, this is a complicated way of saying "anything" because any non-semver range is a valid tag.
export const npmPackageSpecReString = `(?!${semver2RangeReString}|${npmPackageTagReString})`

/**
 * Matches an NPM package specification. Note, because any string that cannot be confused with a semver is, in theory,
 * a valid tag, this could be any string.
 * @category NPM
 */
export const npmPackageSpecRe = lockdownRe(npmPackageSpecReString)