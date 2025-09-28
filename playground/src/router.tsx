import { ComponentType } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import Layout, { PlaygroundPage } from './layout';

type PageModule = {
  default: ComponentType;
  meta?: {
    title?: string;
    description?: string;
    order?: number;
  };
};

const pageModules = import.meta.glob<PageModule>('./pages/**/*.tsx', { eager: true });

type PageDefinition = PlaygroundPage & {
  component: ComponentType;
  order: number;
};

const slugifySegment = (segment: string) =>
  segment
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase();

const filePathToRoute = (filePath: string) => {
  const parts = filePath.replace('./pages/', '').replace(/\.tsx$/, '').split('/');
  const pathSegments = parts
    .filter((segment, index) => !(segment.toLowerCase() === 'index' && index === parts.length - 1))
    .map((segment) => slugifySegment(segment))
    .filter(Boolean);

  if (pathSegments.length === 0) {
    return '/';
  }

  return `/${pathSegments.join('/')}`;
};

const deriveTitleFromPath = (path: string) => {
  if (path === '/') {
    return 'Overview';
  }

  return path
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .split('-')
        .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1))
        .join(' '),
    )
    .join(' / ');
};

const pages: PageDefinition[] = Object.entries(pageModules).map(([filePath, module]) => {
  const Component = module.default;
  const path = filePathToRoute(filePath);
  const { meta } = module;
  const title = meta?.title ?? deriveTitleFromPath(path);
  const description = meta?.description;
  const order = meta?.order ?? (path === '/' ? -Infinity : Infinity);

  return {
    path,
    title,
    description,
    component: Component,
    order,
  };
});

const sortedPages = pages.sort((a, b) => {
  if (a.order !== b.order) {
    return a.order - b.order;
  }

  if (a.path === '/') {
    return -1;
  }

  if (b.path === '/') {
    return 1;
  }

  return a.path.localeCompare(b.path);
});

const childRoutes: RouteObject[] = sortedPages.map((page) => {
  const Component = page.component;

  if (page.path === '/') {
    return {
      index: true,
      element: <Component />,
    };
  }

  return {
    path: page.path.slice(1),
    element: <Component />,
  };
});

const navigationPages: PlaygroundPage[] = sortedPages.map(({ path, title, description }) => ({
  path,
  title,
  description,
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout pages={navigationPages} />,
    children: childRoutes,
  },
]);

export default router;
