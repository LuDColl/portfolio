import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { compare, hash } from 'bcryptjs';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  mergeMap,
  Observable,
  Subject,
} from 'rxjs';
import { startValue$ } from '../functions/control';
import { showed } from '../operators/showed.operator';
import { asyncMap } from '../operators/asyncMap.operator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('bcrypt') private bcryptRef!: ElementRef;

  saltControl = new FormControl(10);
  passwordControl = new FormControl('');
  hashControl = new FormControl('');

  passwordHash$: Observable<string>;
  hashConclusion$: Observable<string>;

  constructor() {
    console.log('constructor');
    const { saltControl, passwordControl, hashControl } = this;

    saltControl.valueChanges.subscribe(this.scrollToBcryptBottom);
    passwordControl.valueChanges.subscribe(this.scrollToBcryptBottom);
    hashControl.valueChanges.subscribe(this.scrollToBcryptBottom);

    const salt$ = startValue$(saltControl);
    const password$ = startValue$(passwordControl);
    const hash$ = startValue$(hashControl);

    this.passwordHash$ = combineLatest([salt$, password$]).pipe(
      asyncMap(this.passwordHashProject)
    );

    this.hashConclusion$ = combineLatest([password$, hash$]).pipe(
      asyncMap(this.hashConclusionProject)
    );
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  afterNextRender() {
    console.log('afterNextRender');
  }

  afterRender() {
    console.log('afterRender');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  private passwordHashProject = async ([salt, password]: [
    salt: number | null,
    password: string | null
  ]) => {
    console.log('passwordHashProject');
    if (!salt || !password) return '';

    const passwordHash = await hash(password, salt);
    return passwordHash;
  };

  private hashConclusionProject = async ([password, hash]: [
    password: string | null,
    hash: string | null
  ]) => {
    console.log('hashConclusionProject');
    if (!password || !hash) return '';

    const valid = await compare(password, hash);
    const hashConclusion = valid ? 'Hash válido' : 'Hash divergente';
    return hashConclusion;
  };

  private scrollToBcryptBottom = async () => {
    console.log('scrollToBottom');
    await new Promise((resolve) => setTimeout(resolve, 150));
    const elementPosition = this.bcryptRef.nativeElement.offsetTop;
    window?.scrollTo({ top: elementPosition, behavior: 'smooth' });
  };
}
