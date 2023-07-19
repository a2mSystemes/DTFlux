export class FilteredArray<T> extends Array<T> {
  static filterByKey<T>(arr: FilteredArray<T>, key: string, value: any): FilteredArray<T> {
    return arr.filter(result => (result as any)[key] === value);
  }
}
