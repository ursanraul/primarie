import { User } from '@/_models';
import { Audience } from '@/_models/audience';
import { AuthenticationService } from '@/_services';
import { AudienceService } from '@/_services/audienc.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({templateUrl: 'audience.component.html'})
export class AudienceComponent implements OnInit {
    currentUser: User;
    audiences: Array<Audience>;
    audience: Audience;

    constructor(private authenticationService: AuthenticationService,
        private audienceService: AudienceService) {
            this.currentUser = this.authenticationService.currentUserValue;
        }

    ngOnInit(): void {
        this.audiences = new Array<Audience>();
        this.loadAllAudiences();
    }

    loadAllAudiences() {
        this.audienceService.getAll()
        .pipe(first())
        .subscribe(audiences => this.audiences = audiences);
    }

    showDialog(){
        let modal_t  = document.getElementById('modal_1')
        modal_t.classList.remove('hhidden')
        modal_t.classList.add('sshow');
    }

    closeDialog() {
        let modal_t  = document.getElementById('modal_1')
        modal_t.classList.remove('sshow')
        modal_t.classList.add('hhidden');
    }
}