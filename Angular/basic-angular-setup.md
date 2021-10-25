_Pasted sections of previous notes, needs refinement_
# Global installation of angular
 ```shell
npm install -g @angular/cli
ng --version
```

# Create angular project

```shell
ng new project-name-here
code .
ng serve --open
```
# Add Router
```shell
ng generate module app-routing --flat --module=app
```

# components are like controller/view bundles
```shell
ng generate component components/Todos
ng g c components/TodoItem
```

# services
```shell
ng generate service services/Todo
ng g s services/Todo
```

# Adding a component
```shell
ng generate component components/Firstpage
```