# AiMediaToyRobotCodingChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Toy Robot Coding Challenge

This challenge is designed as a baseline entry point to have a chat with us about a potential career at Ai-Media. It's a small technical requirement that allows us to evaluate key points of interest like, "can they code?" and "can they follow instructions?". From this test, we can prepare some questions for a follow-up interview (see suggestions below or make up your own) to get a better feel for the candidate.

## Instructions

* You are required to simulate a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
* There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction.
* Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.
* All commands should be discarded until a valid place command has been executed.
* The solution can be written in Javascript, Typescript, C#, C++ or Python. Ideally, it will be written in your strongest language.
* The UI can be provided via CLI, however you are free to expand on this.
* Keep it simple, keep it DRY, but don’t over complicate or over engineer, comment and test as much as possible.
* Include a README file with instructions on how to build/compile your solution and how to run it.
* Share your code via a public GitHub repository, git bundle or zip file.
* We like to see how you work, not just the end result.

## Commands

All commands should provide output indicating whether or not they succeeded.

* PLACE X,Y,DIRECTION
  X and Y are integers that indicate a location on the tabletop.
* DIRECTION
  is a string indicating which direction the robot should face. It it one of the four cardinal directions: NORTH, EAST, SOUTH or WEST.
* MOVE
  Instructs the robot to move 1 square in the direction it is facing.
* LEFT
  Instructs the robot to rotate 90° anticlockwise/counterclockwise.
* RIGHT
  Instructs the robot to rotate 90° clockwise.
* REPORT
  Outputs the robot's current location on the tabletop and the direction it is facing.

## How To Run
### Locally
* clone the project (you should already have latest npm and Angular installed in your local)
* cd in to ai-media-toy-robot-coding-challenge folder
* run `npm install` cmd from your terminal
* run `ng s --o` cmd from your terminal and it should open the browser once app is ready
