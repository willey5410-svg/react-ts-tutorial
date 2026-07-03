import { lazy } from 'react'

export const chapterComponents: Record<
  string,
  ReturnType<typeof lazy>
> = {
  '00-prep': lazy(() => import('./Chapter00Prep')),
  '01-first-component': lazy(() => import('./Chapter01FirstComponent')),
  '02-types': lazy(() => import('./Chapter02Types')),
  '03-props': lazy(() => import('./Chapter03Props')),
  '04-state': lazy(() => import('./Chapter04State')),
  '05-events': lazy(() => import('./Chapter05Events')),
  '06-split': lazy(() => import('./Chapter06Split')),
  '07-forms': lazy(() => import('./Chapter07Forms')),
  '08-reducer-context': lazy(() => import('./Chapter08ReducerContext')),
  '09-query': lazy(() => import('./Chapter09Query')),
  '10-router': lazy(() => import('./Chapter10Router')),
  '11-testing': lazy(() => import('./Chapter11Testing')),
  '12-deploy': lazy(() => import('./Chapter12Deploy')),
}
