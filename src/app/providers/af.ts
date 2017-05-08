// src/app/providers/af.ts
import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AF {
    public messages: FirebaseListObservable<any>;
    public pools: FirebaseListObservable<any>;
    public games: FirebaseListObservable<any>;
    public users: FirebaseListObservable<any>;
    public teams: FirebaseListObservable<any>;
    public displayName: string;
    public email: string;
    public uid: string;

    constructor(public af: AngularFire) {
        this.messages = this.af.database.list('messages');
        this.pools = this.af.database.list('pools');
        this.games = this.af.database.list('games');
    }
    
    /**
     * Logs in the user
     * @returns {firebase.Promise<FirebaseAuthState>}
     */
    loginWithGoogle() {
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        });
    }

    /**
     * Calls the AngularFire2 service to register a new user
     * @param model
     * @returns {firebase.Promise<void>}
     */
    registerUser(email, password) {
        console.log(email)
        return this.af.auth.createUser({
            email: email,
            password: password
        });
    }
  
    /**
     * Saves information to display to screen when user is logged in
     * @param uid
     * @param model
     * @returns {firebase.Promise<void>}
     */
    saveUserInfo(uid, name, email) {
        return this.af.database.object('users/' + uid).set({
            name: name,
            email: email,
        });
    }
    
    /**
     * Logs the user in using their Email/Password combo
     * @param email
     * @param password
     * @returns {firebase.Promise<FirebaseAuthState>}
     */
    loginWithEmail(email, password) {
        return this.af.auth.login({
            email: email,
            password: password,
        },
        {
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        });
    }
    
    /**
     * Logs out the current user
     */
    logout() {
        return this.af.auth.logout();
    }

    /**
     * Gets user with uid
     */
    getUserWithUid(uid: string) {
        return this.af.database.object('users/' + uid).first().toPromise();
    }

    addUser(uid: string, email: string) {
        return this.af.database.list('users').push({ 
            uid: uid,
            email: email
        });
    }

    /**
     * Gets teams
     */
    getTeams() {
        return this.af.database.list('teams').first().toPromise();
    }

    createPool(pool) {
        return this.pools.push(pool);
    }

    getPoolsWithYear(year) {
        if (typeof year !== 'number') {
            year = Number(year);
        }
        return this.af.database.list('pools',  {
            query: {
                orderByChild: 'year',
                equalTo: year
            }
        })
        .first()
        .toPromise();
    }

    updatePoolStatus(key, status) {
        let pool = this.af.database.object(`/pools/${key}`);
        return pool.update({
            status: status
        });
    }

    addGame(game) {
        return this.games.push(game);
    }

    removeGame(game) {
        return this.games.remove(game.$key);
    }

    getGamesWithYear(year) {
        if (typeof year !== 'number') {
            year = Number(year);
        }
        return this.af.database.list('games', {
            query: {
                orderByChild: 'year',
                equalTo: year
            }
        })
    }

    getGamesWithYearAndDay(year, day) {
        return this.af.database.list('games', {
            query: {
                orderByChild: 'yearDay',
                equalTo: `${year}-${day}`
            }
        })
    }

    /**
     * Saves a message to the Firebase Realtime Database
     * @param text
     */
    sendMessage(text) {
        var message = {
            message: text,
            displayName: this.displayName,
            email: this.email,
            timestamp: Date.now()
        };
        this.messages.push(message);
    }

    addUserToPool(pool) {
        let currentPool = this.af.database.object('/pools/' + pool.$key);
        let user = {
            uid: this.uid,
            displayName: this.displayName
        };
        let participants = [];
        if(pool.participants) {
            participants = pool.participants;
        }
        participants.push(user);
        pool.participants = participants;
        return currentPool.update(pool);
    }
}