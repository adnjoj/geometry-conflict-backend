export interface Transformer<T> {
  toClass(plain: any): T;
}
