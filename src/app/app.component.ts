import { Component } from '@angular/core';
import { Tech } from './tech.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    technologies = [
        new Tech('Angular', 'devicon-angularjs-plain', '#FF5252'),
        new Tech('Bootstrap', 'devicon-bootstrap-plain', '#5B4282'),
        new Tech('CSS3', 'devicon-css3-plain', '#1572B6'),
        new Tech('Heroku', 'devicon-heroku-plain colored', '#6762A6'),
        new Tech('HTML5', 'devicon-html5-plain colored', '#E44D26'),
        new Tech('JavaScript', 'devicon-javascript-plain colored', '#F0DB4F'),
        new Tech('jQuery', 'devicon-jquery-plain colored', '#0868AC'),
        new Tech('Laravel', 'devicon-laravel-plain colored', '#FD4F31'),
        new Tech('MongoDB', 'devicon-mongodb-plain colored', 'green'),
        new Tech('MySQL', 'devicon-mysql-plain colored', '#00618A'),
        new Tech('NodeJS', 'devicon-nodejs-plain colored', '#83CD29'),
        new Tech('PHP', 'devicon-php-plain colored', '#6181B6'),
        new Tech('Python', 'devicon-python-plain colored', '#FFD845'),
        new Tech('VueJS', 'devicon-vuejs-plain colored', '#35495e')
    ];
}
