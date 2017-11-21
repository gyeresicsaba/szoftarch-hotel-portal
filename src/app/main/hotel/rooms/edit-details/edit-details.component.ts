import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../../models/room';
import {CustomAuthHttpService} from '../../../../services/custom-auth-http.service';
import {ToastService} from '../../../../services/toast.service';
import {Toast} from '../../../../models/toast';
import {BootstrapTypes} from '../../../../models/bootstrap-types';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
  @Input() roomInput: Room;
  room: Room;
  isNew = true;

  constructor(private authHttp: CustomAuthHttpService, private toastService: ToastService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.roomInput) {
      this.room = this.roomInput;
      this.isNew = false;
    } else {
      this.room = new Room({});
    }
  }

  onSubmit() {
    if (this.isNew) {
      this.room.hotelId = this.route.snapshot.parent.params.id;
      this.authHttp.post('room', this.room).subscribe(() => {
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
        this.router.navigateByUrl('/hotel/' + this.route.snapshot.parent.params.id);
      });
    } else {
      this.authHttp.put('room/' + this.room.id, this.room).subscribe(() => {
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
        // this.router.navigateByUrl('/hotel/list');
      });
    }
  }

}
