interface Params {
  key: string;
  value: string | string[];
}

export function updateUrl(params: Params[], pathname?: string) {
  const searchParams = new URLSearchParams(window.location.search);

  params.forEach(({ key, value }) => {
    if (Array.isArray(value)) {
      const [head, ...tail] = value;
      searchParams.set(key, head);
      tail.forEach(val => searchParams.append(key, val));
    } else {
      searchParams.set(key, value);
    }
  });

  history.pushState(
    null,
    document.title,
    `${window.location.origin}${
      pathname || window.location.pathname
    }?${searchParams}`,
  );
}

export function getParam(key: string, params?: string): string | null {
  const searchParams = new URLSearchParams(params || window.location.search);
  console.log('params', searchParams.get(key), params);
  const param = searchParams.get(key);

  return param;
}

export function getParams(key: string, params?: string): string[] {
  const searchParams = new URLSearchParams(params || window.location.search);
  const param = searchParams.getAll(key);

  return param;
}

export function deleteParam(key: string) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(key);

  history.pushState(
    null,
    document.title,
    `${window.location.origin}${window.location.pathname}?${searchParams}`,
  );
}
