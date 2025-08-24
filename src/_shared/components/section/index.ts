import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { Section } from './section';
import { SectionContent } from './section-content';
import { SectionDescription } from './section-description';
import { SectionHeader } from './section-header';

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
