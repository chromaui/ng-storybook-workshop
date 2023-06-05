# Testing the front of the front-end Workshop (ngConf 2023)

Based on the [Angular Basics v14: Starter Project](https://github.com/ultimatecourses/angular-basics-src)

---

### To get started for the workshop

1. `npx degit chromaui/ng-storybook-workshop#start`
2. `cd ng-storybook-workshop`
3. `yarn`

---

### Start Storybook

Run `yarn storybook` to start Storybook locally and output the address. Depending on your system configuration, it will automatically open the address in a new browser tab.

### Run Storybook tests

While Storybook is running, open a new terminal window and run the test-runner with: `yarn test-storybook`.

Storybook test runner turns all of your stories into executable tests. It is powered by Jest and Playwright.

- For those [without a play function](https://storybook.js.org/docs/react/writing-stories/introduction): it verifies whether the story renders without any errors.
- For those [with a play function](https://storybook.js.org/docs/react/writing-stories/play-function): it also checks for errors in the play function and that all assertions passed.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
