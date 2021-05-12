import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { loadAssemblyDepthMax } from '@app/assembly/store/actions/assembly-depth-max.actions';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { consolidateGraphPosition, toGraph } from '@app/shared/converters';
import { Graph } from '@app/shared/models';
import { isNotNullOrUndefined } from '@app/shared/type-guards';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { loadAssemblyDepth } from '../../store/actions/assembly-depth.actions';
import { assemblyDepthMaxStateSelector, assemblyDepthStateSelector } from '../../store/assembly.selectors';
import { AssemblyState } from '../../store/models';

@Component({
  selector: 'asm-assembly-details',
  templateUrl: './assembly-details.component.html',
  styleUrls: ['./assembly-details.component.scss']
})
export class AssemblyDetailsComponent implements OnInit, OnDestroy {

  assemblyName = '';
  depthMax = 10;
  graph?: Graph;

  #selectedDepth = 1;
  #depthChanged: BehaviorSubject<number>;
  #depthSubscription?: Subscription;
  #storeSubscription?: Subscription;
  #storeDepthMaxSubscription?: Subscription;

  assemblyId: string;

  public set selectedDepth(value: number) {
    if (value === this.#selectedDepth) {
      return;
    }
    this.#selectedDepth = value;
    this.loadDepth(value);
  }

  public get selectedDepth(): number {
    return this.#selectedDepth;
  }

  public get depthAvailable(): boolean {
    return this.depthMax > 1;
  }

  constructor(
    public dialogRef: MatDialogRef<AssemblyDetailsComponent>,
    private readonly store: Store<AssemblyState>,
    @Inject(MAT_DIALOG_DATA) data: { id: string }) {

    this.assemblyId = data.id;

    this.store.dispatch(ActionBusyAppender.executeWithBusy(loadAssemblyDepthMax({ assemblyId: this.assemblyId }), 'AssemblyDepth'));
    this.#depthChanged = new BehaviorSubject(this.selectedDepth);
  }

  ngOnInit(): void {

    this.#storeDepthMaxSubscription = this.store.select(assemblyDepthMaxStateSelector).pipe(
      filter(isNotNullOrUndefined),
    ).subscribe(x => {
      this.depthMax = x.value ?? 0;
    });

    this.#storeSubscription = this.store.select(assemblyDepthStateSelector).pipe(
      filter(isNotNullOrUndefined),
    ).subscribe(x => {
      const newGraph = toGraph(x);
      this.graph = consolidateGraphPosition(newGraph, this.graph);
      this.assemblyName = `${x.name} (${x.version})`;
    });

    this.#depthSubscription = this.#depthChanged.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe(x => this.store.dispatch(ActionBusyAppender.executeWithBusy(loadAssemblyDepth({ assemblyId: this.assemblyId, depth: x }), 'AssemblyDepth')));
  }

  ngOnDestroy(): void {
    this.#depthSubscription?.unsubscribe();
    this.#storeSubscription?.unsubscribe();
    this.#storeDepthMaxSubscription?.unsubscribe();
  }

  private loadDepth(value: number): void {
    this.#depthChanged.next(value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
