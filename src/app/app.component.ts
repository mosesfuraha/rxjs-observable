import { Component, OnInit } from '@angular/core';
import { from, interval, of, concat, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rxjs-learn';

  emittedValues: number[] = [];
  emittedColors: string[] = [];

  ngOnInit(): void {
    const numberObservable = of(1, 2, 3, 4, 5);

    numberObservable.subscribe({
      next: (value: number) => this.emittedValues.push(value),
      complete: () => console.log('Observable completed'),
    });

    const favoriteColors = ['Red', 'Blue', 'Green', 'Purple', 'Orange'];
    const colorsObservable = from(favoriteColors);

    colorsObservable.subscribe({
      next: (color: string) => this.emittedColors.push(color),
      complete: () =>
        console.log('All colors have been emitted, observable completed'),
    });

    const intervalObservable = interval(1000).pipe(take(5));

    intervalObservable.subscribe({
      next: (value: number) => {
        const currentTime = new Date().toLocaleTimeString();
        console.log(`Emitted value: ${value} at ${currentTime}`);
      },
      complete: () => console.log('Interval observable completed'),
    });

    const combinedObservable = concat(numberObservable, colorsObservable);

    combinedObservable.subscribe({
      next: (value) => console.log(`Combined value: ${value}`),
      complete: () => console.log('Combined observable completed'),
    });

    const errorObservable = concat(
      of(10, 20, 30),
      throwError(() => new Error('An error occurred after emitting values'))
    ).pipe(
      catchError((error) => {
        console.error(`Error: ${error.message}`);
        return of(); 
      })
    );

    errorObservable.subscribe({
      next: (value) => console.log(`Error observable value: ${value}`),
      complete: () => console.log('Error observable completed'),
      error: (err) => console.log(`Caught error: ${err}`),
    });
  }
}
