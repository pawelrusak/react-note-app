import type TestSet from './core/testSet';
import type { RenderResult } from '@testing-library/react';

export type TestQueries = () => HTMLElement | null;

export type LikeRender = (...args: unknown[]) => RenderResult;

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export type GConstructor<T = {}> = new (...args: any[]) => T;

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
  get(): TestSet[];
}

export interface Renderable {
  getRenderComponent: LikeRender;
}

export interface Runnable {
  run(): void;
}

export interface BuildTestable
  extends Renderable,
    Getable,
    Negotiable,
    BeInTheDocumentMatchable,
    AttributeTestable {}
