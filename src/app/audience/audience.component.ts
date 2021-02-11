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
            console.log('all audiences for user with role:', this.currentUser.role, 'are', this.audiences);
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
}