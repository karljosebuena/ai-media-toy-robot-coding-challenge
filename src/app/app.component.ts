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

    this.setPositionFormSubscription = this.setPositionForm
      .valueChanges
      .subscribe(
        () => {
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


  /**
   * Dynamically generate our grids/table cell
   * to be rendered in the UI on init
   * @private
   * @memberof AppComponent
   */
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


  /**
   * Responsible for marking robot's new position.
   * This is called every time we set new starting position
   * or every time to issue the 'Move', 'Left', or 'Right' command
   * @private
   * @memberof AppComponent
   */
  private moveRobotToNewPosition() {
    const {
      positionX,
      positionY,
      startingDirection,
    } = this.setPositionForm.value;

    if (positionX < 1 || positionX > 5 || positionY < 1 || positionY > 5) {
      return this.openSnackBar('Coordinates out of bounds!', 'Error');
    }

    // remove robot's previous position
    this.clearRobotPreviousPosition();

    // let's mark new postion in tabletop
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

  private openSnackBar(message: string, type: string) {
    this._snackBar.open(message, type, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  move() {
    if (this.setPositionForm.valid) {
      const {
        positionX,
        positionY,
        startingDirection,
      } = this.setPositionForm.value;

      const errorMessage = 'Robot will fall off the grid!';
      switch (startingDirection) {
        case 'North':
          if (positionY - 1 < 1) {
            return this.openSnackBar(errorMessage, 'Error');
          }
          this.setPositionForm.controls.positionY.setValue(positionY - 1);
          break;
        case 'West':
          if (positionX - 1 < 1) {
            return this.openSnackBar(errorMessage, 'Error');
          }
          this.setPositionForm.controls.positionX.setValue(positionX - 1);
          break;
        case 'East':
          if (positionX + 1 > 5) {
            return this.openSnackBar(errorMessage, 'Error');
          }
          this.setPositionForm.controls.positionX.setValue(positionX + 1);
          break;
        case 'South':
          if (positionY + 1 > 5) {
            return this.openSnackBar(errorMessage, 'Error');
          }
          this.setPositionForm.controls.positionY.setValue(positionY + 1);
          break;
        default:
          console.log({ startingDirection });
          break;
      }
    }
  }

  left() {
    if (this.setPositionForm.valid) {
      const {
        startingDirection,
      } = this.setPositionForm.value;

      switch (startingDirection) {
        case 'North':
          this.setPositionForm.controls.startingDirection.setValue('West');
          break;
        case 'West':
          this.setPositionForm.controls.startingDirection.setValue('South');
          break;
        case 'South':
          this.setPositionForm.controls.startingDirection.setValue('East');
          break;
        case 'East':
          this.setPositionForm.controls.startingDirection.setValue('North');
          break;
        default:
          console.log({ startingDirection });
          break;
      }
    }
  }

  right() {
    const {
      startingDirection,
    } = this.setPositionForm.value;

    if (this.setPositionForm.valid) {
      switch (startingDirection) {
        case 'North':
          this.setPositionForm.controls.startingDirection.setValue('East');
          break;
        case 'East':
          this.setPositionForm.controls.startingDirection.setValue('South');
          break;
        case 'South':
          this.setPositionForm.controls.startingDirection.setValue('West');
          break;
        case 'West':
          this.setPositionForm.controls.startingDirection.setValue('North');
          break;
        default:
          console.log({ startingDirection });
          break;
      }
    }
  }

  report() {
    if (this.setPositionForm.valid) {
      const {
        positionX,
        positionY,
        startingDirection,
      } = this.setPositionForm.value;

      this.openSnackBar(`Robot is located at ${positionX}x ${positionY}y of ${startingDirection}.`, 'Success')
    }
  }
}
