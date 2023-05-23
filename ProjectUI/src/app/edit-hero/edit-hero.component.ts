import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuperHero } from 'src/app/_models/super-hero';
import { SuperHeroService } from 'src/app/_services/super-hero.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss'],
})
export class EditHeroComponent implements OnInit {
  [x: string]: any;
  @Input() hero?: SuperHero;
  @Output() heroesUpdated = new EventEmitter<SuperHero[]>();

  constructor(private superHeroService: SuperHeroService) {}

  ngOnInit(): void {}

  updateHero(hero: SuperHero) {
    this.superHeroService
      .updateHero(hero)
      .subscribe((heroes: SuperHero[]) => this.heroesUpdated.emit(heroes));
  }

  deleteHero(hero: SuperHero) {
    this.superHeroService
      .deleteHero(hero)
      .subscribe((heroes: SuperHero[]) => this.heroesUpdated.emit(heroes));
  }

  createHero(hero: SuperHero) {
    this.superHeroService
      .createHero(hero)
      .subscribe((heroes: SuperHero[]) => this.heroesUpdated.emit(heroes));
  }

  //Validate ใน form
}
