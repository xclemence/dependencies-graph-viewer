import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { HeaderUserComponent } from './header-user.component';
import { MatIconModule } from '@angular/material/icon';

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(async () => {
    keycloakServiceSpy = jasmine.createSpyObj<KeycloakService>('keycloak', ['isLoggedIn', 'getUsername', 'login', 'logout']);
    await TestBed.configureTestingModule({
      declarations: [ HeaderUserComponent ],
      providers: [
        { provide: KeycloakService, useValue: keycloakServiceSpy }
      ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrive username', async () => {
    keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
    keycloakServiceSpy.getUsername.and.returnValue('name');
    await component.ngOnInit();

    expect(component.userName).toBe('name');
    expect(component.userConnected).toBe(true);
  });

  it('should call keycloak login', async () => {
    await component.logon();
    expect(keycloakServiceSpy.login).toHaveBeenCalled();
  });

  it('should call keycloak logout', async () => {
    await component.logout();
    expect(keycloakServiceSpy.logout).toHaveBeenCalled();
  });


});
