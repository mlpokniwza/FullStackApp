import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'app/_models/member';
import { Message } from 'app/_models/message';
import { User } from 'app/_models/user';
import { AuthService } from 'app/_services/auth.service';
import { MembersService } from 'app/_services/members.service';
import { MessageService } from 'app/_services/message.service';
import { PresenceService } from 'app/_services/presence.service';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs') memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  // galleryOptions: NgxGalleryOptions[] = [];
  // galleryImages: NgxGalleryImage[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];
  user?: User;



  constructor(private membersService: MembersService, public presenceService: PresenceService,
    private route: ActivatedRoute, private messageService: MessageService, private authService: AuthService) {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: user => { if (user) { this.user = user; } }
    })
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  ngOnInit(): void {
    this.loadMember();
    // this.route.data.subscribe({
    //   next: data => this.member = data['member']
    // })

    // this.route.queryParams.subscribe({
    //   next: params => {
    //     params['tab'] && this.selectTab(params['tab'])
    //   }
    // })
    // this.galleryOptions = [
    //   {
    //     width: '500px',
    //     height: '500px',
    //     imagePercent: 100,
    //     thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide,
    //     preview: false
    //   }
    // ]
  }

  getImages() {
    if (!this.member) return [];
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      })
    }
    return imageUrls;
  }
  
  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.membersService.getMember(username).subscribe({
      next: member => {
        this.member = member
        // this.galleryImages = this.getImages();
      }
    })
  }

  loadMessages() {
    if (this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => {
          this.messages = messages;
        }
      })
    }
  }

  selectTab(heading: string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading === heading) !.active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.user) {
      this.messageService.createHubConnection(this.user, this.member.userName);
    }
    else {
      this.messageService.stopHubConnection();
    }
  }

}
