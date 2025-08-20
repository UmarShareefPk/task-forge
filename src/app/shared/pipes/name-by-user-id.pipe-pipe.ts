import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

@Pipe({
  name: 'nameByUserId'
})
export class NameByUserIdPipe implements PipeTransform {

  constructor(private authService: AuthService) {}

  transform(value: string): string {
    const allUsers = this.authService.getCache("teamUsers");
   
    if (!value || !Array.isArray(allUsers)) {
      return "1- Name not found";
    }

    const user = allUsers.find(u => u.id === value);
    if (!user) {
      return "2- Name not found";
    } 

    return `${user.firstName} ${user.lastName}`;
  }

}
