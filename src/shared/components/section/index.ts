import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { Section } from './section/index.js';
import { SectionContent } from './section-content/index.js';
import { SectionDescription } from './section-description/index.js';
import { SectionHeader } from './section-header/index.js';

interface SectionComponent extends ExtendedReactFunctionalComponent {
  Content: ExtendedReactFunctionalComponent;
  Header: ExtendedReactFunctionalComponent;
  Description: ExtendedReactFunctionalComponent;
}

(Section as SectionComponent).Content = SectionContent;
(Section as SectionComponent).Header = SectionHeader;
(Section as SectionComponent).Description = SectionDescription;

const SectionComponent = Section as SectionComponent;

export { SectionComponent as Section };
