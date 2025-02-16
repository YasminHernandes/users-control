import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input({ required: true }) iconType: string = '';
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) message: string = '';
  @Input({ required: true }) opacity: string = '';

  iconSrc: string = '';
  dynamicColor: string = '';

  handleToggleIcon() {
    switch (this.iconType) {
      case 'success':
        this.iconSrc = 'assets/icons/svg/success.svg'
        this.dynamicColor = 'text-chateau-green-500'
        break;
      case 'error':
        this.iconSrc = 'assets/icons/svg/error.svg'
        this.dynamicColor = 'text-roman-500'
    }

    return this.iconSrc;
  }
}
