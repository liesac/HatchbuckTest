import {TestBed} from '@angular/core/testing';

import {AppModule} from './app.module'
import {AppComponent} from './app.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [AppModule, AppComponent]});
    });

    it('should work', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
});