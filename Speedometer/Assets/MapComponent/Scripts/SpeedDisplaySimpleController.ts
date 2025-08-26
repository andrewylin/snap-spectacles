require('LensStudio:RawLocationModule');

import { MapComponent } from "./MapComponent";

/**
 * Simple SpeedDisplay controller that works with the basic SpeedDisplaySimple prefab
 */
@component
export class SpeedDisplaySimpleController extends BaseScriptComponent {
  @input
  private mapComponent: MapComponent;
  
  @input
  private speedDisplayPrefab: ObjectPrefab;
  
  @input
  private speedDisplayParent: SceneObject;
  
  private speedDisplayObject: SceneObject;
  private textComponent: Text;
  private currentSpeed: number = 0;
  
  onAwake() {
    // Only bind to OnStartEvent, don't call onStart() immediately
    this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
  }
  
  onStart() {
    // Disable network features to avoid permission issues
    if (this.mapComponent) {
      try {
        this.mapComponent.setNetworkFeaturesEnabled(false);
      } catch (error) {
        print(`SpeedDisplaySimpleController: Error disabling network features: ${error}`);
      }
    } else {
      print("SpeedDisplaySimpleController: WARNING - mapComponent is null! Please assign it in Inspector.");
    }
    
    // Create the speed display
    this.createSpeedDisplay();
  }
  
  private createSpeedDisplay() {
    if (!this.speedDisplayPrefab || !this.speedDisplayParent) {
      print("SpeedDisplaySimpleController: Missing speedDisplayPrefab or speedDisplayParent");
      return;
    }
    
    try {
      // Instantiate the prefab
      this.speedDisplayObject = this.speedDisplayPrefab.instantiate(this.speedDisplayParent);
      
      // Find the text component
      this.textComponent = this.speedDisplayObject.getComponent("Text") as Text;
      
      if (!this.textComponent) {
        print("SpeedDisplaySimpleController: ERROR - Text component not found in prefab");
        return;
      }
      
      // Set initial text
      this.textComponent.text = "0.0 mph";
      
      // Start speed monitoring
      this.createEvent("UpdateEvent").bind(() => {
        this.updateSpeed();
      });
      
      print("SpeedDisplaySimpleController: Speed display created successfully");
      
    } catch (error) {
      print(`SpeedDisplaySimpleController: Error creating speed display: ${error}`);
    }
  }
  
  private updateSpeed() {
    if (!this.mapComponent || !this.textComponent) {
      print("SpeedDisplaySimpleController: updateSpeed - Missing mapComponent or textComponent");
      return;
    }
    
    try {
      // Get current speed from MapComponent
      const newSpeed = this.mapComponent.getUserSpeed();
      

      
      // Always update text to ensure it's working, even if speed is the same
      this.currentSpeed = newSpeed;
      const formattedSpeed = this.currentSpeed.toFixed(1);
      this.textComponent.text = `${formattedSpeed} mph`;
      
    } catch (error) {
      print(`SpeedDisplaySimpleController: Error getting speed: ${error}`);
      // Handle errors and show 0.0 mph
      if (this.currentSpeed !== 0) {
        this.currentSpeed = 0;
        this.textComponent.text = "0.0 mph";
      }
    }
  }
  
  // Public method to get current speed
  getCurrentSpeed(): number {
    return this.currentSpeed;
  }
  
  // Public method to show/hide speed display
  setVisible(visible: boolean) {
    if (this.speedDisplayObject) {
      this.speedDisplayObject.enabled = visible;
    }
  }
}
