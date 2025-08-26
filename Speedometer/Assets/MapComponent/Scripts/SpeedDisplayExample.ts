import { MapComponent } from "./MapComponent";
import { SpeedDisplayController } from "./SpeedDisplayController";

/**
 * Example script demonstrating how to use the SpeedDisplay functionality
 * 
 * This script shows how to:
 * 1. Set up a speed display
 * 2. Monitor user speed
 * 3. Control speed display visibility
 * 4. Handle speed-related events
 */
@component
export class SpeedDisplayExample extends BaseScriptComponent {
  @input
  private mapComponent: MapComponent;
  
  @input
  private speedDisplayController: SpeedDisplayController;
  

  
  onAwake() {
    this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
  }
  
  onStart() {
    // Subscribe to map events
    this.setupMapEventListeners();
    
    // Start monitoring speed
    this.startSpeedMonitoring();
    
    print("SpeedDisplayExample: Started successfully");
  }
  
  private setupMapEventListeners() {
    // Subscribe to map tiles loaded
    this.mapComponent.subscribeOnMaptilesLoaded(() => {
      print("SpeedDisplayExample: Map tiles loaded");
    });
  }
  
  private startSpeedMonitoring() {
    // Create an update event to monitor speed
    this.createEvent("UpdateEvent").bind(() => {
      if (this.speedDisplayController) {
        try {
          const currentSpeed = this.speedDisplayController.getCurrentSpeed();
          if (currentSpeed > 0) {
            print(`SpeedDisplayExample: Current speed: ${currentSpeed.toFixed(1)} mph`);
          }
        } catch (error) {
          print(`SpeedDisplayExample: Error getting speed: ${error}`);
        }
      }
    });
  }
  
  // Public methods for external control
  
  /**
   * Get current user speed
   */
  getCurrentSpeed(): number {
    if (this.speedDisplayController) {
      try {
        return this.speedDisplayController.getCurrentSpeed();
      } catch (error) {
        print(`SpeedDisplayExample: Error getting current speed: ${error}`);
        return 0;
      }
    }
    return 0;
  }
}
