import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { SectionContent } from './section-content';
import  {SectionHeader} from './section-header';
import {SectionDescription} from './section-description';
import {Section} from './section';


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
