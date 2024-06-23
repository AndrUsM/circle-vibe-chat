import React, { useContext } from 'react';

import { FieldContext } from '../_shared/field-context/field-context';

import { CustomCssVariables } from '../../../types/custom-css-variables';
import { ExtendedReactFunctionalComponent } from "../../../types/extended-react-functional-component";

import '../../fields/_shared/constants/text-input-generic-styles.scss';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput: ExtendedReactFunctionalComponent<React.InputHTMLAttributes<HTMLInputElement>> = ({ onChange, value, ...props }) => {
  const fieldProvider = useContext(FieldContext);
  return (
    <input className='text-input-generic-styles' {...props} onChange={(e) => {
      fieldProvider.setValue(e.target.value as unknown as string)
    }} value={value} style={{
      '--text-input-border-color': (fieldProvider.errors ?? "")?.length > 0 ? 'var(--chat-var-default-field-border-errors-color)' : 'transparent',
      '--text-input-text-color': `var(${(fieldProvider.errors ?? "")?.length > 0 ? '--chat-var-default-field-color-errors-color' : '--chat-var-default-text-color'})`,
      '--text-input-outline-color': (fieldProvider.errors ?? "")?.length > 0 ? 'var(--chat-var-default-field-outline-errors-color)' : 'transparent',
      '--text-input-background': `var(${(fieldProvider.errors ?? "")?.length > 0 ? '--chat-var-default-field-errors-background' : '--chat-var-color-white'})`,
    } as CustomCssVariables} />
  )
}