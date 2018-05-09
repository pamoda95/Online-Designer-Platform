export class CanvasesResponse {
  private _success: boolean;
  private _canvas: any[];
  private _msg: string;


  get success(): boolean {
    return this._success;
  }

  set success(value: boolean) {
    this._success = value;
  }

  get canvas(): any {
    return this._canvas;
  }

  set canvas(value: any) {
    this._canvas = value;
  }

  get msg(): string {
    return this._msg;
  }

  set msg(value: string) {
    this._msg = value;
  }
}
