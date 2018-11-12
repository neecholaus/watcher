import { Component } from '@angular/core';
import { Tech } from '../tech.model';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    technologies = [
        new Tech('Angular 2+', 'devicon-angularjs-plain', '#FF5252'),
        new Tech('Bootstrap', 'devicon-bootstrap-plain', '#5B4282'),
        new Tech('CSS3', 'devicon-css3-plain', '#1572B6'),
        new Tech('Git', 'devicon-git-plain', '#F34F29'),
        new Tech('HTML5', 'devicon-html5-plain colored', '#E44D26'),
        new Tech('JavaScript', 'devicon-javascript-plain colored', '#F0DB4F'),
        new Tech('jQuery', 'devicon-jquery-plain colored', '#0868AC'),
        new Tech('Laravel', 'devicon-laravel-plain colored', '#FD4F31'),
        new Tech('MongoDB', 'devicon-mongodb-plain colored', 'green'),
        new Tech('MySQL', 'devicon-mysql-plain colored', '#00618A'),
        new Tech('NodeJS', 'devicon-nodejs-plain colored', '#83CD29'),
        new Tech('PHP', 'devicon-php-plain colored', '#6181B6'),
        new Tech('Python', 'devicon-python-plain colored', '#FFD845'),
        new Tech('Sass', 'devicon-sass-original colored', '#CB6699'),
        new Tech('VueJS', 'devicon-vuejs-plain colored', 'green')
    ];

    tools = [
        new Tech('Atom', 'devicon-atom-original colored', '#67595D'),
        new Tech('BitBucket', 'devicon-bitbucket-plain colored', '#205081'),
        new Tech('GitHub', 'devicon-github-plain colored', 'black'),
        new Tech('Heroku', 'devicon-heroku-plain colored', '#6762A6'),
        new Tech('JetBrains', 'devicon-jetbrains-plain colored', '#00619E'),
        new Tech('Slack', 'devicon-slack-plain colored', '#565656'),
        new Tech('Vim', 'devicon-vim-plain colored', '#179A33'),
        new Tech('Visual Studio IDE', 'devicon-visualstudio-plain', 'purple'),
        new Tech('Webpack', 'devicon-webpack-plain colored', '#0084c1')
    ];
}
