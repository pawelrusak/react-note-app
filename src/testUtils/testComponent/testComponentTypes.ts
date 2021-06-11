import type { RenderResult } from '@testing-library/react';

export type TestQueries = () => HTMLElement | null;

export type LikeRender = (...args: unknown[]) => RenderResult;

export interface Negotiable {
  not: this;
}

export interface BeInTheDocumentMatchable {
  toBeInTheDocument: (name: string, element: TestQueries) => this;
}

export interface AttributeTestable {
  withAttribute: (attr: string, value: unknown) => this;
}

export interface Getable {
  get(): unknown[];
}

export interface Renderable {
  getRenderComponent: LikeRender;
}
