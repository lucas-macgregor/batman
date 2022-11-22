import { Component } from '@angular/core';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faFacebook, faTwitter, faGithub, faLinkedin, faGoogle} from '@fortawesome/free-brands-svg-icons'
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title="ProyectoInicial";
  faFaceSmile= faFaceSmile;
  faListAlt = faListAlt;
  faInstagram= faInstagram;
  faFacebook = faFacebook ;
  faTwitter  = faTwitter  ;
  faGithub   = faGithub   ;
  faLinkedin = faLinkedin ;
  faGoogle   = faGoogle   ;
  isNavbarCollapsed:boolean=true;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {  
    this.auth.setInitialStatus();
  }
}
