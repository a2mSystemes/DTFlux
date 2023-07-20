export class FilteredArray<T> extends Array<T> implements Iterable<T> {
  static filterByKey<T>(arr: FilteredArray<T>, key: string, value: any): FilteredArray<T> {
    return arr.filter(result => (result as any)[key] === value);
  }
  [Symbol.iterator](): IterableIterator<T> {
    let index = 0;
    const array = this as any as Array<T>;

    return {
      next(): IteratorResult<T> {
        if (index < array.length) {
          return {
            done: false,
            value: array[index++]
          };
        } else {
          return {
            done: true,
            value: undefined as any
          };
        }
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }
}
