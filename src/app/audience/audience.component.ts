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
    audienceMode = false;

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
        .subscribe(audiences => {
            this.audiences = audiences;
            console.log(audiences);
        });
    }

    addAudience() {
        this.audienceMode = true;
    }

    closeAudienceMode(){
        this.audienceMode = false;
    }

    saveAudience(value){
        let audience = {
            user: this.currentUser,
            description: value
        } as Audience;
        
        this.audienceService.post(audience)
        .pipe(first())
        .subscribe(response => {
            this.closeAudienceMode();
            this.loadAllAudiences();
        });
    }
}