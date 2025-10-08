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
import { emailReString } from './contacts'
import { ipHostReString, ipV6ReString, ipVFutureReString } from './network'
import { fqDomainNameReString } from './domain-name'
import { lockdownRe } from './lib/lockdown-re'

// based on the generic URI Re given in [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#page-51).
export const urlReString = '(?:([a-z][a-z0-9+.-]*):\\/{0,2}([^/?#]*)(\\/[^?#]*)?(?:\\?([^#]*))?(?:#(.*))?)'

/**
 * Matches a valid, generic URL. Provides capture groups:
 * - Group 1: schema
 * - Group 2: server/authority
 * - Group 3: path
 * - Group 4: query part
 * - Group 5: intra-page link/fragment
 *
 * Note, a URL always has scheme, and at a minimum a server/authority or path, and may have
 * both. The query and fragment components are always optional. For general usage, you might want to use the more
 * specific Res for specific protocols or the `commonUrlRe`.
 * @category URL
 */
export const urlRe = lockdownRe(urlReString, 'u')

export const mailtoUrlReString = `(?:mailto:(${emailReString}))`

/**
 * Matches a valid 'mailto:' URL. Provides a single capture group:
 * - Group 1: email address
 *
 * You must use the either the 'u' or 'v' flag when using the Re string.
 * @category URL
 */
export const mailtoUrlRe = lockdownRe(mailtoUrlReString, 'u')

const userPlusPassReString = '(?:([^\\s:]+)(?::(\\S*))?@)'
const hostOrIPReString = `(${ipHostReString}|${fqDomainNameReString}|\\[(?:${ipV6ReString}|${ipVFutureReString})\\]|localhost)`
const portReString = '(?::(\\d{2,5}))'
// though URLs in general allow spaces in the path component, they are disallowed in the HTTP(S) protocols
const urlPathReString = '(\\/[^ ?#]*)'
// though URLs in general allow spaces in the query and fragment components, we disallow them in the HTTP(S) protocol
const urlQueryAndFragementReString = '(?:\\?([^ #]*))?(?:#([^ ]*))?' // already has the '?' qualifiers

export const httpUrlReString =
`(https?):\\/\\/${userPlusPassReString}?${hostOrIPReString}${portReString}?${urlPathReString}?${urlQueryAndFragementReString}`

/**
 * Matches a valid 'http/https' URL. Provides capture groups:
 * - Group 1: protocol
 * - Group 2: username
 * - Group 3: user password
 * - Group 4: host or IP
 * - Group 5: port
 * - Group 6: path
 * - Group 7: query string
 * - Group 8: fragment
 *
 * You must use the either the 'u' or 'v' flag when using the Re string.
 * @category URL
 */
export const httpUrlRe = lockdownRe(httpUrlReString, 'u')

export const ftpUrlReString = `(?:ftp:\\/\\/${userPlusPassReString}?${hostOrIPReString}${portReString}?${urlPathReString}?)`

/**
 * Matches a valid 'ftp' URL. Provides capture groups:
 * - Group 1: username
 * - Group 2: user password
 * - Group 3: host or IP
 * - Group 4: port
 * - Group 5: path
 *
 * You must use the either the 'u' or 'v' flag when using the Re string.
 * @category URL
 */
export const ftpUrlRe = lockdownRe(ftpUrlReString, 'u')

export const fileUrlReString = `(?:file:\\/\\/${hostOrIPReString}?${urlPathReString})`

/**
 * Matches a valid 'file' URL. Provides capture groups:
 * - Group 1: host
 * - Group 2: port
 * - Group 3: path
 *
 * You must use the either the 'u' or 'v' flag when using the Re string.
 * @category URL
 */
export const fileUrlRe = lockdownRe(fileUrlReString, 'u')

export const commonUrlReString = `(?:${mailtoUrlReString}|${httpUrlReString}|${ftpUrlReString}|${fileUrlReString})`

/**
 * Matches any of the "common" web URL types: 'mailto', 'http/https', 'ftp', and 'file'. You must use the either the
 * 'u' or 'v' flag when using the Re string.
 * @category URL
 */
export const commonUrlRe = lockdownRe(commonUrlReString, 'u')
