import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUserData, loadUserDataSuccess, loadingSpinner } from "./users-store";

import { map, mergeMap } from "rxjs";

import { CommonService } from "@app/_shared/services/common.service";

@Injectable()
export class UsersEffects {

    constructor(private actions$: Actions, private commonService: CommonService, private store: Store<{ usersReducer: any }>) { }

    getUserData$ = createEffect((): any => {
        return this.actions$.pipe(ofType(loadUserData),
            mergeMap((action: any) => {
                this.store.dispatch(loadingSpinner({ isLoading: true }));
                return this.commonService.getUserData()?.pipe(map((data: any) => {
                    this.store.dispatch(loadingSpinner({ isLoading: false }));
                    return loadUserDataSuccess(data.users);
                }))
            }))
    })
}