export interface Resolver<T> {
  resolve(object: any): T;
}
