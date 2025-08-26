import { MapComponent } from "./MapComponent";

@component
export class SpeedDisplay extends BaseScriptComponent {
  @input
  public mapComponent: MapComponent;
  
  @input
  public textComponent: Text;
  
  // Unique identifier property for component finding
  public isSpeedDisplayComponent: boolean = true;
  
  private currentSpeed: number = 0;
  
  onAwake() {
    print("SpeedDisplay: onAwake called");
    this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
  }
  
  onStart() {
    print("SpeedDisplay: onStart called");
    // Set initial text
    this.updateSpeedDisplay();
    
    // Start monitoring speed updates
    this.createEvent("UpdateEvent").bind(() => {
      this.updateSpeedFromMapComponent();
    });
  }
  
  private updateSpeedFromMapComponent() {
    if (!this.mapComponent) {
      return;
    }
    
    try {
      // Get current speed from MapComponent
      const newSpeed = this.mapComponent.getUserSpeed();
      if (newSpeed !== this.currentSpeed) {
        this.currentSpeed = newSpeed;
        this.updateSpeedDisplay();
      }
    } catch (error) {
      // MapComponent might not be ready yet
      print(`SpeedDisplay: Error getting speed: ${error}`);
      this.currentSpeed = 0; // Set to 0 if there's an error
      this.updateSpeedDisplay();
    }
  }
  
  private updateSpeedDisplay() {
    if (this.textComponent) {
      // Format speed to 1 decimal place and add "mph" unit
      const formattedSpeed = this.currentSpeed.toFixed(1);
      this.textComponent.text = `${formattedSpeed} mph`;
    }
  }
  
  // Public method to get current speed
  getCurrentSpeed(): number {
    return this.currentSpeed;
  }
  
  // Public method to set MapComponent after initialization
  setMapComponent(mapComponent: MapComponent) {
    this.mapComponent = mapComponent;
    print("SpeedDisplay: MapComponent assigned");
  }
}
