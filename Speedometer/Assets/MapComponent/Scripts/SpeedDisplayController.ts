require('LensStudio:RawLocationModule');

import { MapComponent } from "./MapComponent";

@component
export class SpeedDisplayController extends BaseScriptComponent {
  @input
  private mapComponent: MapComponent;
  
  @input
  private speedDisplayPrefab: ObjectPrefab;
  
  @input
  private speedDisplayParent: SceneObject;
  
  private speedDisplayObject: SceneObject;
  
  onAwake() {
    this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
  }
  
  onStart() {
    print("SpeedDisplayController: onStart called");
    // Create the speed display
    this.createSpeedDisplay();
  }
  
  private createSpeedDisplay() {
    print("SpeedDisplayController: createSpeedDisplay called");
    
    if (!this.speedDisplayPrefab || !this.speedDisplayParent) {
      print("SpeedDisplayController: Missing speedDisplayPrefab or speedDisplayParent");
      return;
    }
    
    try {
      print("SpeedDisplayController: Instantiating prefab...");
      // Instantiate the speed display prefab
      this.speedDisplayObject = this.speedDisplayPrefab.instantiate(this.speedDisplayParent);
      print("SpeedDisplayController: Prefab instantiated successfully");
      
      // Since we're not using the SpeedDisplay component anymore, we'll handle speed display logic directly
      // Get the text component from the speed display
      const textComponent = this.speedDisplayObject.getComponent("Text") as Text;
      
      if (!textComponent) {
        print("SpeedDisplayController: Text component not found on speed display");
        return;
      }
      
      print("SpeedDisplayController: Text component found!");
      
      // Set up basic speed display functionality
      this.setupBasicSpeedDisplay(textComponent);
      
      print("SpeedDisplayController: Speed display created successfully");
    } catch (error) {
      print(`SpeedDisplayController: Error creating speed display: ${error}`);
    }
  }
  
  private setupBasicSpeedDisplay(textComponent: Text) {
    // Set initial text
    textComponent.text = "0.0 mph";
    
    // Start monitoring speed updates
    this.createEvent("UpdateEvent").bind(() => {
      this.updateSpeedDisplay(textComponent);
    });
    
    print("SpeedDisplayController: Basic speed display setup completed");
  }
  
  private updateSpeedDisplay(textComponent: Text) {
    if (!this.mapComponent) {
      return;
    }
    
    try {
      // Get current speed from MapComponent
      const currentSpeed = this.mapComponent.getUserSpeed();
      
      // Format speed to 1 decimal place and add "mph" unit
      const formattedSpeed = currentSpeed.toFixed(1);
      textComponent.text = `${formattedSpeed} mph`;
    } catch (error) {
      // MapComponent might not be ready yet
      print(`SpeedDisplayController: Error getting speed: ${error}`);
      textComponent.text = "0.0 mph";
    }
  }
  
  // Public method to get current speed
  getCurrentSpeed(): number {
    if (!this.mapComponent) {
      return 0;
    }
    
    try {
      return this.mapComponent.getUserSpeed();
    } catch (error) {
      print(`SpeedDisplayController: Error getting speed: ${error}`);
      return 0;
    }
  }
  
  // Public method to show/hide speed display
  setSpeedDisplayVisible(visible: boolean) {
    if (this.speedDisplayObject) {
      try {
        this.speedDisplayObject.enabled = visible;
      } catch (error) {
        print(`SpeedDisplayController: Error setting visibility: ${error}`);
      }
    }
  }
}
