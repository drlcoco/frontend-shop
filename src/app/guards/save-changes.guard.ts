import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoAddComponent } from '../producto-add/producto-add.component';

export interface ComponentDeactivate {
  canDeactivate: () => boolean | UrlTree | Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree>;
}

@Injectable({
  providedIn: 'root'
})

export class SaveChangesGuardGuard implements CanDeactivate<ProductoAddComponent> {
  canDeactivate(
    component: ProductoAddComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean |
  UrlTree>  {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
