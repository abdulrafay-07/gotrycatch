type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function goCatch<T, E = Error>(
  promiseOrFn: Promise<T> | (() => Promise<T>),
): Promise<Result<T, E>> {
  try {
    const data =
      typeof promiseOrFn === 'function'
        ? await promiseOrFn()
        : await promiseOrFn;

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as E };
  };
};
