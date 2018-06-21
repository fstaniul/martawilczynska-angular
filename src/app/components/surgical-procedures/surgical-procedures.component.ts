import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { trigger, transition, animate, state, style } from '@angular/animations';

const navAnimation = trigger('navAnimation', [
  state('false', style({ height: '0', opacity: 0 })),
  state('true', style({ height: '*', opacity: 1 })),
  transition('* => *', [animate(300)])
]);

@Component({
  selector: 'app-surgical-procedures',
  templateUrl: './surgical-procedures.component.html',
  styleUrls: ['./surgical-procedures.component.scss']
})
export class SurgicalProceduresComponent implements OnInit, OnDestroy {
  procedures: any = null;
  selectedProcedure = '';

  navOpen = false;

  private _dataSubscription: Subscription;
  private _paramsSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this._dataSubscription = this.dataService.get('surgical-procedures').subscribe((content) => {
      this.procedures = content;
    });

    this._paramsSubscription = this.activatedRoute.params.subscribe((params) => {
      this.selectedProcedure = params.procedure;
    });
  }

  ngOnDestroy(): void {
    if (this._dataSubscription) this._dataSubscription.unsubscribe();
    if (this._paramsSubscription) this._paramsSubscription.unsubscribe();
  }

  procedurePath(procedureKey: string): string {
    return `/${this.translateService.currentLang}/surgical-procedures/${procedureKey}`;
  }

  procedureText(procedureKey: string): string {
    return this.procedures[procedureKey].name;
  }

  get currentProcedure() {
    if (!this.procedures || !this.selectedProcedure) return '';
    const content = this.procedures[this.selectedProcedure];
    if (typeof content === 'undefined') return '';
    return content;
  }

  get procedureKeys() {
    if (!this.procedures) return [];
    return Object.keys(this.procedures).sort((a: string, b: string) => {
      const aOrder = typeof this.procedures[a].order !== 'undefined' ? this.procedures[a].order : Infinity;
      const bOrder = typeof this.procedures[b].order !== 'undefined' ? this.procedures[b].order : Infinity;

      if (aOrder < bOrder) return -1;
      else if (aOrder > bOrder) return 1;
      return 0;
    });
  }
}
