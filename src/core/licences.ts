// The licences the app may use: each lets the text be copied, translated and used on a site that sells
// services (docs/research/SOURCES.md). Anything else — "non-commercial only", "all rights reserved",
// "permission needed" — is not on this list and a test refuses it (the owner's rules of 26.11).

export const LICENCE_KINDS = {
  /** Acts of state bodies of Ukraine are not objects of copyright: Civil Code of Ukraine, art. 434. */
  'ua-official-act': { credit: false },
  /** Works of the U.S. Government: not protected by copyright in the U.S. (17 U.S.C. § 105). */
  'us-government-work': { credit: false },
  /** UK Open Government Licence v3.0: the source's attribution statement is required. */
  'ogl-3.0': { credit: true },
  /** Creative Commons Attribution 4.0: credit and a note of changes are required. */
  'cc-by-4.0': { credit: true },
} as const;

export type LicenceKind = keyof typeof LICENCE_KINDS;

export function isLicenceKind(kind: string): kind is LicenceKind {
  return Object.hasOwn(LICENCE_KINDS, kind);
}
