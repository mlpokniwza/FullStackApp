import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SuperHero } from '../_models/super-hero';
import { SuperHeroService } from '../_services/super-hero.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, AfterViewInit {
  title = 'Tour of Heroes';
  // myForm: FormGroup;
  heroes: SuperHero[] = [];
  heroToEdit: SuperHero;

  limit: number = 3;
  id: string = '';
  name: string = '';
  firstName: string = '';
  lastName: string = '';
  place: string = '';
  dirtyFormID = 'something';
  resetForm = <HTMLFormElement>document.getElementById(this.dirtyFormID);

  // public test(): void {
  //   console.log(this.heroToEdit);
  // }

  public displayedColumns = [
    'id',
    'name',
    'firstName',
    'lastName',
    'place',
    'edit',
  ];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private superHeroService: SuperHeroService) {
    // this.myForm = new FormGroup({
    //   mySelect: new FormControl(''),
    // });
  }

  public dataSource = new MatTableDataSource<SuperHero>();

  ngOnInit(): void {
    // this.getLimitedRows();
    this.getFilter();
  }

  getFilter(): void {
    this.superHeroService
      .getHeroes(
        this.id,
        this.name,
        this.firstName,
        this.lastName,
        this.place,
        this.limit
      )
      .subscribe((data) => (this.dataSource.data = data));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  updateHeroList(heroes: SuperHero[]) {
    this.heroes = heroes;
  }

  initNewHero() {
    this.heroToEdit = new SuperHero();
  }

  editHero(hero: SuperHero) {
    this.heroToEdit = hero;
    console.log(this.heroToEdit);
  }
}
