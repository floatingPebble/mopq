import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private dataService: DataService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.dataService.activeUser.isAdmin;
	}
}