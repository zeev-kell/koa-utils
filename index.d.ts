export namespace KoaUtils {
  export function local(operationName: string, callable: Function);

  export function reset();

  export function scoped(callable: Function);

  export function create(ctx: any);

  export function bindTracer();

  export function addRecordBinary(ctx: any, options: object, isEnd?: Boolean);
}
