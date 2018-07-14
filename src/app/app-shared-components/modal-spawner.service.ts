import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  TemplateRef,
  EmbeddedViewRef,
  ComponentRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalSpawnerService {
  private _viewContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public set viewContainer(viewContainer: ViewContainerRef) {
    this._viewContainer = viewContainer;
  }

  public spawnComponent(component): ComponentRef<any> {
    this.clear();
    const componentRef = this._viewContainer.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(component)
    );
    return componentRef;
  }

  public spawnTemplate(template: TemplateRef<any>, ctx: any): EmbeddedViewRef<any> {
    this.clear();
    const viewRef = this._viewContainer.createEmbeddedView(template, ctx);
    return viewRef;
  }

  public clear() {
    this._viewContainer.clear();
  }
}
