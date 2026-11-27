// The sections of the guide, in the order they are filled and shown (decision of 27.11, docs/SPEC.md). A
// section's name and words are texts of the dictionaries (`sections.<id>`); its cards come with stage 4.

export const SECTION_IDS = ['help', 'firstAid', 'dangers', 'water', 'fire', 'shelter', 'orientation', 'tools'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function isSection(id: string): id is SectionId {
  return (SECTION_IDS as readonly string[]).includes(id);
}
