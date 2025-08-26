import { MapComponent } from "./MapComponent";

/**
 * Simple test script for SpeedDisplay functionality without network features
 * This avoids the permission issues that occur when combining location + network APIs
 */
@component
export class SpeedDisplaySimpleTest extends BaseScriptComponent {
  @input
  private mapComponent: MapComponent;
  
  onAwake() {
    this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
  }
  
  onStart() {
    print("SpeedDisplaySimpleTest: Starting test...");
    
    // Ensure network features are disabled to avoid permission issues
    this.mapComponent.setNetworkFeaturesEnabled(false);
    print("SpeedDisplaySimpleTest: Network features disabled");
    
    // Test basic MapComponent functionality
    if (this.mapComponent) {
      print("SpeedDisplaySimpleTest: MapComponent found");
      
      // Subscribe to map events
      this.mapComponent.subscribeOnMaptilesLoaded(() => {
        print("SpeedDisplaySimpleTest: Map tiles loaded successfully");
      });
      
      this.mapComponent.subscribeOnUserLocationFirstSet(() => {
        print("SpeedDisplaySimpleTest: User location set successfully");
        
        // Test speed method
        try {
          const speed = this.mapComponent.getUserSpeed();
          print(`SpeedDisplaySimpleTest: Current speed: ${speed} mph`);
        } catch (error) {
          print(`SpeedDisplaySimpleTest: Error getting speed: ${error}`);
        }
      });
      
      // Test location method
      try {
        const location = this.mapComponent.getUserLocation();
        if (location) {
          print(`SpeedDisplaySimpleTest: User location: ${location.latitude}, ${location.longitude}`);
        } else {
          print("SpeedDisplaySimpleTest: No user location yet");
        }
      } catch (error) {
        print(`SpeedDisplaySimpleTest: Error getting location: ${error}`);
      }
    } else {
      print("SpeedDisplaySimpleTest: No MapComponent assigned");
    }
    
    print("SpeedDisplaySimpleTest: Test completed");
  }
}
