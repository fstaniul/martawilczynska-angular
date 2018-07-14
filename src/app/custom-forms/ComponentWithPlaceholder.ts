import { InjectionToken } from '../../../node_modules/@angular/core';

export interface IComponentWithPlaceholder {
  placeholder: string;
}

export const COMPONENT_WITH_PLACEHOLDER = new InjectionToken('COMPONENT_WITH_PLACEHOLDER');
