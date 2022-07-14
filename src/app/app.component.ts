import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  setPositionForm!: FormGroup;
  setPositionFormSubscription!: Subscription;

  tableHeight = 5;
  tableWidth = 5;
  tableItems: any[] = [];

  directions: string[] = ['North', 'West', 'East', 'South'];

  positionX = 1;
  positionY = 1;
  currentDirection = '';

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.initFormBuilder();
    this.initTableItems();
    console.log(this.tableItems);

    this.setPositionFormSubscription = this.setPositionForm
      .valueChanges
      .subscribe(
        position => {
          if (this.setPositionForm.valid) {
            this.moveRobotToNewPosition();
          }

        },
        err => {
          console.log({ err });
        }
      )
  }

  ngOnDestroy(): void {
    this.setPositionFormSubscription.unsubscribe();
  }

  private initFormBuilder() {
    this.setPositionForm = this.formBuilder.group({
      positionX: ['', Validators.required],
      positionY: ['', Validators.required],
      startingDirection: ['', Validators.required]
    });
  }

  private initTableItems() {
    for (let y = 1; y <= this.tableHeight; y++) {
      let tableItemId = '';
      for (let x = 1; x <= this.tableWidth; x++) {
        tableItemId = `table-x${x}`;
        tableItemId = tableItemId.concat(`-y${y}`);
        this.tableItems.push({
          x,
          y,
          id: tableItemId
        });
      }
    }
  }

  private moveRobotToNewPosition() {
    const {
      positionX,
      positionY,
      startingDirection,
    } = this.setPositionForm.value;

    if (positionX < 1 || positionX > 5 || positionY < 1 || positionY > 5) {
      return this.openSnackBar();
    }

    // remove robot's previous position
    this.clearRobotPreviousPosition();

    console.log(`Robot moved to starting position ${positionX}x ${positionY}y of ${startingDirection}.`, this.setPositionForm.valid);

    // let's mark starting postion in tabletop
    let robotDirection = '';
    switch (startingDirection) {
      case 'North':
        robotDirection = 'robot-face-north';
        break;
      case 'West':
        robotDirection = 'robot-face-west';
        break;
      case 'East':
        robotDirection = 'robot-face-east';
        break;
      case 'South':
        robotDirection = 'robot-face-south';
        break;
      default:
        console.log({ startingDirection });
        break;
    }
    if (robotDirection) {
      document.getElementById(`table-x${positionX}-y${positionY}`)
        ?.classList.add(robotDirection);
    }

  }

  private clearRobotPreviousPosition() {
    document.querySelectorAll(
      '.robot-face-north, .robot-face-south, .robot-face-east, .robot-face-west'
    )
      ?.forEach((grid: any) => {
        grid.classList.remove('robot-face-north')
        grid.classList.remove('robot-face-south')
        grid.classList.remove('robot-face-east')
        grid.classList.remove('robot-face-west')
      });
  }

  private openSnackBar() {
    this._snackBar.open('Coordinates out of bounds!', 'Error', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  move() {
    const {
      positionX,
      positionY,
      startingDirection,
    } = this.setPositionForm.value;

    switch (startingDirection) {
      case 'North':
        if (positionY - 1 < 1) {
          return this.openSnackBar();
        }
        this.setPositionForm.controls.positionY.setValue(positionY - 1);
        break;
      case 'West':
        if (positionX - 1 < 1) {
          return this.openSnackBar();
        }
        this.setPositionForm.controls.positionX.setValue(positionX - 1);
        break;
      case 'East':
        if (positionX + 1 > 5) {
          return this.openSnackBar();
        }
        this.setPositionForm.controls.positionX.setValue(positionX + 1);
        break;
      case 'South':
        if (positionY + 1 > 5) {
          return this.openSnackBar();
        }
        this.setPositionForm.controls.positionY.setValue(positionY + 1);
        break;
      default:
        console.log({ startingDirection });
        break;
    }


    console.log(this.setPositionForm.value);
  }

  // left() {

  // }

  // right() {

  // }

  // report() {

  // }
}
