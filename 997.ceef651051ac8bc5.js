"use strict";(self.webpackChunkangularConnections=self.webpackChunkangularConnections||[]).push([[997],{7997:(W,Z,r)=>{r.r(Z),r.d(Z,{ConnectionsModule:()=>V});var p=r(6814),w=r(1247),h=r(5509),t=r(9468),v=r(1922),g=r(3905),d=r(2169),D=r(6113),f=r(6322),m=r(2123),C=r(7394),S=r(2764),_=r(485),k=r(2571),b=r(5412),y=r(4396),a=r(95);function A(s,c){1&s&&(t.TgZ(0,"div"),t._uU(1,"Please enter a name"),t.qZA())}function M(s,c){1&s&&(t.TgZ(0,"div"),t._uU(1,"Name is too long"),t.qZA())}function O(s,c){1&s&&(t.TgZ(0,"div"),t._uU(1," Name can contain only letters, digits or spaces "),t.qZA())}function P(s,c){if(1&s&&(t.TgZ(0,"div",7),t.YNc(1,A,2,0,"div",8),t.YNc(2,M,2,0,"div",8),t.YNc(3,O,2,0,"div",8),t.qZA()),2&s){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",null==e.name||null==e.name.errors?null:e.name.errors.required),t.xp6(1),t.Q6J("ngIf",null==e.name||null==e.name.errors?null:e.name.errors.maxlength),t.xp6(1),t.Q6J("ngIf",null==e.name||null==e.name.errors?null:e.name.errors.pattern)}}let I=(()=>{class s{constructor(e,n,i,o){this.formBuilder=e,this.loginService=n,this.toastService=i,this.store=o,this.visible=!1,this.closeEmitter=new t.vpe,this.saveEmitter=new t.vpe,this.submitDisabled=!1,this.createGroupForm=this.formBuilder.group({name:new a.NI("",[a.kI.required,a.kI.maxLength(30),a.kI.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")])})}get name(){return this.createGroupForm.get("name")}closeHandler(){this.closeEmitter.emit()}inputChangeHandler(){this.submitDisabled=this.createGroupForm.invalid}submitHandler(){if(this.createGroupForm.invalid)this.createGroupForm.markAllAsTouched();else{const e={name:this.createGroupForm.controls.name.value},n=this.loginService.getUser();this.submitDisabled=!0;const i=+new Date;fetch("https://tasks.app.rs.school/angular/groups/create",{headers:{"rs-uid":n.uid||"","rs-email":n.email||"",Authorization:"Bearer "+n.token,Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(e)}).then(o=>{o.ok?o.clone().json().then(l=>{const u={id:{S:l.groupID},name:{S:e.name||""},createdAt:{S:i.toString()},createdBy:{S:n.uid||""}};this.toastService.showMessage("success","Group is successfuly created!"),this.submitDisabled=!1,this.store.dispatch(f.nT({item:u})),this.closeEmitter.emit(),this.saveEmitter.emit()}):o.json().catch(()=>{throw new Error("Could not parse the JSON")}).then(({message:l})=>{this.toastService.showMessage("error",l)})})}}static#t=this.\u0275fac=function(n){return new(n||s)(t.Y36(a.j3),t.Y36(S.r),t.Y36(_.k),t.Y36(d.yh))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-dialog"]],inputs:{visible:"visible"},outputs:{closeEmitter:"closeEmitter",saveEmitter:"saveEmitter"},decls:12,vars:9,consts:[[1,"modal-content"],[1,"close",3,"click"],[1,"column",3,"formGroup","ngSubmit"],["for","login",1,"small-text"],["type","text","formControlName","name","maxlength","","pattern","","required",""],["class","invalid",4,"ngIf"],[1,"margin-top",3,"disabled","click"],[1,"invalid"],[4,"ngIf"]],template:function(n,i){1&n&&(t.TgZ(0,"div")(1,"div",0)(2,"div",1),t.NdJ("click",function(){return i.closeHandler()}),t._uU(3,"\xd7"),t.qZA(),t.TgZ(4,"form",2),t.NdJ("ngSubmit",function(){return i.submitHandler()}),t.TgZ(5,"label",3),t._uU(6,"name "),t.qZA(),t._UZ(7,"input",4),t.YNc(8,P,4,3,"div",5),t.TgZ(9,"app-button",6),t.NdJ("click",function(){return i.submitHandler()}),t._uU(10,"Submit"),t.qZA()()(),t._UZ(11,"app-toast"),t.qZA()),2&n&&(t.Gre("modal ",i.visible?"visible":"hidden",""),t.xp6(4),t.Q6J("formGroup",i.createGroupForm),t.xp6(3),t.Gre("input ",null!=i.name&&i.name.invalid&&(null!=i.name&&i.name.dirty||null!=i.name&&i.name.touched)?"red-border":"border-none",""),t.xp6(1),t.Q6J("ngIf",(null==i.name?null:i.name.invalid)&&((null==i.name?null:i.name.dirty)||(null==i.name?null:i.name.touched))),t.xp6(1),t.Q6J("disabled",i.submitDisabled))},dependencies:[p.O5,g.r,b.q,a._Y,a.Fj,a.JJ,a.JL,a.Q7,a.nD,a.c5,a.sg,a.u],styles:[".modal-content[_ngcontent-%COMP%]{background-color:#fefefe;margin:auto;padding:20px;border:1px solid #888;width:25%}.close[_ngcontent-%COMP%]{color:#aaa;float:right;font-size:28px;font-weight:700}.close[_ngcontent-%COMP%]:hover, .close[_ngcontent-%COMP%]:focus{color:#000;text-decoration:none;cursor:pointer}.red-border[_ngcontent-%COMP%]{border:1px solid red}.border-none[_ngcontent-%COMP%]{border:none}.column[_ngcontent-%COMP%]{display:flex;flex-direction:column}.margin-top[_ngcontent-%COMP%]{margin-top:20px}.input[_ngcontent-%COMP%]{width:330px;height:30px;background-color:#bbb6b6}"]})}return s})();function L(s,c){if(1&s&&(t.TgZ(0,"div"),t._uU(1),t.ALo(2,"async"),t.qZA()),2&s){const e=t.oxw();t.xp6(1),t.hij("You can update group list in: ",t.lcZ(2,1,e.countdown$)," seconds")}}function J(s,c){if(1&s){const e=t.EpF();t.TgZ(0,"div",10),t.NdJ("click",function(i){t.CHM(e);const o=t.oxw().$implicit,l=t.oxw();return t.KtG(l.deleteHandler(i,o.id.S))}),t._uU(1," \xd7 "),t.qZA()}}function Y(s,c){if(1&s){const e=t.EpF();t.TgZ(0,"div",8),t.NdJ("click",function(i){const l=t.CHM(e).$implicit,u=t.oxw();return t.KtG(u.itemClickHandler(i,l))}),t.YNc(1,J,2,0,"div",9),t.TgZ(2,"div"),t._uU(3),t.qZA()()}if(2&s){const e=c.$implicit,n=t.oxw();t.xp6(1),t.Q6J("ngIf",e.createdBy.S===n.params.uid),t.xp6(2),t.Oqu(e.name.S)}}let q=(()=>{class s{get updateDisabled(){return this.countdownService.isRunning}get isLight(){return!this.themeService.isDark}constructor(e,n,i,o,l,u,T){this.loginService=e,this.countdownService=n,this.toastService=i,this.themeService=o,this.httpService=l,this.router=u,this.store=T,this.items=[],this.showDialog=!1,this.isRequesting=!1,this.showConfirmation=!1,this.itemToDelete="",this.params={uid:"",email:"",token:""},this.groupSubscription=new C.w0,this.countdown$=this.countdownService.countdown$,this.isDarkTheme$=this.themeService.isDarkTheme$}updateHandler(){this.requestGroups()}createHandler(){this.showDialog=!0}handleCloseDialog(){this.showDialog=!1}updateGroupsFromStore(){return this.store.pipe((0,d.Ys)(e=>(0,D.jA)(e))).subscribe(e=>{this.items=e})}handleSaveGroup(){this.updateGroupsFromStore()}handleCloseConfirmation(){this.showConfirmation=!1}deleteHandler(e,n){this.showConfirmation=!0,this.itemToDelete=n}handleDeleteConfirmation(){this.loginService.getUser(),this.httpService.simpleRequest(`https://tasks.app.rs.school/angular/groups/delete?groupID=${this.itemToDelete}`,{headers:this.httpService.getHeaders(this.params),method:"DELETE"}).then(()=>{this.toastService.showMessage("success","Group is successfuly deleted!"),this.store.dispatch(f.cM({id:this.itemToDelete})),this.updateGroupsFromStore(),this.showConfirmation=!1}).catch(n=>{this.toastService.showMessage("error",n)})}requestGroups(){this.isRequesting=!0,this.httpService.jsonRequest("https://tasks.app.rs.school/angular/groups/list",{headers:this.httpService.getHeaders(this.params),method:"GET"}).then(e=>{this.toastService.showMessage("success","Successfuly got group list!"),this.items=e.Items,this.store.dispatch(f.lp({items:this.items})),this.isRequesting=!1,this.countdownService.startCountdown()}).catch(e=>{this.toastService.showMessage("error",e)})}itemClickHandler(e,n){"delete"===e.target.className?(e.preventDefault(),e.stopPropagation()):this.router.navigate([`/group/${n.id.S}`])}ngOnInit(){this.params=this.loginService.getUser(),this.groupSubscription=this.store.pipe((0,d.Ys)(e=>(0,D.jA)(e))).subscribe(e=>{e.length?this.items=e:this.requestGroups()})}ngOnDestroy(){this.groupSubscription.unsubscribe()}static#t=this.\u0275fac=function(n){return new(n||s)(t.Y36(S.r),t.Y36(m.d),t.Y36(_.k),t.Y36(v.f),t.Y36(k.e),t.Y36(h.F0),t.Y36(d.yh))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-list"]],features:[t._Bn([m.d])],decls:13,vars:11,consts:[[1,"flex","baseline"],[1,"marginS",3,"disabled","click"],[3,"click"],[4,"ngIf"],[1,"list-block"],["class","list-item",3,"click",4,"ngFor","ngForOf"],[3,"visible","closeEmitter","saveEmitter"],["text","Delete group?",3,"visible","closeEmitter","deleteEmitter"],[1,"list-item",3,"click"],["class","delete",3,"click",4,"ngIf"],[1,"delete",3,"click"]],template:function(n,i){1&n&&(t.TgZ(0,"div")(1,"div",0)(2,"app-button",1),t.NdJ("click",function(){return i.updateHandler()}),t._uU(3,"Update groups"),t.qZA(),t.TgZ(4,"app-button",2),t.NdJ("click",function(){return i.createHandler()}),t._uU(5,"Create group"),t.qZA()(),t.YNc(6,L,3,3,"div",3),t.TgZ(7,"div",4),t.ALo(8,"async"),t.YNc(9,Y,4,2,"div",5),t.qZA(),t.TgZ(10,"app-dialog",6),t.NdJ("closeEmitter",function(){return i.handleCloseDialog()})("saveEmitter",function(){return i.handleSaveGroup()}),t.qZA(),t.TgZ(11,"app-confirmation",7),t.NdJ("closeEmitter",function(){return i.handleCloseConfirmation()})("deleteEmitter",function(){return i.handleDeleteConfirmation()}),t.qZA(),t._UZ(12,"app-toast"),t.qZA()),2&n&&(t.xp6(2),t.Q6J("disabled",i.updateDisabled||i.isRequesting),t.xp6(4),t.Q6J("ngIf",i.updateDisabled),t.xp6(1),t.ekj("light-theme-list",i.isLight)("dark-theme-list",t.lcZ(8,9,i.isDarkTheme$)),t.xp6(2),t.Q6J("ngForOf",i.items),t.xp6(1),t.Q6J("visible",i.showDialog),t.xp6(1),t.Q6J("visible",i.showConfirmation))},dependencies:[p.sg,p.O5,g.r,b.q,y.S,I,p.Ov],styles:[".list-block[_ngcontent-%COMP%]{width:250px;padding:12px;max-height:600px;overflow:scroll}.list-item[_ngcontent-%COMP%]{line-height:20px}.list-item[_ngcontent-%COMP%]:hover{cursor:pointer;text-decoration:underline;color:#323277}.marginS[_ngcontent-%COMP%]{margin-right:12px;margin-bottom:12px}.delete[_ngcontent-%COMP%]{color:#aaa;float:right;font-size:28px;font-weight:700}"]})}return s})();var E=r(7393),U=r(8767);const F=(0,d.P1)(s=>s,s=>s.peopleList),G=(0,d.P1)(s=>s,s=>s.conversationList);function H(s,c){if(1&s&&(t.TgZ(0,"div"),t._uU(1),t.ALo(2,"async"),t.qZA()),2&s){const e=t.oxw();t.xp6(1),t.hij("You can update people list in: ",t.lcZ(2,1,e.countdown$)," seconds")}}function $(s,c){if(1&s){const e=t.EpF();t.TgZ(0,"div",5),t.NdJ("click",function(){const o=t.CHM(e).$implicit,l=t.oxw();return t.KtG(l.itemClickHandler(o))}),t.TgZ(1,"div"),t._uU(2),t.qZA()()}if(2&s){const e=c.$implicit,n=t.oxw();t.xp6(1),t.Tol(n.companionIDs.includes(e.uid.S)?"contrast-background":""),t.xp6(1),t.hij(" ",e.name.S," ")}}let j=(()=>{class s{get updateDisabled(){return this.countdownService.isRunning}get isLight(){return!this.themeService.isDark}constructor(e,n,i,o,l,u,T){this.loginService=e,this.countdownService=n,this.toastService=i,this.themeService=o,this.httpService=l,this.router=u,this.store=T,this.items=[],this.conversationItems=[],this.companionIDs=[],this.isRequesting=!1,this.params={uid:"",email:"",token:""},this.conversationSubscription=new C.w0,this.peopleSubscription=new C.w0,this.countdown$=this.countdownService.countdown$,this.isDarkTheme$=this.themeService.isDarkTheme$}updateHandler(){this.requestPeople(),this.requestConversations()}itemClickHandler(e){if(this.companionIDs.includes(e.uid.S)){const i=this.conversationItems.filter(o=>o.companionID.S===e.uid.S).at(0)?.id.S;this.router.navigate([`/conversation/${i}`])}else fetch("https://tasks.app.rs.school/angular/conversations/create",{headers:{"rs-uid":this.params.uid||"","rs-email":this.params.email||"",Authorization:"Bearer "+this.params.token,Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({companion:e.uid.S})}).then(i=>{i.ok?i.clone().json().then(o=>{this.toastService.showMessage("success","Successfuly added a new conversation!"),this.router.navigate([`/conversation/${o.conversationID}`])}):i.json().catch(()=>{throw new Error("Could not parse the JSON")}).then(({message:o})=>{this.toastService.showMessage("error",o)})})}requestPeople(){this.isRequesting=!0,this.httpService.jsonRequest("https://tasks.app.rs.school/angular/users",{headers:this.httpService.getHeaders(this.params),method:"GET"}).then(e=>{this.toastService.showMessage("success","Successfuly got people list!"),this.items=e.Items.filter(n=>n.uid.S!==this.params.uid),this.store.dispatch(E.V({items:this.items})),this.isRequesting=!1,this.countdownService.startCountdown()}).catch(e=>{this.toastService.showMessage("error",e)})}requestConversations(){this.httpService.jsonRequest("https://tasks.app.rs.school/angular/conversations/list",{headers:this.httpService.getHeaders(this.params),method:"GET"}).then(e=>{this.conversationItems=e.Items,this.conversationItems.length&&(this.companionIDs=this.conversationItems.map(n=>n.companionID.S),this.store.dispatch(U.LI({items:this.conversationItems})))}).catch(e=>{this.toastService.showMessage("error",e)})}getConversations(){this.conversationSubscription=this.store.select(e=>G(e)).subscribe(e=>{e.length?(this.conversationItems=e,this.companionIDs=this.conversationItems.map(n=>n.companionID.S)):this.requestConversations()})}ngOnInit(){this.params=this.loginService.getUser(),this.peopleSubscription=this.store.pipe((0,d.Ys)(e=>F(e))).subscribe(e=>{e.length?this.items=e:this.requestPeople(),this.getConversations()})}ngOnDestroy(){this.conversationSubscription.unsubscribe(),this.peopleSubscription.unsubscribe()}static#t=this.\u0275fac=function(n){return new(n||s)(t.Y36(S.r),t.Y36(m.d),t.Y36(_.k),t.Y36(v.f),t.Y36(k.e),t.Y36(h.F0),t.Y36(d.yh))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-peoplelist"]],features:[t._Bn([m.d])],decls:9,vars:9,consts:[[1,"flex","baseline"],[1,"marginS",3,"disabled","click"],[4,"ngIf"],[1,"list-block"],["class","list-item",3,"click",4,"ngFor","ngForOf"],[1,"list-item",3,"click"]],template:function(n,i){1&n&&(t.TgZ(0,"div")(1,"div",0)(2,"app-button",1),t.NdJ("click",function(){return i.updateHandler()}),t._uU(3,"Update people list"),t.qZA()(),t.YNc(4,H,3,3,"div",2),t.TgZ(5,"div",3),t.ALo(6,"async"),t.YNc(7,$,3,4,"div",4),t.qZA(),t._UZ(8,"app-toast"),t.qZA()),2&n&&(t.xp6(2),t.Q6J("disabled",i.updateDisabled||i.isRequesting),t.xp6(2),t.Q6J("ngIf",i.updateDisabled),t.xp6(1),t.ekj("light-theme-list",i.isLight)("dark-theme-list",t.lcZ(6,7,i.isDarkTheme$)),t.xp6(2),t.Q6J("ngForOf",i.items))},dependencies:[p.sg,p.O5,g.r,b.q,p.Ov],styles:[".list-block[_ngcontent-%COMP%]{width:250px;padding:12px;max-height:600px;overflow:scroll}.list-item[_ngcontent-%COMP%]{line-height:20px}.list-item[_ngcontent-%COMP%]:hover{cursor:pointer;text-decoration:underline;color:#4848d1}.marginS[_ngcontent-%COMP%]{margin-right:12px;margin-bottom:12px}.contrast-background[_ngcontent-%COMP%]{background-color:#f3f3b7}"]})}return s})();const B=[{path:"",component:(()=>{class s{constructor(e,n){this.router=e,this.themeService=n,this.isDarkTheme$=this.themeService.isDarkTheme$}profileClickHandler(){this.router.navigate(["/profile"])}static#t=this.\u0275fac=function(n){return new(n||s)(t.Y36(h.F0),t.Y36(v.f))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-main"]],decls:12,vars:4,consts:[[1,"flex"],[1,"list-block","paddingL"],[1,"paddingL",3,"click"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t.ALo(1,"async"),t.TgZ(2,"div",1)(3,"div"),t._uU(4,"Groups list"),t.qZA(),t._UZ(5,"app-list"),t.qZA(),t.TgZ(6,"div",1)(7,"div"),t._uU(8,"People"),t.qZA(),t._UZ(9,"app-peoplelist"),t.qZA(),t.TgZ(10,"app-button",2),t.NdJ("click",function(){return i.profileClickHandler()}),t._uU(11,"Profile"),t.qZA()()),2&n&&t.ekj("dark-theme",t.lcZ(1,2,i.isDarkTheme$))},dependencies:[g.r,q,j,p.Ov],styles:[".grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto auto auto;padding-top:10px;padding-left:300px;width:70%}.grid-item[_ngcontent-%COMP%]{padding:20px}.flex[_ngcontent-%COMP%]{display:flex}.list-block[_ngcontent-%COMP%]{width:25%;border-right:14px solid #dee6ed}.paddingL[_ngcontent-%COMP%]{padding-left:30px}"]})}return s})(),canActivate:[r(5828).p]}];let z=(()=>{class s{static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275mod=t.oAB({type:s});static#i=this.\u0275inj=t.cJS({imports:[h.Bz.forChild(B),h.Bz]})}return s})();var X=r(5993),K=r(416);let V=(()=>{class s{static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275mod=t.oAB({type:s});static#i=this.\u0275inj=t.cJS({providers:[p.uU,m.d,X.F],imports:[p.ez,w.Z,K.Z,a.UX,z]})}return s})()}}]);