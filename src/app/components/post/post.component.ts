import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { UsersComponent } from '../users/users.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public post: any[] = [];

  public backButton = false;

  private postbackup: any[] = [];
  constructor(public postServices: PostService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.postServices.getPost().subscribe((result: any) => {
      if (result?.data) {
        this.postbackup = result.data;
        this.post = result.data;
        // console.log(result);
        for (const post of result.data) {
          this.postServices.getComment(post.id).subscribe((result2: any) => {
            post.comment = result2;

            console.log(result2);
          })
        }
      }
    })
  }

  filterByHashtag(hashtg: string) {

    this.post = this.postbackup.filter(post => {
      const hashtagsStr: string = post.tags.join(" ");
      
      if (hashtagsStr.indexOf(hashtg) !== -1) {
        return true
      }

      return false;
    });

    this.backButton = true;
  }

  showAllPosts() {
    this.post = this.postbackup.slice(0);;
    this.backButton = false;
  }

  openDialogUser(userId: string) {
    this.postServices.getUser(userId).subscribe((result: any) => {
      const dialogRef = this.dialog.open(UsersComponent, {
        data: result
      }
      );
    })
  }

  openDialogComment(postId: string) {
    const post = this.post.filter(post => postId === post.id);
          console.log(postId)
    const dialogRef = this.dialog.open(CommentsComponent, {
      data: {
        comment: post[0].comment
      }
    });
  }
  // "60d21aeb67d0d8992e610b79"
}
