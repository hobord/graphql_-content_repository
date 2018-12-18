import { IObserver } from './IObserver';
import { ISubject } from './ISubject';

export class Subject implements ISubject {
  private observers: IObserver[] = [];

  public register(observer: IObserver): void {
      this.observers.push(observer);
  }

  public unregister(observer: IObserver): void {
      var n: number = this.observers.indexOf(observer);
      this.observers.splice(n, 1);
  }

  public notify(payload?: any): void {
      var i: number
        , max: number;

      for (i = 0, max = this.observers.length; i < max; i += 1) {
          this.observers[i].notify(payload);
      }
  }
}


